# ADR-0004: API independiente de los clientes

- **Estado:** `proposed`; pendiente de revisión humana.
- **Fecha:** 2026-09-04.
- **Implementación:** no iniciada.
- **Decisiones relacionadas:** [ADR-0002: monolito modular](ADR-0002-modular-monolith.md) y [ADR-0003: aplicación web primero](ADR-0003-web-first.md), ambas `decided` como dirección y no implementadas.

## Contexto

La aplicación web es la primera dirección aceptada, pero el producto puede necesitar después una web pública, una aplicación Nuxt, clientes iOS y Android y automatizaciones internas. Si el primer backend refleja componentes de Nuxt, una plataforma móvil o el nombre comercial, cada cliente futuro heredará ese acoplamiento o duplicará reglas de pesca, autorización y privacidad.

También hace falta una frontera verificable para tiempo, unidades, errores, paginación, compatibilidad, imágenes, identidad, caché, notificaciones y ubicación. Esa frontera no debe convertir los módulos internos en servicios distribuidos ni ampliar el MVP, que todavía excluye autenticación y aplicaciones nativas.

La [arquitectura API multi-cliente](../architecture/multi-client-api.md) contiene el problema, los requisitos, criterios de aceptación, plan, pruebas derivadas, riesgos y fuentes de esta propuesta.

## Decisión propuesta

Adoptar, sujeto a revisión, una API HTTP JSON agnóstica de clientes como adaptador de entrada del monolito modular:

- dominio y aplicación permanecerían independientes de HTTP, OpenAPI, frameworks, plataformas, proveedores y marca comercial;
- la API traduciría un contrato OpenAPI previo a comandos, consultas y resultados de aplicación;
- infraestructura implementaría puertos para persistencia y proveedores, sin decidir visibilidad ni reglas de dominio;
- web pública, Nuxt, iOS, Android y automatizaciones consumirían capacidades comunes con permisos propios, no variantes de dominio por cliente;
- la versión mayor se expresaría en la ruta base, mientras la evolución compatible permanecería dentro de esa versión;
- errores, UTC y zonas IANA, unidades, cursores, filtros, idempotencia, caché y observabilidad seguirían las convenciones de la especificación asociada;
- imágenes, autenticación OAuth/OIDC con PKCE y notificaciones serían capacidades futuras sujetas a especificaciones separadas;
- ubicación precisa se filtraría en aplicación antes de serializar y nunca se delegaría su ocultación al cliente.

Esta propuesta no define endpoints, no selecciona proveedores y no crea microservicios.

## Consecuencias

### Beneficios esperados

- Un mismo caso de uso podría exponerse a varios clientes sin trasladar reglas a sus interfaces.
- OpenAPI permitiría revisar contratos, detectar rupturas y generar clientes tipados en el futuro.
- Las políticas transversales tendrían una referencia única y verificable.
- Los límites del monolito modular seguirían siendo visibles sin coste de distribución.
- La privacidad no dependería de que cada cliente oculte correctamente datos ya recibidos.

### Costes y restricciones

- Cada cambio de comportamiento requeriría especificación, actualización de contrato, pruebas de compatibilidad y sincronización documental.
- Los DTO necesitarían mapeo explícito en vez de reutilizar entidades internas.
- Mantener versiones coexistentes y clientes móviles antiguos tendría coste operativo.
- OpenAPI y los generadores podrían discrepar en `nullable`, enums, fechas o binarios y exigir pruebas por lenguaje.
- Subidas, identidad, push y datos geográficos requerirían modelado de amenazas y decisiones legales antes de implementarse.

## Alternativas consideradas

### Backend específico para Nuxt

No se propone porque convertiría la primera interfaz en límite de negocio y dificultaría clientes nativos o automatizados. Un backend-for-frontend futuro para sesión web podría existir como adaptador, pero no sería el dueño de las reglas de pesca.

### Contratos separados por cliente

No se propone como punto de partida porque multiplicaría semántica, autorización y compatibilidad. Podrían justificarse proyecciones o adaptadores específicos, siempre sobre los mismos casos de uso y políticas.

### Compartir entidades internas directamente

No se propone porque acoplaría persistencia y dominio a la representación pública, ampliaría la superficie de datos y haría insegura la evolución.

### GraphQL desde el inicio

No se propone: el problema actual no demuestra necesidad de selección arbitraria o federación, y añadiría decisiones de autorización por campo, caché, coste de consultas y tooling antes del primer vertical.

### Microservicios por módulo

Se descarta porque contradice [ADR-0002](ADR-0002-modular-monolith.md) y añade distribución prematura sin evidencia de escala u organización.

## Riesgos

- El contrato puede acoplarse al primer cliente aunque sus nombres parezcan genéricos.
- Una evolución aparentemente aditiva puede romper generadores o clientes con enums cerrados.
- Caché, telemetría, imágenes y notificaciones pueden revelar ubicación fuera de la respuesta principal.
- Una API uniforme puede ocultar autorización insuficiente por objeto o campo.
- Borradores técnicos de idempotencia y rate limit pueden cambiar antes de la implementación.
- Las versiones móviles pueden obligar a mantener contratos antiguos más tiempo del previsto.

## Supuestos y puntos pendientes

- `proposed`: HTTP JSON y OpenAPI cubren el primer borde de aplicación.
- `proposed`: versionar la ruta por versión mayor es comprensible para todos los clientes previstos.
- `needs-validation`: versión exacta de OpenAPI y compatibilidad con FastAPI y generadores TypeScript, Swift y Kotlin.
- `needs-validation`: ventana de deprecación, SLO, cuotas, retención y política de soporte.
- `needs-validation`: arquitectura de sesión web, proveedor de identidad y modelo de permisos.
- `needs-validation`: controles, proveedor y coste de imágenes y notificaciones.
- `needs-validation`: obligaciones legales concretas para cuentas, ubicación, tokens, consentimiento y borrado.

## Validación requerida

Antes de cambiar el estado del ADR:

1. Revisar los criterios AC-01 a AC-15 de la [especificación arquitectónica](../architecture/multi-client-api.md).
2. Probar un contrato OpenAPI mínimo de lectura y escritura contra el cliente web previsto.
3. Ejecutar lint, pruebas de contrato, análisis de ruptura y fixtures de privacidad sin afirmar que ello implementa el producto.
4. Hacer una prueba de generación y compilación únicamente para los lenguajes cuya adopción se esté evaluando.
5. Revisar amenazas de autorización, ubicación, caché, archivos, notificaciones y telemetría.
6. Reconsultar las fuentes normativas y los borradores IETF en la fecha de implementación.
7. Obtener aceptación humana explícita; hasta entonces este ADR permanece `proposed`.

## Fuentes

Fuentes oficiales y primarias consultadas el 2026-09-04; la lista razonada completa figura en la [arquitectura asociada](../architecture/multi-client-api.md#fuentes-consultadas):

- [OpenAPI Specification](https://spec.openapis.org/oas/).
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html).
- [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html).
- [RFC 9700: OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700.html).
- [RFC 8252: OAuth 2.0 for Native Apps](https://www.rfc-editor.org/rfc/rfc8252.html).
- [W3C Trace Context](https://www.w3.org/TR/trace-context/).
- [Reglamento (UE) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

## Estado de adopción

No aceptado y no implementado. Este ADR no modifica el alcance actual ni autoriza construir endpoints, autenticación, clientes nativos, subidas o notificaciones.
