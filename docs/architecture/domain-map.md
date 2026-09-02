# Mapa de dominio

**Estado: `proposed`; requiere validación durante el vertical slice.**

## Conceptos principales

- **Spot:** zona de pesca y su contexto local; puede tener geometría privada o aproximada.
- **Especie:** objetivo pesquero; inicialmente lubina europea.
- **Técnica:** modalidad utilizada; inicialmente spinning desde costa.
- **Condición:** valor ambiental con fuente, tiempo de validez y calidad conocida.
- **Ventana:** intervalo dentro del horizonte de 72 horas que se evalúa.
- **Score:** valoración de potencial de 0 a 100, no probabilística.
- **Confianza:** evaluación independiente de frescura, completitud y adecuación de datos.
- **Estado de seguridad:** puerta independiente que puede invalidar una ventana.
- **Recomendación:** decisión explicada que combina spot, ventana, especie, técnica, score, confianza y seguridad.
- **Sesión:** salida registrada por una persona, incluso cuando termina en bolo.
- **Feedback:** valoración de utilidad de decisión y explicación.
- **Versión de scoring:** identificador reproducible de reglas y parámetros.

## Relaciones previstas

Una recomendación evalúa una ventana para un spot, una especie y una técnica. Consume condiciones con procedencia, produce score, confianza y explicación, y pasa por una puerta de seguridad. Una sesión puede vincularse después a esa recomendación y generar feedback, capturas o un bolo.

## Límites por módulo

- `spots` mantiene identidad, contexto y política de visibilidad.
- `conditions` normaliza datos externos sin decidir por sí solo.
- `scoring` evalúa potencial y expone sus factores y versión.
- `recommendations` compone la decisión y aplica la puerta de seguridad.
- `sessions` registra lo ocurrido, no solo capturas.
- `feedback` evalúa utilidad y alimenta análisis posterior.

## Pendiente

- `needs-validation`: vocabulario exacto de capturas, esfuerzo, señuelos y estado del mar.
- `needs-validation`: cardinalidades y reglas de vinculación cuando una sesión abarca varios spots o técnicas.
- `needs-validation`: límites geográficos seguros y verificables de los spots iniciales.

