# Investigación: dirección moderna de UI píxel-futurista

**Estado: `proposed`; investigación documental; implementación: no iniciada.**

**Preferencias de usuario: `proposed`; pendientes de validar con prototipo y pruebas.**

**Fecha de consulta de fuentes:** 2026-09-04.

Este documento compara opciones actuales para una futura interfaz Nuxt y propone una dirección visual para `alerts.fishing`. No afirma que exista una aplicación, un sistema de UI, una dependencia instalada, un mapa, datos reales ni una integración. La arquitectura existente mantiene Nuxt, Vue, TypeScript, Tailwind CSS, shadcn-vue y Lucide en estado `proposed`; esta investigación puede orientar una decisión posterior, pero no la sustituye.

## Especificación de esta investigación

### Problema

La experiencia debe convertir condiciones de pesca complejas en una decisión local comprensible sin confundir score, confianza y seguridad. A la vez, necesita una identidad propia —futurismo costero, telemetría marina y píxel moderno— que siga siendo sobria, legible en movilidad y adecuada para textos extensos de explicación o normativa.

Una biblioteca con demasiado estilo incorporado puede conducir a una apariencia genérica. Una base completamente headless puede ofrecer más identidad, pero desplaza al producto el coste de construir, probar y mantener cada patrón visual, responsive y accesible.

### Objetivos

- Comparar como máximo cuatro enfoques vigentes y compatibles con Vue/Nuxt.
- Proponer tres intensidades visuales concretas y comparables.
- Recomendar una base inicial que favorezca un vertical slice pequeño sin hipotecar una identidad propia.
- Definir una guía visual verificable para score, confianza, seguridad, ventanas y registro de sesión.
- Preservar privacidad, procedencia y etiquetas inequívocas para cualquier contenido mock.

### Requisitos

- Evaluar accesibilidad, madurez, personalización, rendimiento, respuesta en distintos tamaños, mantenimiento, velocidad de desarrollo, riesgo de apariencia genérica, compatibilidad con Nuxt y licencia.
- Cubrir en cada dirección paleta, tipografías y licencias, radios, bordes, sombras, espaciado, iconografía, movimiento, componentes, accesibilidad y riesgos.
- Mantener aproximadamente un 80 % de producto moderno y un 20 % de carácter píxel en la recomendación.
- Priorizar el tema oscuro sin bloquear un tema claro completo y accesible.
- Usar el carácter pixelado o monoespaciado solo donde aporte jerarquía e identidad.
- Evitar copiar marcas, interfaces, tipografías, iconos, *trade dress* o cualquier otro activo de Atari; “Atari” describe únicamente una sensación abstracta de consola retrofuturista pixelada.
- No presentar resultados de rendimiento sin una medición reproducible del producto.

### Fuera de alcance

- Instalar dependencias, crear componentes o afirmar que están implementados.
- Diseñar un mapa avanzado, publicar coordenadas o representar ubicaciones sensibles con precisión.
- Cambiar la arquitectura, cerrar una decisión o sustituir la validación de accesibilidad con una afirmación del proveedor.
- Crear una marca derivada de una propiedad intelectual de terceros.
- Validar proveedores, normativa, seguridad o datos reales.

### Criterios de aceptación de la investigación

- [x] Se comparan exactamente cuatro opciones actuales, incluidas las tres requeridas y una alternativa headless útil.
- [x] Cada opción cubre los diez criterios técnicos y de producto requeridos.
- [x] Se presentan las tres direcciones visuales solicitadas con todos sus atributos.
- [x] La propuesta inicial incorpora las preferencias comunicadas por el usuario como `proposed`.
- [x] La recomendación distingue lo propuesto de lo implementado y enumera validaciones pendientes.
- [x] Las afirmaciones externas se apoyan en fuentes oficiales o primarias consultadas el 2026-09-04.
- [x] Se derivan validaciones futuras de accesibilidad, responsive, rendimiento y diferenciación visual.

## Preferencias recibidas

Las siguientes preferencias son **input `proposed`**, no una decisión aceptada ni evidencia de usabilidad:

- intensidad pixelada equilibrada;
- oscuro prioritario, manteniendo un modo claro completo y accesible;
- geometría técnica equilibrada, con esquinas rectas y bordes técnicos en dosis moderadas;
- animaciones breves y precisas;
- “Terminal atlántico equilibrado” como dirección inicial preferida.

Estas preferencias justifican la recomendación inicial, pero deben contrastarse con un prototipo que incluya contenido realista, uso móvil exterior, lectura prolongada y navegación por teclado.

## Comparación de enfoques actuales

Las versiones son una fotografía de los paquetes publicados consultados el 2026-09-04, no una versión fijada para el proyecto: UnoCSS 66.10.0, Reka UI 2.10.4, Nuxt UI 4.11.0, PrimeVue 5.0.1 y Ark UI Vue 5.39.1. Deben volver a comprobarse al crear una especificación de implementación.

### 1. UnoCSS + Reka UI

**Encaje general: alto control visual, coste de composición alto.**

- **Accesibilidad:** Reka UI declara alineación con patrones WAI-ARIA, navegación por teclado y gestión de foco, y recuerda que el producto sigue siendo responsable de etiquetas y contexto. Es una base sólida, no una certificación del resultado.
- **Madurez:** Reka es la evolución de Radix Vue y ofrece más de 40 primitivas; UnoCSS mantiene integraciones oficiales y un motor extensible. Hay dos superficies de mantenimiento y será necesario versionarlas de forma coordinada.
- **Personalización:** es el enfoque con más libertad. Reka no impone estilos y UnoCSS permite reglas, *shortcuts*, variantes y presets propios; encaja bien con bordes técnicos, módulos pixelados y tokens semánticos.
- **Rendimiento:** UnoCSS genera utilidades bajo demanda y Reka declara *tree-shaking* para primitivas no usadas. Eso sugiere potencial para una salida contenida, pero el tamaño y coste de interacción solo pueden juzgarse sobre un prototipo y un presupuesto medido.
- **Responsive:** UnoCSS facilita reglas y variantes, pero no aporta por sí solo una arquitectura responsive. El equipo debe definir reflow, densidad, gestos y composición móvil de cada patrón.
- **Mantenimiento:** exige mantener tokens, recetas, componentes compuestos y pruebas de regresión. La libertad inicial se convierte en propiedad sostenida del sistema.
- **Velocidad de desarrollo:** media-baja al principio; mejora cuando existe una capa propia de componentes. Es desproporcionado si el primer vertical necesita principalmente tarjetas, estados, formularios y overlays convencionales.
- **Apariencia no genérica:** excelente; el resultado no hereda un lenguaje visual predeterminado.
- **Compatibilidad Nuxt:** ambos ofrecen módulo oficial de Nuxt. Reka documenta SSR y una consideración histórica de hidratación para Vue anterior a 3.5, por lo que la matriz exacta debe verificarse con las versiones elegidas.
- **Licencia:** UnoCSS y Reka UI se publican bajo MIT.

**Conclusión `proposed`:** reservar como alternativa si el prototipo con Nuxt UI demuestra que la capa visual requiere demasiadas anulaciones o si se decide poseer un sistema de diseño más bajo nivel. No es la primera opción para maximizar velocidad en el vertical inicial.

### 2. Nuxt UI

**Encaje general: mejor equilibrio inicial entre velocidad, integración y capacidad de tematización.**

- **Accesibilidad:** se apoya en Reka UI para ARIA, teclado y foco. La documentación reconoce que las pruebas del caso de uso siguen siendo necesarias.
- **Madurez:** la rama v4 unificó la oferta abierta y documenta más de 125 componentes, TypeScript, internacionalización, color mode y ejemplos. Esta amplitud reduce la cantidad de patrones básicos que habría que inventar.
- **Personalización:** ofrece colores semánticos, variables de fondo, texto, borde y radio, variantes tipadas y ajustes globales o por slot. Es suficiente en principio para una capa temática propia, pero debe probarse en componentes densos.
- **Rendimiento:** la integración es compatible con SSR y la biblioteca usa Tailwind CSS y Reka UI. No se asume que sea la opción más ligera; deben medirse CSS, JavaScript, hidratación y componentes realmente importados.
- **Responsive:** incluye componentes y layouts responsive, pero la jerarquía móvil, la reordenación de score/confianza/seguridad y la navegación con pulgar siguen siendo decisiones del producto.
- **Mantenimiento:** una sola biblioteca de alto nivel reduce código propio y se alinea con el Tailwind ya `proposed`. El coste es seguir sus APIs, versiones y decisiones de composición.
- **Velocidad de desarrollo:** alta para tarjetas, formularios, navegación, overlays, tablas y color mode. Sus APIs tipadas y autoimportación favorecen un vertical corto.
- **Apariencia no genérica:** media de fábrica y alta solo si se reemplazan deliberadamente paleta, tipografía, radios, sombras, densidad y variantes. Usar los defaults produciría una apariencia reconociblemente genérica.
- **Compatibilidad Nuxt:** directa y oficial; también admite Vue sin Nuxt. Es la integración menos friccional de las cuatro para el stack `proposed`.
- **Licencia:** MIT para Nuxt UI v4 según documentación y repositorio oficiales.

**Conclusión `proposed`:** opción inicial recomendada, condicionada a un *spike* visual de uno o dos flujos que demuestre identidad suficiente, accesibilidad y un coste de overrides razonable.

### 3. PrimeVue en modo unstyled

**Encaje general: gran amplitud funcional, pero riesgo de licencia actual y complejidad innecesaria para el primer vertical.**

- **Accesibilidad:** PrimeVue documenta semántica, teclado y detalles por componente. El modo unstyled conserva funcionalidad y accesibilidad base, pero el producto asume estados visuales, contraste y foco.
- **Madurez:** existe una larga trayectoria y una suite amplia. Sin embargo, el repositorio MIT de PrimeVue 4 fue archivado en junio de 2026 y el desarrollo actual continúa en PrimeVue 5 bajo PrimeUI; este cambio reduce la comparabilidad histórica de mantenimiento y licencia.
- **Personalización:** el modo unstyled elimina reglas y variables de tema. La API Pass Through permite clases, atributos y eventos sobre partes internas, con configuración global o local. Ofrece control alto, aunque acopla recetas a la anatomía de cada componente.
- **Rendimiento:** el módulo Nuxt anuncia autoimportación con *tree-shaking*. La suite es amplia y debe medirse por selección real; no hay base para declarar que supere a las otras opciones.
- **Responsive:** aporta componentes de datos ricos, pero no resuelve la adaptación de una experiencia pesquera a móvil. Algunos patrones empresariales pueden requerir una alternativa en tarjetas o vistas apiladas.
- **Mantenimiento:** el cambio de licencia, el uso de clave y la transición de major incrementan la carga operativa. El preset unstyled también requiere mantener estilos por parte interna.
- **Velocidad de desarrollo:** alta si se necesitan de inmediato componentes de datos complejos; media con un lenguaje completamente propio por el trabajo de tematización.
- **Apariencia no genérica:** alta en unstyled si se diseña desde tokens propios; riesgo medio-alto de deriva hacia un panel empresarial genérico si se reutilizan convenciones o presets sin criterio.
- **Compatibilidad Nuxt:** módulo oficial para PrimeVue 5 con autoimportación y configuración de licencia pública. La integración existe, pero la clave y sus términos deben revisarse antes de adopción.
- **Licencia:** `needs-validation`. PrimeVue 5.0.1 ya no es MIT: usa la licencia PrimeUI. La licencia Community exige, entre otros límites, menos de cinco desarrolladores, menos de diez empleados, menos de un millón de dólares de ingresos o presupuesto anual, no más de tres millones de financiación externa, exclusión del sector público, clave y renovación anual. PrimeVue 4 y anteriores siguen MIT, pero su repositorio está archivado. No debe adoptarse ninguna variante sin revisión de elegibilidad, coste, obligaciones y horizonte de actualizaciones.

**Conclusión `proposed`:** no recomendar para el inicio. Reconsiderar únicamente si un requisito verificado de tabla, calendario u otro widget complejo compensa la licencia y el acoplamiento, y tras revisión legal/comercial.

### 4. Ark UI para Vue

**Encaje general: alternativa headless moderna y útil para interacciones complejas.**

- **Accesibilidad:** documenta patrones WAI-ARIA y soporte de teclado por componente; su lógica se basa en máquinas de estado de Zag.js. Aun así, nombres accesibles, estilos de foco y pruebas con tecnología asistiva corresponden al producto.
- **Madurez:** ofrece más de 40 componentes para Vue, React, Solid y Svelte, mantenidos por el equipo de Chakra UI. El changelog frecuente muestra evolución activa y también correcciones recientes de SSR y accesibilidad que conviene vigilar.
- **Personalización:** completamente unstyled y granular; admite CSS, utilidades o cualquier sistema de estilos. Permite una identidad muy propia sin luchar contra defaults.
- **Rendimiento:** la arquitectura por paquetes de componente y máquinas de estado es prometedora para imports selectivos. No se adopta la afirmación comparativa de rendimiento del proveedor sin benchmark reproducible en Nuxt.
- **Responsive:** no impone layout. Incluye primitivas útiles, pero toda la experiencia responsive y la densidad exterior deben diseñarse y probarse localmente.
- **Mantenimiento:** la lógica compleja permanece en Zag/Ark, mientras el equipo mantiene wrappers, estilos y tests visuales. Su API multi-framework añade una capa que debe verificarse en SSR de Nuxt.
- **Velocidad de desarrollo:** media. Puede acelerar selects, popovers, sliders y diálogos complejos, pero es más lenta que Nuxt UI para construir un producto coherente desde cero.
- **Apariencia no genérica:** excelente porque no aporta estética predeterminada.
- **Compatibilidad Nuxt:** el paquete oficial soporta Vue y existen ejemplos de Nuxt, pero no se documenta una integración Nuxt tan directa como las de Nuxt UI, Reka o PrimeVue. Un *spike* debe probar SSR, teleports, IDs e hidratación.
- **Licencia:** MIT.

**Conclusión `proposed`:** segunda alternativa headless útil cuando se necesiten máquinas de estado o patrones que no cubra bien la opción inicial. No mezclarla preventivamente con Reka UI: duplicaría primitivas y criterios sin una necesidad demostrada.

## Síntesis y recomendación técnica

**Recomendación inicial `proposed`: Nuxt UI v4 sobre su base Reka UI y Tailwind CSS, con una capa de tokens y variantes propia de `alerts.fishing`.**

La recomendación prioriza el tiempo hasta un vertical verificable, la compatibilidad directa con el stack ya `proposed`, la cobertura de componentes y una base accesible. No recomienda adoptar el aspecto por defecto: la identidad debe residir en tokens semánticos, tipografía, composición, iconografía y unas pocas variantes propias.

La decisión debe mantenerse reversible:

1. definir tokens independientes de la biblioteca y del nombre comercial;
2. componer un *spike* con listado de oportunidades, detalle de ventana, puerta de seguridad y registro de bolo;
3. medir overrides, CSS/JavaScript, hidratación y accesibilidad;
4. continuar con Nuxt UI si el carácter visual se consigue sin excepciones repetitivas;
5. evaluar UnoCSS + Reka UI si el spike revela fricción estructural, no solo preferencias menores;
6. usar Ark UI únicamente ante una interacción compleja verificada y PrimeVue únicamente tras resolver licencia y necesidad funcional.

No se propone mezclar bibliotecas de primitivas en el primer vertical.

## Direcciones visuales

Los colores son semillas de diseño, no tokens aprobados. Los contrastes indicados se calcularon con la fórmula de luminancia relativa de WCAG sobre pares de texto/fondo concretos; todos los estados, transparencias, overlays, mapas y temas deberán verificarse de nuevo en contexto.

### Dirección 1: Costa mínima

**Estado: `proposed`; intensidad píxel baja.**

Una interfaz silenciosa y muy contenida: aire, horizontes limpios y datos principales sin ornamentación de consola.

- **Paleta:** oscuro `#071B24`, superficie `#0D2832`, texto `#ECF8F6`, texto secundario `#ACC5C5`, turquesa `#4FD1C5`, coral `#FF8A73`; claro `#F4F8F6`, superficie `#FFFFFF`, texto `#102A30`, secundario `#52696D`, turquesa `#006F69`, coral `#A93A2C`. Los pares de texto/acentos listados sobre el fondo base van aproximadamente de 5.45:1 a 16.22:1.
- **Fuentes y licencias:** Geist Sans para lectura y Geist Mono solo para hora, versión y valores; familia bajo SIL Open Font License 1.1. No usar Geist Pixel.
- **Radios:** 8 px en tarjeta, 6 px en control, círculo solo para indicadores que lo requieran; nada de píldoras decorativas repetidas.
- **Bordes:** 1 px de bajo contraste y una línea de acento solo en estados seleccionados o críticos.
- **Sombras:** casi inexistentes; elevación mediante contraste entre superficies, con una sombra ambiental suave solo en overlays.
- **Espaciado:** escala base de 4 px, ritmo generoso de 16/24/32 px, densidad media en datos secundarios.
- **Iconografía:** Lucide, trazo 1.75–2 px, siempre con texto o nombre accesible cuando comunique acción o estado.
- **Movimiento:** 100–160 ms para feedback y 180–220 ms para overlays; opacidad y desplazamientos de 2–4 px, sin barridos ni parpadeo.
- **Componentes:** tarjetas planas de oportunidad, timeline simple, tres bloques claramente separados para score/confianza/seguridad, explicación en prosa y formulario de sesión sobrio.
- **Accesibilidad:** es la dirección con menor ruido; mantener foco de alto contraste, no depender del coral/turquesa para el significado y preservar 44 px como objetivo táctil interno aunque WCAG AA permita 24 px en condiciones concretas.
- **Riesgos:** identidad insuficiente, parecido a otros productos minimalistas y menor señal de telemetría. Puede sentirse demasiado editorial para decisiones rápidas en costa.

### Dirección 2: Terminal atlántico equilibrado

**Estado: `proposed`; dirección inicial recomendada.**

Combina producto moderno con detalles de terminal marina: aproximadamente 80 % claridad funcional y 20 % carácter píxel. Debe sentirse técnico y sofisticado, nunca infantil ni como una recreativa genérica.

- **Paleta:** oscuro prioritario `#061822`, superficie `#0A2531`, elevado `#103541`, texto `#ECFAF7`, secundario `#AAC6C5`, turquesa `#39DAC7`, azul atlántico `#3E8FD8`, coral `#FF8069`; claro `#F3F8F7`, superficie `#FFFFFF`, elevado `#DCEBE8`, texto `#102930`, secundario `#4F686D`, turquesa `#007C74`, azul `#25639A`, coral `#B43F31`. Los pares listados sobre el fondo base van aproximadamente de 4.74:1 a 16.86:1; combinaciones sobre superficies alternas, transparencias y estados siguen sin validar.
- **Fuentes y licencias:** Geist Sans para navegación, explicaciones y normativa; Geist Mono para hora, score, frescura y versiones; Geist Pixel Square o Grid solo para títulos cortos, marca de sección o numeración de ventana. Toda la familia usa SIL OFL 1.1.
- **Radios:** 6 px en contenedores, 4 px en controles y algunos cortes rectos en cabeceras o esquinas de módulos; evitar convertir cada bloque en una caja angular.
- **Bordes:** 1 px técnico, separadores segmentados únicamente en timeline y telemetría, y doble señal —icono/texto más color— para estados.
- **Sombras:** elevación corta y fría (`0 8px 24px` con baja opacidad) solo en overlays; brillo turquesa muy sutil exclusivamente en foco o dato activo, nunca alrededor de texto continuo.
- **Espaciado:** base de 4 px; 8/12 px dentro de telemetría, 16/20 px en tarjetas y 24/32 px entre regiones. Mantener aire suficiente para uso táctil.
- **Iconografía:** Lucide ISC como base coherente; un subconjunto de pictogramas marinos propios podría estudiarse después, siempre original, ópticamente compatible y con licencia documentada. Los iconos de seguridad no pueden ser decorativos ni depender del color.
- **Movimiento:** 120–180 ms para cambios de estado, 180–240 ms para paneles; escalonamiento máximo de 30 ms en una lista corta, curva precisa sin rebote, y alternativa sin movimiento mediante `prefers-reduced-motion`.
- **Componentes:** cabecera de horizonte 72 h, tarjetas de oportunidad, regla temporal segmentada, cápsulas de datos usadas con moderación, medidor no probabilístico de score, módulo independiente de confianza, puerta de seguridad dominante, factores favorables/desfavorables y registro de sesión/bolo. Cualquier representación geográfica inicial debe ser abstracta, mock y no sensible; los mapas avanzados siguen `future`.
- **Accesibilidad:** prosa en sans, ancho de lectura contenido, monospace/píxel nunca para normativa larga, jerarquía redundante de texto/icono/color, foco persistente, orden DOM igual al orden visual y tema claro con paridad funcional.
- **Riesgos:** abuso de paneles, mayúsculas, rejillas o brillo; confundir estética de terminal con mayor certeza; compactar en exceso; o acercarse a una apariencia de videojuego. El límite 80/20 debe revisarse en conjunto, no aplicarse literalmente a cada componente.

### Dirección 3: Futurismo píxel intenso

**Estado: `proposed`; alternativa expresiva, no recomendada inicialmente.**

Una consola costera marcada: rejilla visible, tipografía de display pixelada y estados de telemetría muy presentes.

- **Paleta:** oscuro `#040F18`, superficie `#071D29`, texto `#F1FBF8`, secundario `#AAC3C4`, cian `#2EE6CD`, azul eléctrico `#4B9FFF`, coral `#FF725E`; claro `#F1F7F5`, superficie `#FFFFFF`, texto `#0A252C`, secundario `#4A6368`, turquesa `#00786F`, azul `#245E9B`, coral `#B6382C`. Los pares listados sobre el fondo base van aproximadamente de 4.94:1 a 18.31:1.
- **Fuentes y licencias:** Atkinson Hyperlegible Next para lectura prolongada y Geist Mono para datos; Geist Pixel Grid/Square para display. Atkinson y Geist se distribuyen bajo SIL OFL 1.1.
- **Radios:** 0–2 px, cortes escalonados y contornos ortogonales. Los controles táctiles conservan área amplia aunque parezcan compactos.
- **Bordes:** rejilla de 1 px, esquinas recortadas y ticks; máximo dos niveles simultáneos para no fragmentar el contenido.
- **Sombras:** sin sombra naturalista; halos de estado muy limitados y superficies separadas por contraste.
- **Espaciado:** base de 4 px con mayor densidad interna, compensada por 24–32 px entre módulos principales.
- **Iconografía:** Lucide dentro de marcos pixelados propios; prohibido sustituir claridad por glifos crípticos. No recrear mandos, logos o símbolos reconocibles de marcas retro.
- **Movimiento:** barridos o revelados escalonados solo como detalle ornamental aislado, menos de 240 ms; nunca en alertas, lectura o navegación principal; versión reducida sin desplazamiento.
- **Componentes:** panel de situación, retícula temporal, telemetría más densa, cursores de selección y separadores pixelados. Score, confianza y seguridad siguen separados y nombrados en lenguaje natural.
- **Accesibilidad:** limitar mayúsculas y píxel a fragmentos cortos, permitir zoom/reflow, ofrecer tema claro completo, probar visión exterior y mantener patrones estándar de interacción aunque la piel sea experimental.
- **Riesgos:** fatiga, menor comprensión, densidad aparente, estética arcade, falsa autoridad tecnológica y mantenimiento visual alto. Puede competir con el contenido y degradar la confianza.

## Propuesta inicial de sistema

### Principios

1. **Decisión antes que decoración.** La primera lectura siempre debe ser cuándo, dónde de forma no sensible, cómo, seguridad y confianza.
2. **Tres señales, tres tratamientos.** Score, confianza y seguridad no comparten medidor ni color exclusivo. Seguridad puede invalidar una ventana favorable.
3. **Telemetría honesta.** La estética técnica no implica precisión real. Los datos mock se etiquetan de forma persistente como simulados o de demostración.
4. **Píxel como acento.** Aplicarlo a display, numeración y divisores; no a párrafos, formularios ni normativa.
5. **Oscuro prioritario, paridad clara.** Ambos temas mantienen jerarquía, contraste, estados y funcionalidad.
6. **Privacidad visible.** Una ubicación no verificada o sensible nunca se vuelve precisa por tratamiento visual.

### Tokens `proposed`

- **Color semántico:** `canvas`, `surface`, `surface-raised`, `text`, `text-muted`, `border`, `action`, `info`, `positive`, `caution`, `danger`, `focus`; las semillas de “Terminal atlántico equilibrado” son punto de partida, no nombres de dominio codificados.
- **Tipografía:** Geist Sans 16 px/1.5 como base orientativa; Geist Mono con cifras tabulares para valores; Geist Pixel limitado a una línea corta y tamaños de display. Cargar solo pesos y subconjuntos realmente usados y ofrecer fallbacks del sistema.
- **Geometría:** radio global cercano a 6 px, controles a 4 px y cortes rectos en módulos identificadores; los estados no cambian drásticamente de geometría si eso altera el layout.
- **Borde y elevación:** borde técnico de 1 px; tres superficies como máximo; sombras solo para jerarquía temporal. El foco no se sustituye por sombra ambiental.
- **Espaciado:** escala 4/8/12/16/20/24/32/48; área táctil objetivo de 44 × 44 CSS px para acciones frecuentes o críticas.
- **Iconografía:** Lucide bajo ISC, tamaño óptico consistente de 18/20/24 px, texto visible en acciones críticas y `aria-hidden` para decoración.
- **Movimiento:** duraciones 120/180/240 ms; propiedades de transform/opacidad cuando proceda; sin bucles decorativos; reducir o eliminar movimiento al solicitarlo el sistema.

### Componentes prioritarios

- **Tarjeta de oportunidad:** spot de demostración, ventana, modalidad, score no probabilístico, confianza y estado de seguridad; etiqueta mock persistente.
- **Selector temporal de 72 h:** lectura horizontal breve con alternativa reflow; no depender de arrastre ni de color.
- **Detalle de ventana:** factores favorables y desfavorables, procedencia/versión visible o recuperable y limitaciones.
- **Puerta de seguridad:** bloque independiente capaz de invalidar; texto directo, icono y estado semántico. Nunca una garantía.
- **Confianza:** nivel y explicación de frescura/completitud simuladas, visualmente distinto del score.
- **Registro de sesión:** permite captura o bolo, esfuerzo y feedback sin premiar visualmente solo el éxito.
- **Navegación:** mínima para el vertical; jerarquía móvil clara antes de introducir un dashboard persistente.

### Comportamiento responsive

- **Móvil:** una columna, oportunidad como unidad principal, prioridad a seguridad y próxima ventana, acciones frecuentes alcanzables con el pulgar y ningún contenido esencial solo al hover.
- **Tablet:** lista y detalle pueden convivir si el ancho real lo permite; evitar asumir orientación horizontal.
- **Escritorio:** composición lista-detalle o paneles, con ancho de lectura limitado para explicaciones. Más espacio no justifica más datos.
- **Reflow:** probar 320 CSS px equivalentes y zoom del 200 % sin pérdida de contenido o función; las tablas densas deben transformarse o desplazarse con nombre/contexto conservados.
- **Exterior:** validar brillo, reflejos, guantes o manos húmedas como contexto de investigación; no afirmar que una paleta funciona en costa sin pruebas.

### Accesibilidad mínima propuesta

- Objetivo WCAG 2.2 AA, sujeto a auditoría; texto normal al menos 4.5:1, texto grande y límites/estados no textuales al menos 3:1 cuando aplique.
- Navegación completa por teclado, foco visible y no oculto por barras o paneles fijos.
- Áreas táctiles de 44 × 44 CSS px como objetivo interno para acciones frecuentes; nunca bajar del criterio AA de 24 × 24 sin cumplir sus excepciones de espaciado.
- Estados expresados con texto, icono/forma y color; no convertir el score en la única explicación.
- Orden semántico estable, encabezados descriptivos, etiquetas de formulario y anuncios prudentes para cambios importantes.
- Respeto a `prefers-reduced-motion`, zoom, reflow, tamaño de texto y temas de alto contraste cuando sea viable.
- Pruebas manuales con teclado y lectores de pantalla, además de automatización. La base Reka/Nuxt UI no reemplaza estas pruebas.

## Riesgos, supuestos y puntos pendientes

- `needs-validation`: Nuxt UI permite lograr suficiente carácter propio sin una acumulación frágil de overrides.
- `needs-validation`: la proporción 80/20 resulta sofisticada para usuarios reales y no parece arcade, infantil o derivativa.
- `needs-validation`: Geist Pixel mantiene legibilidad en los tamaños, idiomas y dispositivos previstos; si no, debe eliminarse sin afectar jerarquía.
- `needs-validation`: los tokens claros y oscuros cumplen contraste en todos los estados, no solo en los pares base calculados.
- `needs-validation`: la densidad funciona en móvil exterior y en lectura prolongada de explicaciones.
- `needs-validation`: el patrón de score no se interpreta como probabilidad y la puerta de seguridad domina incluso ante un score alto.
- `needs-validation`: SSR, hidratación, teleports, carga de fuentes y árbol de dependencias con versiones fijadas.
- `needs-validation`: presupuesto medido de CSS, JavaScript, fuentes, renderizado e interacción; no hay benchmark de producto todavía.
- `needs-validation`: coste y condiciones actuales de cualquier dependencia antes de instalarla, especialmente PrimeVue 5/PrimeUI.
- **Supuesto:** el primer vertical usa contenido mock claramente etiquetado y no requiere mapas avanzados.
- **Riesgo de mantenimiento:** mezclar primitivas o construir una capa headless completa antes de validar el flujo.
- **Riesgo legal/IP:** interpretar “Atari” como permiso para imitar activos reconocibles. La propuesta prohíbe esa imitación.

## Plan técnico futuro, sujeto a especificación aprobada

1. Definir tokens semánticos de color, tipografía, espaciado, geometría, elevación y movimiento sin acoplarlos a una biblioteca.
2. Fijar versiones y registrar licencias de Nuxt UI, Tailwind, Reka, Lucide y fuentes.
3. Crear un *spike* desechable de las cuatro piezas críticas: tarjeta, detalle, puerta de seguridad y formulario de sesión/bolo.
4. Probar tema oscuro y claro, 320 px, 200 % de zoom, teclado, foco, lector de pantalla y movimiento reducido.
5. Medir el artefacto construido: CSS, JavaScript, fuentes, hidratación y tiempos de interacción en dispositivos representativos.
6. Evaluar con usuarios la comprensión de score/confianza/seguridad y la intensidad visual.
7. Documentar la decisión resultante en una especificación/ADR si afecta significativamente a la arquitectura.
8. Implementar en vertical slices únicamente después de aprobar la especificación correspondiente.

## Pruebas derivadas de los criterios

- **Diferenciación:** comparación ciega entre defaults de Nuxt UI y el spike; comprobar que paleta, tipografía, geometría y composición son propias sin referencias retro copiadas.
- **Comprensión:** pedir a participantes que expliquen score, confianza y seguridad, incluida una ventana favorable invalidada.
- **Responsive:** recorrer los flujos a 320, 768, 1024 y 1440 CSS px, en ambas orientaciones cuando proceda y con zoom al 200 %.
- **Accesibilidad automatizada:** ejecutar reglas WCAG sobre ambos temas y cada estado, sabiendo que no cubren toda la conformidad.
- **Accesibilidad manual:** teclado, foco, nombres/roles/estados, VoiceOver y al menos otro lector de pantalla representativo.
- **Contraste:** verificar cada combinación efectiva, incluidos disabled, hover, focus, overlays, gráficos y semitransparencias.
- **Movimiento:** confirmar paridad funcional con `prefers-reduced-motion: reduce` y ausencia de animación esencial.
- **Rendimiento:** medir producción con imports reales y fuentes subconjuntadas; comparar contra un presupuesto acordado, no contra marketing de proveedores.
- **Licencias:** inventariar paquete, versión, licencia, atribución y obligación antes de integrar.
- **Contenido:** comprobar que todos los datos simulados llevan etiqueta persistente y que no aparecen coordenadas sensibles o no verificadas.

## Fuentes primarias y oficiales

Todas fueron consultadas el **2026-09-04**. Las cifras de componentes, versiones y características pertenecen a ese momento y pueden cambiar.

### Bibliotecas

- [UnoCSS — Why UnoCSS](https://unocss.dev/guide/why): arquitectura bajo demanda, extensibilidad y diferencias declaradas frente a otros motores; fuente oficial, sin adoptar sus afirmaciones de rendimiento como benchmark.
- [UnoCSS — módulo Nuxt](https://unocss.dev/integrations/nuxt): instalación, configuración y matriz de soporte oficial.
- [UnoCSS — repositorio y licencia](https://github.com/unocss/unocss): código y licencia MIT; la versión publicada consultada fue 66.10.0.
- [Reka UI — introducción](https://reka-ui.com/docs/overview/introduction): alcance headless, personalización, tipado y tree-shaking declarados.
- [Reka UI — accesibilidad](https://reka-ui.com/docs/overview/accessibility): WAI-ARIA, teclado, foco y responsabilidad de etiquetado.
- [Reka UI — instalación Nuxt](https://www.reka-ui.com/docs/overview/installation): módulo y autoimportación oficiales; versión publicada consultada 2.10.4.
- [Reka UI — SSR](https://www.reka-ui.com/docs/guides/server-side-rendering): soporte SSR y contexto de hidratación en versiones antiguas de Vue.
- [Reka UI — repositorio](https://github.com/unovue/reka-ui): continuidad de Radix Vue y licencia MIT.
- [Nuxt UI — introducción](https://ui.nuxt.com/docs/getting-started): tecnologías base, componentes, accesibilidad, personalización, color mode y licencia MIT.
- [Nuxt UI — componentes](https://ui.nuxt.com/docs/components): catálogo y patrones responsive declarados; versión publicada consultada 4.11.0.
- [PrimeVue — modo unstyled](https://primevue.dev/theming/unstyled/): separación de estilos y comportamiento en la versión vigente.
- [PrimeVue — Nuxt](https://primevue.dev/nuxt): módulo oficial, autoimportación, tree-shaking y requisito de clave PrimeUI.
- [PrimeVue — accesibilidad](https://primevue.dev/guides/accessibility/): guía general y remisión al detalle por componente.
- [PrimeVue — paquete npm](https://www.npmjs.com/package/primevue): versión vigente 5.0.1 y licencia declarada como PrimeUI, no MIT.
- [PrimeUI — licencia Community](https://primeui.dev/eula/community): criterios, clave, renovación y límites vigentes; requiere revisión profesional si se considera adoptar.
- [PrimeVue 4 — repositorio archivado](https://github.com/primefaces/primevue): continuidad histórica y confirmación de que versiones MIT previas permanecen MIT.
- [Ark UI — acerca de](https://ark-ui.com/docs/overview/about): alcance, frameworks, arquitectura Zag.js y licencia MIT.
- [Ark UI — Select](https://ark-ui.com/docs/components/select): ejemplo oficial de patrón WAI-ARIA y teclado.
- [Ark UI — changelog](https://ark-ui.com/docs/overview/changelog): actividad y correcciones recientes de SSR/accesibilidad; versión Vue consultada 5.39.1.
- [Ark UI — repositorio](https://github.com/chakra-ui/ark): mantenimiento, paquetes y licencia MIT.

### Accesibilidad y activos visuales

- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/): requisitos normativos de contraste, reflow, teclado, foco, movimiento y tamaño de objetivo.
- [W3C — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum): interpretación oficial del mínimo AA de 24 × 24 CSS px y sus excepciones.
- [W3C — Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html): referencia para el objetivo interno de 44 × 44 CSS px.
- [Vercel — repositorio Geist](https://github.com/vercel/geist-font): Geist Sans, Mono y Pixel; licencia SIL OFL 1.1; versión publicada visible en la consulta 1.7.1.
- [Vercel — introducción de Geist Pixel](https://vercel.com/blog/introducing-geist-pixel): propósito de display y variantes; referencia estética, no licencia separada.
- [Braille Institute — Atkinson Hyperlegible](https://www.brailleinstitute.org/freefont): familia orientada a legibilidad, variantes Next y Mono; licencia de fuente incluida por el editor.
- [Google Fonts — Atkinson Hyperlegible Next](https://github.com/google/fonts/tree/main/ofl/atkinsonhyperlegiblenext): archivos distribuidos y texto SIL OFL 1.1 de la variante propuesta.
- [Lucide — repositorio](https://github.com/lucide-icons/lucide): iconos y licencia ISC.

## Resultado de la investigación

La dirección inicial queda **`proposed`**, no `decided`: **Terminal atlántico equilibrado sobre Nuxt UI v4**, con tokens propios, Geist Sans/Mono y Geist Pixel como acento muy limitado, Lucide como base iconográfica, oscuro prioritario con claro completo, y movimiento técnico breve. El siguiente paso no es instalar la biblioteca, sino aprobar una especificación de spike y validar comprensión, diferenciación, accesibilidad, responsive, rendimiento y licencias con versiones fijadas.
