# Arquitectura propuesta para una API multi-cliente

- **Estado:** `proposed`.
- **Implementación:** no iniciada.
- **Última actualización:** 2026-09-04.
- **Decisión relacionada:** [ADR-0004: API independiente de los clientes](../decisions/ADR-0004-multi-client-api.md), también `proposed`.

Este documento es una especificación arquitectónica para revisión. No describe endpoints, clientes, autenticación, integraciones ni infraestructura existentes, y no amplía el alcance del [primer vertical slice](../specs/001-fishing-opportunity-mvp.md).

## Problema

La dirección web-first necesita poder evolucionar sin convertir Nuxt en el contrato implícito del backend. A la vez, una futura aplicación iOS o Android y posibles automatizaciones internas deberían consumir los mismos casos de uso sin duplicar reglas, filtrar datos sensibles de forma distinta o acoplar el dominio de pesca a una marca comercial.

Sin convenciones explícitas, cada cliente podría introducir nombres, formatos temporales, unidades, paginación, errores, autenticación o políticas de privacidad incompatibles. Corregir esas diferencias después elevaría el coste de evolución y el riesgo de exponer ubicaciones, credenciales o tokens de dispositivo.

## Objetivos

- Proponer un contrato HTTP único y agnóstico del tipo de cliente.
- Mantener el [monolito modular decidido](../decisions/ADR-0002-modular-monolith.md) y sus límites de dominio.
- Hacer explícitas las reglas transversales necesarias antes de definir endpoints.
- Permitir evolución compatible y futura generación de clientes tipados desde OpenAPI.
- Aplicar privacidad por defecto a ubicación, imágenes, notificaciones y observabilidad.
- Convertir los criterios de aceptación de esta propuesta en validaciones del contrato futuro.

## Fuera de alcance

- Diseñar o implementar endpoints concretos.
- Implementar una API, un servidor, un cliente, autenticación, almacenamiento, subida de imágenes o notificaciones.
- Elegir proveedor de identidad, almacenamiento, CDN, telemetría o mensajería push.
- Cambiar la prioridad web-first ni incorporar aplicaciones nativas al MVP.
- Diseñar microservicios, una malla de servicios o contratos de red entre módulos internos.
- Fijar cuotas, tamaños, retenciones, SLO o ventanas de compatibilidad sin evidencia operativa y de producto.
- Presentar como reales datos, coordenadas, normativa o condiciones todavía no verificadas.

## Principios y límites

### Un despliegue, límites explícitos

La propuesta conserva un único monolito modular. La API es un adaptador de entrada del mismo despliegue, no un servicio separado. Añadir otro cliente no crea otro backend ni autoriza una bifurcación de reglas.

La dirección de dependencias propuesta es `API -> aplicación -> dominio`; infraestructura implementa puertos requeridos por aplicación o dominio. En concreto:

- **Dominio:** conceptos e invariantes de pesca, como spots, condiciones, scoring, recomendaciones, sesiones y feedback. No conoce HTTP, OpenAPI, Nuxt, plataformas móviles, proveedores ni nombres comerciales.
- **Aplicación:** orquesta casos de uso, transacciones, autorización y políticas de visibilidad. Recibe comandos y consultas independientes del transporte.
- **API:** autentica el contexto cuando corresponda, valida representaciones, traduce DTO a entradas de aplicación y traduce resultados a HTTP. No contiene reglas de scoring ni decisiones de privacidad propias.
- **Infraestructura:** persistencia y adaptadores sustituibles para proveedores externos, objetos, identidad, push y telemetría. No filtra por sí sola qué ubicación puede ver una persona.

Los DTO de la API no son entidades de dominio. Las proyecciones públicas, privadas y administrativas se modelarán por capacidad y política, no por el nombre del cliente. Ningún módulo del dominio importará tipos generados desde OpenAPI.

### Clientes previstos

El contrato debe poder servir, sin semántica exclusiva por consumidor, a:

- la web pública, para recursos explícitamente publicables;
- la futura aplicación web Nuxt;
- clientes iOS y Android futuros;
- automatizaciones internas futuras con identidad y permisos propios.

Las diferencias de interfaz, caché local o capacidades del dispositivo pertenecen a cada adaptador cliente. Un cliente no obtiene más datos por declarar que es móvil, web o interno: la identidad, el permiso y la política del recurso gobiernan la respuesta.

## Requisitos del contrato

### R-API-001 — OpenAPI como contrato previo

- `proposed`: mantener una descripción OpenAPI como fuente de verdad del borde HTTP antes de implementar cada operación.
- La descripción fijará una versión exacta de la familia OpenAPI 3.1, incluirá identificadores estables de operación, esquemas, formatos, seguridad, ejemplos y todas las respuestas conocidas.
- `needs-validation`: confirmar la versión de parche de OpenAPI y la compatibilidad del validador, FastAPI y generadores antes del primer contrato. El catálogo oficial ya contiene versiones 3.2 y 3.1; no se presupone que el ecosistema elegido soporte ambas igual.
- Toda operación futura deberá enlazar con un caso de uso y con criterios de aceptación aprobados; publicar OpenAPI no demuestra que la operación exista ni funcione.

### R-API-002 — Versionado y compatibilidad

- `proposed`: usar un segmento de versión mayor en la ruta base, con forma conceptual `/api/v1`; no se define aquí ninguna ruta de recurso.
- La versión del API, la versión del documento OpenAPI y la versión del scoring son conceptos distintos.
- Dentro de una versión mayor solo se permitirán cambios compatibles: añadir operaciones, añadir campos de respuesta opcionales y aceptar entradas nuevas sin cambiar el significado anterior.
- Eliminar o renombrar campos, endurecer validaciones aceptadas, cambiar unidades o tipos, reutilizar valores, alterar autorización observable o añadir valores a un enum cerrado se tratará como potencialmente incompatible.
- Los campos desconocidos en respuestas deberán poder ignorarse; las entradas desconocidas se rechazarán de forma consistente para detectar errores de cliente, salvo que un esquema documente extensibilidad explícita.
- Una ruptura requerirá nueva versión mayor, guía de migración, periodo de coexistencia y telemetría de uso. La deprecación se anunciará en contrato y, si se adopta en la implementación, mediante `Deprecation`, enlace de migración y `Sunset` conforme a los RFC aplicables.
- `needs-validation`: duración mínima de soporte, política de retirada y consumidores que deben aprobar una ruptura.

### R-API-003 — Recursos, identificadores y representaciones

- Los recursos usarán sustantivos plurales en minúsculas y `kebab-case`; las acciones se expresarán con semántica HTTP o, si no encajan, como subrecursos documentados, nunca como verbos arbitrarios ocultos.
- JSON usará `lowerCamelCase`. Los identificadores serán cadenas opacas, estables e inmutables; los clientes no inferirán tipo, orden, fecha ni permisos a partir de ellos.
- Los nombres del contrato procederán del lenguaje ubicuo de pesca definido en el [mapa de dominio](domain-map.md), no de Nuxt, de un sistema operativo ni del nombre comercial del producto.
- Las representaciones distinguirán ausencia, `null`, cero y colección vacía. Cada campo tendrá descripción, obligatoriedad y reglas de evolución explícitas.
- El idioma de un texto presentado al usuario no cambiará la semántica de códigos, estados o identificadores. La localización de contenido queda `needs-validation`.

### R-API-004 — Errores consistentes

- Los errores usarán `application/problem+json` conforme a RFC 9457 con `type`, `title`, `status`, `detail` e `instance` cuando proceda.
- Extensiones propuestas: un `code` estable legible por máquina, un `requestId` opaco y una colección `invalidParams` con puntero al campo y motivo estable para errores de validación.
- Los clientes decidirán por estado, `type` o `code`; nunca analizarán `title` o `detail` localizados.
- La API no expondrá trazas, consultas, nombres internos, credenciales, existencia de recursos no autorizados ni coordenadas privadas mediante errores.
- Autenticación, autorización, conflicto, precondición, validación, límite de uso y fallo temporal conservarán significados HTTP distintos. Los reintentos se indicarán solo cuando sean seguros.

### R-API-005 — Instantes, zona civil y calendarios

- Todo instante de intercambio y persistencia se representará en UTC con perfil RFC 3339 y sufijo `Z`.
- Cuando una decisión dependa de hora civil, se transportará además un identificador de la base IANA, por ejemplo `Europe/Madrid`; un desplazamiento como `+02:00` no sustituye una zona.
- Fechas civiles, horas locales e instantes serán tipos distintos. La conversión por horario de verano se realizará en el borde usando una versión conocida de la base de zonas.
- Cada intervalo documentará inclusividad; la convención propuesta para consultas es inicio incluido y fin excluido.
- No se intercambiarán fechas formateadas por locale ni abreviaturas ambiguas. La preferencia de zona del usuario no altera el instante de una condición o recomendación.
- `needs-validation`: política ante horas locales inexistentes o duplicadas y conservación de versión de la base de zonas para reproducción histórica.

### R-API-006 — Unidades de medida

- Cada cantidad ambiental o de actividad tendrá valor numérico y código de unidad inequívoco; no se codificará la unidad en el nombre del campo.
- `proposed`: usar códigos UCUM en el contrato y una unidad canónica por magnitud para cálculo y comparación. La preferencia métrica o imperial será una responsabilidad de presentación.
- La conversión no reducirá precisión de dominio ni cambiará umbrales de scoring. Redondeo, precisión y significado de valores ausentes se documentarán por campo.
- `needs-validation`: revisar cobertura y licencia de UCUM 2.2 para las magnitudes pesqueras concretas antes de fijar el catálogo.

### R-API-007 — Colecciones, cursores y filtros

- Las colecciones potencialmente crecientes usarán paginación por cursor opaco, no desplazamiento. La respuesta distinguirá elementos, cursor siguiente opcional y si existe otra página.
- El cursor quedará ligado a identidad o visibilidad, filtros, orden y tamaño de página; será íntegro, tendrá caducidad documentada y nunca incluirá coordenadas o datos sensibles decodificables.
- El orden será estable y tendrá desempate por identificador. No se prometerá un total exacto si calcularlo es caro o si puede cambiar durante el recorrido.
- Cada colección declarará un conjunto cerrado de filtros y órdenes. No habrá un lenguaje genérico que permita consultar campos arbitrarios.
- Los conjuntos se expresarán como parámetros repetibles; los rangos temporales seguirán R-API-005. Parámetros desconocidos o combinaciones inválidas producirán un problema de validación.
- `needs-validation`: límites mínimo y máximo, duración del cursor y garantías de consistencia entre páginas.

### R-API-008 — Escrituras seguras e idempotencia

- Se respetará la idempotencia definida por HTTP para métodos estándar. Las actualizaciones susceptibles de sobrescribir cambios concurrentes usarán precondiciones, por ejemplo ETag e `If-Match`, cuando el caso de uso lo requiera.
- Las escrituras no idempotentes y reintentables podrán exigir una clave opaca de idempotencia. Su ámbito propuesto combina principal, método, destino y clave; la misma clave con el mismo cuerpo repite el resultado, y con otro cuerpo produce conflicto.
- El servidor deberá definir retención, estado de solicitudes concurrentes, huella del cuerpo y qué respuesta se reproduce. La deduplicación no sustituye invariantes y restricciones transaccionales.
- `needs-validation`: el nombre `Idempotency-Key` y su sintaxis no son todavía una norma estable; el borrador IETF consultado está expirado. Se revisará su estado y el soporte de tooling antes de congelar el contrato.

### R-API-009 — Subida y entrega de imágenes

- `proposed`: separar autorización y metadatos del plano de bytes. La API crearía una intención limitada y el cliente transferiría a almacenamiento de objetos mediante una autorización breve; completar la intención no vuelve pública la imagen automáticamente.
- Los objetos permanecerán privados y en cuarentena hasta validar tipo real, tamaño, dimensiones y decodificación. Se permitirá una lista mínima de formatos, se generará un nombre de almacenamiento no controlado por el usuario y se eliminarán EXIF y coordenadas antes de cualquier derivado visible.
- La imagen pasará por estados explícitos como pendiente, lista o rechazada. Procesar o finalizar será seguro ante reintentos, y la entrega privada usará autorización breve.
- Nunca se aceptará una URL arbitraria para que el servidor la descargue sin controles específicos contra SSRF. Nombre de archivo y `Content-Type` enviados por el cliente no serán evidencia suficiente.
- Cuotas, antivirus, moderación, transformaciones, formatos, tamaños, retención y eliminación quedan `needs-validation` antes de especificar una operación.

### R-API-010 — Autenticación y autorización futuras

Autenticación y cuentas continúan fuera del MVP. Si se aprueban en una especificación posterior:

- `proposed`: basar autenticación delegada en OAuth 2.0/OIDC con flujo de código de autorización y PKCE, siguiendo RFC 9700.
- La web evaluará un patrón backend-for-frontend con sesión `Secure`, `HttpOnly` y `SameSite`; los clientes nativos serán clientes públicos, usarán el agente de usuario externo y almacenamiento seguro del sistema conforme a RFC 8252.
- No se incrustarán secretos compartidos en aplicaciones distribuidas. Automatizaciones internas usarán identidad de carga o cliente confidencial separado, permisos mínimos y credenciales rotables.
- Tokens de acceso tendrán audiencia y alcance estrechos y vida corta; la estrategia de refresh, rotación, revocación y vinculación del emisor queda por diseñar.
- La aplicación comprobará autorización de objeto, acción y campo en cada caso de uso. El identificador opaco y CORS no son controles de autorización.
- `needs-validation`: proveedor, recuperación de cuenta, MFA, paso de sesión web, almacenamiento móvil, modelo de scopes y requisitos legales antes de crear el contrato.

### R-API-011 — CORS y protección del navegador

- CORS se desactivará salvo para clientes de navegador que realmente lo necesiten y se configurará por entorno con orígenes exactos.
- No se combinarán credenciales con origen comodín. Métodos, encabezados expuestos, encabezados permitidos y duración de preflight se reducirán al mínimo.
- CORS no sustituye autenticación, autorización ni protección CSRF. Si la web usa cookies, las operaciones con efecto deberán tener una defensa CSRF explícita.
- Redirecciones OAuth y orígenes autorizados tendrán listas independientes; no se reflejará un `Origin` arbitrario.

### R-API-012 — Límites de uso

- Existirán límites diferenciados por riesgo: IP o red antes de autenticación y principal, instalación o capacidad después de autenticación. Subidas, login, recuperación, exportación y registro de dispositivos requerirán políticas más estrictas que lecturas públicas.
- Al limitar una petición se responderá `429 Too Many Requests`, un problema RFC 9457 y `Retry-After` cuando pueda darse una espera útil. Los clientes aplicarán backoff con jitter y no reintentarán indefinidamente.
- Las claves de partición y capacidad interna no se expondrán de forma que faciliten abuso. El límite no reemplaza cuotas de almacenamiento, concurrencia ni protección de flujos sensibles.
- `needs-validation`: cuotas reales y adopción de `RateLimit-Policy`/`RateLimit`; esos campos siguen siendo un borrador IETF activo en la fecha de consulta.

### R-API-013 — Caché y concurrencia

- Se usarán semántica y directivas de RFC 9111, ETag y peticiones condicionales cuando la representación lo permita.
- Solo contenido anónimo y explícitamente público podrá optar a caché compartida. Datos de cuenta, tokens, ubicaciones precisas, intenciones de subida y respuestas de autorización serán `private` o `no-store` según el riesgo.
- La clave de caché deberá incluir toda dimensión que cambie una representación autorizada. `Vary` se limitará a encabezados necesarios para evitar fragmentación y mezclas de permisos.
- Una notificación o un error nunca invalidará por sí mismo las reglas de caché del recurso. TTL, revalidación y tolerancia a datos obsoletos se decidirán por caso de uso.
- `needs-validation`: clasificación de caché, TTL y estrategia de invalidación de cada futura operación.

### R-API-014 — Notificaciones y registros de dispositivo futuros

- La aplicación producirá una intención de notificación después de confirmar el cambio de estado; un adaptador proveedor-específico hará la entrega. El dominio no conocerá APNs, FCM ni Web Push.
- Una notificación será una pista posiblemente duplicada, retrasada o perdida. Contendrá un identificador opaco y metadatos mínimos; el cliente consultará el API para obtener estado vigente.
- Los registros se asociarán a instalación, plataforma, entorno, proveedor, cuenta opcional, consentimiento, preferencias y fecha de actualización. Se aceptarán varios dispositivos, rotación, revocación y eliminación de registros inválidos o inactivos.
- Tokens o identificadores de instalación serán secretos operativos: cifrados en reposo, ocultos de logs y errores y nunca usados como identidad de usuario.
- El payload visible no incluirá coordenadas, nombre de un spot sensible, tokens ni detalles que revelen actividad en una pantalla bloqueada. Caducidad, colapso y deduplicación impedirán alertas obsoletas.
- `needs-validation`: canales, proveedores, consentimiento por plataforma, retención, umbral de inactividad y garantías de entrega. La documentación vigente de Apple y Firebase confirma que los identificadores pueden cambiar y deben mantenerse actualizados.

### R-API-015 — Privacidad de ubicación

- Se mantiene la [privacidad de ubicación decidida](privacy-and-location.md): geometría precisa privada y representación pública aproximada son datos distintos.
- La aplicación seleccionará una proyección autorizada antes de serializar. Un cliente público nunca recibirá precisión adicional para ocultarla en su interfaz.
- Endpoints, filtros, cursores, errores, imágenes, notificaciones, cachés, logs, trazas, métricas y analítica seguirán la misma clasificación de sensibilidad.
- La precisión se reducirá y, si corresponde, se retrasará antes de cruzar el borde API. El acceso a ubicación precisa será auditable y revocable según la política aprobada.
- No se inferirá consentimiento para publicar a partir de registrar una sesión, subir una foto o compartir temporalmente con un contacto de seguridad.
- `needs-validation`: base jurídica, consentimiento, retención, exportación, borrado, resolución y retraso con revisión legal vigente. La propuesta aplica minimización y privacidad desde el diseño, pero no ofrece certeza legal.

### R-API-016 — Observabilidad sin filtraciones

- Cada solicitud tendrá un identificador opaco y podrá propagar `traceparent` conforme a W3C Trace Context. Esto sirve también en un monolito y no justifica distribuirlo.
- Logs estructurados, métricas y trazas usarán plantillas de ruta, operación, estado, latencia, tamaño y resultado; nunca rutas materializadas con identificadores como dimensión de alta cardinalidad.
- No se registrarán cuerpos completos, credenciales, cookies, claves de idempotencia, tokens de dispositivo, URL firmadas, EXIF ni coordenadas precisas. La redacción ocurrirá antes de exportar telemetría.
- Accesos a ubicación sensible, cambios de permisos, exportaciones y acciones administrativas tendrán auditoría separada, íntegra y con retención `needs-validation`.
- Se fijarán versión de convenciones semánticas y política de muestreo. SLI, SLO, alertas y proveedor quedan `needs-validation`.

### R-API-017 — Clientes tipados y evolución

- `future`: generar clientes de transporte desde el documento OpenAPI después de validar compatibilidad con TypeScript, Swift y Kotlin.
- Los generados expondrán DTO y operaciones HTTP, no entidades ni reglas de dominio. Cada aplicación podrá envolverlos con modelos de presentación propios.
- Generador, configuración y versión se fijarán; el contrato tendrá fixtures y pruebas de compilación en los lenguajes realmente soportados antes de publicar una versión.
- Ninguna personalización para Nuxt, iOS o Android modificará el significado común de un recurso. Las capacidades nuevas se descubrirán por contrato y permisos, no por bifurcaciones según `User-Agent`.
- `needs-validation`: generadores, tratamiento de `nullable`, enums abiertos, fechas, enteros, binarios y errores en cada lenguaje.

## Seguridad y privacidad transversales

Antes de aprobar una operación se realizará modelado de amenazas, con especial atención a autorización de objeto y campo, consumo no restringido, SSRF, carga de archivos, enumeración, replay, cachés compartidas y exposición de secretos. La referencia OWASP API Security Top 10 2023 orienta la revisión, pero no constituye por sí sola evidencia de seguridad.

La política por defecto será denegar y minimizar. Los contratos deben permitir responder sin confirmar la existencia de un recurso no autorizado. Las decisiones de seguridad, confianza y normativa del dominio seguirán siendo independientes del score y no podrán degradarse por conveniencia de un cliente.

## Criterios de aceptación de esta propuesta

- [ ] **AC-01:** revisión humana confirma que los límites dominio/aplicación/API/infraestructura conservan el monolito modular y la dirección de dependencias.
- [ ] **AC-02:** un contrato de prueba puede representar el mismo caso de uso para web, Nuxt, iOS, Android y automatización sin campos o reglas con nombre de cliente.
- [ ] **AC-03:** el linter OpenAPI acepta la versión fijada y todos los errores documentados validan contra un esquema RFC 9457 común.
- [ ] **AC-04:** pruebas de contrato verifican versión mayor, nombres, identificadores opacos, rechazo uniforme de entrada desconocida y compatibilidad de cambios aditivos.
- [ ] **AC-05:** fixtures cubren UTC, zona IANA, cambio horario, intervalos y unidades sin depender del locale del cliente.
- [ ] **AC-06:** pruebas de paginación demuestran orden estable, cursor opaco ligado a filtros, rechazo de cursor alterado y ausencia de datos sensibles.
- [ ] **AC-07:** pruebas de reintento y concurrencia demuestran la semántica acordada para idempotencia, precondiciones y claves reutilizadas con otro cuerpo.
- [ ] **AC-08:** una prueba de seguridad de imágenes rechaza tipo falso, exceso de tamaño y archivo inválido, elimina metadatos de ubicación y mantiene el objeto no aprobado fuera de acceso público.
- [ ] **AC-09:** pruebas de autorización por objeto y campo niegan ubicación precisa a una identidad sin permiso con independencia del tipo de cliente.
- [ ] **AC-10:** pruebas de CORS niegan orígenes no registrados y pruebas de límite devuelven `429`, problema consistente y espera documentada.
- [ ] **AC-11:** pruebas de caché no permiten almacenar o mezclar respuestas privadas y validan revalidación de contenido público.
- [ ] **AC-12:** fixtures de notificación no contienen datos sensibles, toleran duplicados y rotación de registro y obligan a consultar el estado actual.
- [ ] **AC-13:** telemetría de prueba permite correlación sin cuerpos, credenciales, identificadores sensibles, coordenadas ni cardinalidad por recurso.
- [ ] **AC-14:** los clientes tipados seleccionados compilan contra fixtures compatibles y detectan deliberadamente un cambio incompatible.
- [ ] **AC-15:** una revisión final confirma que OpenAPI, comportamiento, pruebas, ADR y documentación no se contradicen ni afirman implementación inexistente.

Ningún criterio está cumplido: todavía no existe un contrato OpenAPI ni una implementación sobre la que ejecutar estas pruebas.

## Plan técnico propuesto

Cada paso requiere una especificación aprobada y un incremento pequeño:

1. Revisar y aceptar o rechazar [ADR-0004](../decisions/ADR-0004-multi-client-api.md), resolviendo primero las preguntas que bloqueen el contrato mínimo.
2. Definir convenciones OpenAPI reutilizables para identificadores, tiempo, unidades, problemas, cursores y metadatos de petición.
3. Diseñar una única operación de lectura del vertical slice y derivar sus pruebas de AC-01 a AC-06, AC-09, AC-11 y AC-13.
4. Diseñar una única escritura del vertical slice y derivar pruebas de AC-03, AC-04, AC-07, AC-09 y AC-13.
5. Validar compatibilidad real con el cliente web sin introducir tipos de Nuxt en dominio o aplicación.
6. Tratar imágenes, autenticación, notificaciones y clientes nativos solo en especificaciones futuras aprobadas, usando los criterios correspondientes.
7. Automatizar lint, diff de ruptura, pruebas de contrato y sincronización de documentación antes de publicar cada contrato.

## Riesgos, supuestos y decisiones pendientes

- `proposed`: HTTP JSON y OpenAPI son suficientes para el primer borde público; debe confirmarse con un vertical real.
- `proposed`: una versión mayor en ruta simplifica clientes móviles y cachés más que negociación por encabezado.
- `needs-validation`: compatibilidad entre OpenAPI 3.1, FastAPI y generadores TypeScript, Swift y Kotlin.
- `needs-validation`: política de compatibilidad, retirada y soporte de versiones de aplicaciones que no se actualizan de inmediato.
- `needs-validation`: amenaza y coste operativo de objetos, análisis de imágenes y URL firmadas.
- `needs-validation`: requisitos legales y de plataforma para identidad, geolocalización, notificaciones y borrado.
- `needs-validation`: si los borradores IETF de idempotencia y rate limit cambian antes de implementarlos.
- `needs-validation`: límites de cardinalidad y redacción que preserven diagnóstico sin exponer actividad pesquera sensible.
- Riesgo: un esquema compartido puede convertirse en un modelo de dominio anémico si se reutilizan DTO dentro del núcleo.
- Riesgo: campos opcionales sin política de presencia pueden producir incompatibilidades silenciosas entre clientes.
- Riesgo: una caché, traza, imagen o notificación puede eludir el filtrado principal y revelar ubicación.
- Riesgo: tratar push como entrega garantizada puede dejar al cliente con estado obsoleto o duplicado.
- Riesgo: los clientes generados pueden aparentar compatibilidad aunque el comportamiento haya cambiado.

## Fuentes consultadas

Todas las fuentes se consultaron el 2026-09-04. Las RFC y especificaciones se usan como referencias técnicas; su mención no implica integración.

- [OpenAPI Specification, catálogo y versiones publicadas](https://spec.openapis.org/oas/) — fuente oficial de OpenAPI Initiative; la versión exacta queda pendiente de compatibilidad.
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) y [RFC 9111: HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html) — semántica, métodos, precondiciones y caché HTTP.
- [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html) — formato base de problemas y advertencia sobre exposición de detalles internos.
- [RFC 3339: Date and Time on the Internet](https://www.rfc-editor.org/rfc/rfc3339.html), [RFC 9557: Timestamps with Additional Information](https://www.rfc-editor.org/rfc/rfc9557.html) e [IANA Time Zone Database](https://www.iana.org/time-zones) — instantes y zonas civiles.
- [UCUM Specification](https://ucum.org/ucum) y [artefactos UCUM 2.2](https://ucum.org/docs/artifacts) — códigos inequívocos de unidades; licencia y cobertura concreta pendientes de revisión.
- [RFC 9700: Best Current Practice for OAuth 2.0 Security](https://www.rfc-editor.org/rfc/rfc9700.html) y [RFC 8252: OAuth 2.0 for Native Apps](https://www.rfc-editor.org/rfc/rfc8252.html) — dirección futura de autenticación web y móvil.
- [WHATWG Fetch Standard](https://fetch.spec.whatwg.org/) — modelo normativo de CORS en navegadores.
- [RFC 6585](https://www.rfc-editor.org/rfc/rfc6585.html) y [borrador IETF RateLimit -11](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/) — `429` estable y campos de cuota todavía en evolución.
- [Borrador IETF Idempotency-Key -07](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/) — borrador expirado consultado solo como antecedente, no como norma.
- [RFC 9745: Deprecation](https://www.rfc-editor.org/rfc/rfc9745.html) y [RFC 8594: Sunset](https://www.rfc-editor.org/rfc/rfc8594.html) — comunicación de deprecación y retirada.
- [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) y [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) — catálogo de riesgos y controles de carga; referencias de seguridad, no certificación.
- [W3C Trace Context](https://www.w3.org/TR/trace-context/) y [OpenTelemetry Semantic Conventions 1.44.0](https://opentelemetry.io/docs/specs/semconv/) — propagación y vocabulario de telemetría; las convenciones HTTP aún contienen estados de estabilidad distintos.
- [Apple: Registering your app with APNs](https://developer.apple.com/documentation/usernotifications/registering-your-app-with-apns) y [Firebase: registration management](https://firebase.google.com/docs/cloud-messaging/manage-tokens) — rotación, multiplicidad y limpieza de registros de dispositivo; no se elige proveedor.
- [Reglamento (UE) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) — fuente oficial para minimización y protección desde el diseño; la aplicación jurídica concreta requiere validación profesional vigente.

## Definición de hecho documental

Esta propuesta solo podrá pasar a una decisión aceptada cuando:

- una persona responsable revise el ADR y resuelva o acepte explícitamente los puntos `needs-validation` bloqueantes;
- una especificación de vertical slice derive un contrato y pruebas de estos criterios;
- las fuentes con estado cambiante se revisen de nuevo en la fecha de implementación;
- las validaciones demuestren que contrato, clientes y comportamiento coinciden;
- la documentación afectada y el changelog se sincronicen en el cambio que implemente la decisión.

En el estado actual no hay implementación que declarar terminada.
