import { existsSync, realpathSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import GithubSlugger from "github-slugger";
import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt({ html: true });
const rootDirectory = fileURLToPath(new URL("..", import.meta.url));

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

async function listMarkdownFiles(root) {
  const fixedFiles = ["README.md", "AGENTS.md"];
  const docsDirectory = path.join(root, "docs");
  const docsFiles = [];

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => {
      if (left.name === right.name) return 0;
      return left.name < right.name ? -1 : 1;
    });

    for (const entry of entries) {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(absolutePath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        docsFiles.push(toPosix(path.relative(root, absolutePath)));
      }
    }
  }

  if (existsSync(docsDirectory)) {
    await visit(docsDirectory);
  }

  return [...fixedFiles.filter((file) => existsSync(path.join(root, file))), ...docsFiles];
}

function visibleHeadingText(inlineToken) {
  return (inlineToken.children ?? [])
    .filter((token) => !["html_inline", "softbreak", "hardbreak"].includes(token.type))
    .map((token) => {
      if (token.type === "image") {
        return token.content;
      }
      return ["text", "code_inline"].includes(token.type) ? token.content : "";
    })
    .join("");
}

function parseHtmlReferences(content) {
  const references = [];
  const tagPattern = /<(a|img)\b[^>]*>/giu;

  for (const tagMatch of content.matchAll(tagPattern)) {
    const attribute = tagMatch[1].toLowerCase() === "a" ? "href" : "src";
    const attributePattern = new RegExp(
      `\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\\x60]+))`,
      "iu",
    );
    const attributeMatch = attributePattern.exec(tagMatch[0]);
    const target = attributeMatch?.[1] ?? attributeMatch?.[2] ?? attributeMatch?.[3];
    if (target !== undefined) {
      references.push({ target, isImage: attribute === "src" });
    }
  }

  return references;
}

function parseDocument(source) {
  const tokens = markdown.parse(source, {});
  const slugger = new GithubSlugger();
  const anchors = new Set();
  const references = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (token.type === "heading_open") {
      const inlineToken = tokens[index + 1];
      if (inlineToken?.type === "inline") {
        anchors.add(slugger.slug(visibleHeadingText(inlineToken)));
      }
    }

    if (token.type === "inline") {
      for (const child of token.children ?? []) {
        if (child.type === "link_open") {
          references.push({
            target: child.attrGet("href"),
            isImage: false,
            line: (token.map?.[0] ?? 0) + 1,
          });
        } else if (child.type === "image") {
          references.push({
            target: child.attrGet("src"),
            isImage: true,
            line: (token.map?.[0] ?? 0) + 1,
          });
        } else if (child.type === "html_inline") {
          references.push(
            ...parseHtmlReferences(child.content).map((reference) => ({
              ...reference,
              line: (token.map?.[0] ?? 0) + 1,
            })),
          );
        }
      }
    } else if (token.type === "html_block") {
      references.push(
        ...parseHtmlReferences(token.content).map((reference) => ({
          ...reference,
          line: (token.map?.[0] ?? 0) + 1,
        })),
      );
    }
  }

  return { anchors, references };
}

function decoded(value, label) {
  try {
    return { value: decodeURIComponent(value) };
  } catch {
    return { error: `has an invalid percent-encoded ${label}` };
  }
}

function splitTarget(target) {
  const hashIndex = target.indexOf("#");
  const beforeHash = hashIndex === -1 ? target : target.slice(0, hashIndex);
  const fragment = hashIndex === -1 ? "" : target.slice(hashIndex + 1);
  const queryIndex = beforeHash.indexOf("?");
  const file = queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex);
  return { file, fragment };
}

function isIgnoredTarget(target) {
  return (
    target === "" ||
    target.startsWith("//") ||
    target.startsWith("/") ||
    /^[a-z][a-z\d+.-]*:/iu.test(target)
  );
}

function insideRoot(root, targetPath) {
  const relative = path.relative(root, targetPath);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== "..");
}

export async function validateMarkdown({ root = rootDirectory } = {}) {
  const canonicalRoot = realpathSync(root);
  const files = await listMarkdownFiles(canonicalRoot);
  const documents = new Map();
  const failures = [];

  for (const file of files) {
    const source = await readFile(path.join(canonicalRoot, file), "utf8");
    documents.set(file, parseDocument(source));
  }

  for (const file of files) {
    const document = documents.get(file);
    for (const reference of document.references) {
      const target = reference.target;
      if (typeof target !== "string" || isIgnoredTarget(target)) {
        continue;
      }

      const { file: rawFile, fragment: rawFragment } = splitTarget(target);
      const decodedFile = decoded(rawFile, "path");
      const decodedFragment = decoded(rawFragment, "anchor");
      const prefix = `${file}:${reference.line}: ${reference.isImage ? "image" : "link"} ${JSON.stringify(target)}`;

      if (decodedFile.error || decodedFragment.error) {
        failures.push(`${prefix}: ${decodedFile.error ?? decodedFragment.error}`);
        continue;
      }

      const sourceDirectory = path.dirname(path.join(canonicalRoot, file));
      const absoluteTarget = rawFile
        ? path.resolve(sourceDirectory, decodedFile.value)
        : path.join(canonicalRoot, file);

      if (!insideRoot(canonicalRoot, absoluteTarget)) {
        failures.push(`${prefix}: resolves outside the repository`);
        continue;
      }

      if (!existsSync(absoluteTarget)) {
        failures.push(`${prefix}: target does not exist`);
        continue;
      }

      if (decodedFragment.value && !reference.isImage) {
        const targetFile = toPosix(path.relative(canonicalRoot, absoluteTarget));
        const targetDocument = documents.get(targetFile);
        if (!targetDocument) {
          failures.push(`${prefix}: cannot validate an anchor on a non-Markdown target`);
        } else if (!targetDocument.anchors.has(decodedFragment.value)) {
          failures.push(`${prefix}: anchor #${decodedFragment.value} does not exist in ${targetFile}`);
        }
      }
    }
  }

  return { files, failures };
}

async function main() {
  const { files, failures } = await validateMarkdown();
  if (failures.length > 0) {
    console.error(`Markdown link validation failed with ${failures.length} error(s):`);
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Validated links and anchors in ${files.length} Markdown files.`);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  await main();
}
