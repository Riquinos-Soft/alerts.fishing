# Arquitectura prevista

**Estado general: `proposed`; implementación: no iniciada.**

Esta página documenta una dirección técnica, no componentes ya construidos.

## Enfoque

- `decided`: monolito modular para evitar distribución prematura.
- `proposed`: separación ligera entre dominio, aplicación, infraestructura y API.
- `proposed`: proveedores externos detrás de interfaces sustituibles y observables.
- `proposed`: OpenAPI como contrato entre web y backend.
- `proposed`: scoring versionado para reproducir y evaluar recomendaciones.
- `proposed`: PostgreSQL con PostGIS para información geográfica.

## Módulos previstos

- `spots`: contexto local, sensibilidad y representación geográfica.
- `conditions`: condiciones ambientales, procedencia, frescura y completitud.
- `scoring`: factores, versión y cálculo del potencial pesquero.
- `recommendations`: composición de ventanas, explicaciones, confianza y puerta de seguridad.
- `sessions`: sesiones, capturas y bolos.
- `feedback`: utilidad percibida y evaluación posterior.

Véase el [mapa de dominio](domain-map.md).

## Stack previsto

- `proposed`: Nuxt, Vue y TypeScript.
- `proposed`: Tailwind CSS, shadcn-vue y Lucide.
- `proposed`: FastAPI y Python.
- `proposed`: PostgreSQL con PostGIS.
- `proposed`: Docker Compose para desarrollo local futuro.
- `proposed`: OpenAPI.
- `proposed`: PWA inicialmente.
- `future`: aplicación iOS posterior a la validación del producto.

Ninguno de estos elementos está implementado en el estado documental actual.

## Responsabilidades

La lógica determinista y verificable debe gobernar scoring, seguridad y reglas. Un LLM futuro podría coordinar o explicar, pero no será la única autoridad. La arquitectura deberá conservar fuente, versión y momento de los datos utilizados para una recomendación.

