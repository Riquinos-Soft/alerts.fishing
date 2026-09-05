import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { validateMarkdown } from "./check-markdown-links.mjs";

async function withFixture(files, assertion) {
  const root = await mkdtemp(path.join(tmpdir(), "alerts-fishing-doc-links-"));
  try {
    const completeFiles = {
      "README.md": "# Fixture\n",
      "AGENTS.md": "# Agents\n",
      ...files,
    };
    for (const [file, content] of Object.entries(completeFiles)) {
      const absolutePath = path.join(root, file);
      await mkdir(path.dirname(absolutePath), { recursive: true });
      await writeFile(absolutePath, content, "utf8");
    }
    await assertion(await validateMarkdown({ root }));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("accepts relative links, images, anchors, and encoded paths", async () => {
  await withFixture(
    {
      "README.md": [
        "# Fixture",
        "[Guide](docs/guide.md#hello-world)",
        "![Chart](docs/assets/tide%20chart.png)",
        '<img src="docs/assets/tide%20chart.png" alt="Tide chart">',
      ].join("\n"),
      "docs/guide.md": "# Hello *world*\n\n[Top](#hello-world)\n",
      "docs/assets/tide chart.png": "fixture",
    },
    ({ files, failures }) => {
      assert.deepEqual(files, ["README.md", "AGENTS.md", "docs/guide.md"]);
      assert.deepEqual(failures, []);
    },
  );
});

test("reports missing file and image targets with their source", async () => {
  await withFixture(
    {
      "docs/broken.md": "# Broken\n\n[Missing](absent.md)\n\n![Missing](images/absent.png)\n",
    },
    ({ failures }) => {
      assert.equal(failures.length, 2);
      assert.match(failures[0], /docs\/broken\.md:3: link "absent\.md": target does not exist/u);
      assert.match(failures[1], /docs\/broken\.md:5: image "images\/absent\.png": target does not exist/u);
    },
  );
});

test("reports a missing same-file or cross-file anchor", async () => {
  await withFixture(
    {
      "README.md": "# Fixture\n\n[No section](#absent)\n\n[No target section](docs/guide.md#absent)\n",
      "docs/guide.md": "# Guide\n",
    },
    ({ failures }) => {
      assert.equal(failures.length, 2);
      assert.match(failures[0], /anchor #absent does not exist in README\.md/u);
      assert.match(failures[1], /anchor #absent does not exist in docs\/guide\.md/u);
    },
  );
});

test("supports GitHub duplicate-heading suffixes", async () => {
  await withFixture(
    {
      "README.md": "# Fixture\n\n[First](docs/repeated.md#repeat)\n\n[Second](docs/repeated.md#repeat-1)\n",
      "docs/repeated.md": "# Repeat\n\n## Repeat\n",
    },
    ({ failures }) => assert.deepEqual(failures, []),
  );
});

test("ignores external schemes and Markdown links inside code", async () => {
  await withFixture(
    {
      "README.md": [
        "# Fixture",
        "[Web](https://example.com/path#anchor)",
        "[Mail](mailto:hello@example.com)",
        "`[Inline](missing-inline.md)`",
        "```markdown",
        "[Fenced](missing-fenced.md)",
        "```",
      ].join("\n"),
    },
    ({ failures }) => assert.deepEqual(failures, []),
  );
});
