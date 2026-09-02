# Especificación 001: oportunidad de pesca MVP

**Estado: `proposed`. Implementación: no iniciada.**

## Problema

La meteorología genérica obliga al pescador a interpretar variables dispersas sin contexto suficiente del spot. Falta una decisión local que explique potencial, calidad de datos y restricciones de seguridad, y que pueda evaluarse después de la sesión.

## Usuario

Pescador de lubina europea que practica spinning desde costa en Rías Baixas y quiere decidir si, dónde y cuándo organizar una sesión durante las próximas 72 horas.

## Historia principal

Como pescador, quiero comparar oportunidades de demostración para mis spots dentro de las próximas 72 horas, entender por qué se recomiendan y con qué confianza, comprobar si son seguras y registrar después el resultado, incluso si no capturo nada.

## Alcance

- Aguete, Praia do Santo (Seixo) y Placeres/Lourizán como spots de demostración.
- Lubina europea y spinning desde costa.
- Horizonte de 72 horas.
- Datos mock inequívocamente etiquetados.
- Score de 0 a 100 con factores positivos y negativos.
- Confianza independiente con explicación de frescura y completitud simuladas.
- Puerta de seguridad separada, capaz de invalidar una ventana.
- Recomendación sobre dónde, cuándo y cómo pescar sin prometer capturas.
- Registro posterior de sesión, cero o más capturas y feedback.

## Fuera de alcance

- Datos meteorológicos u oceanográficos reales.
- Coordenadas o condiciones locales no verificadas presentadas como hechos.
- Autenticación, pagos, mapas avanzados y Telegram.
- YouTube API, red social y ubicación en tiempo real.
- Machine learning, LLM y agentes.
- Aplicación iOS.
- Asesoramiento legal o garantía de seguridad.

## Modelo conceptual

- **Spot:** identidad de demostración y contexto etiquetado como mock cuando no esté verificado.
- **Ventana:** intervalo futuro dentro de 72 horas.
- **Condiciones mock:** factores simulados con frescura y completitud declaradas.
- **Score:** valoración de 0 a 100, versión y explicación; no es probabilidad.
- **Confianza:** evaluación separada de calidad de datos.
- **Seguridad:** estado independiente: permitido para demostración, precaución o invalidado.
- **Recomendación:** composición de spot, ventana, especie, técnica, score, confianza, seguridad y explicación.
- **Sesión:** actividad realizada o registrada, vinculada opcionalmente a una recomendación.
- **Resultado:** cero o más capturas; cero capturas constituye un bolo válido.
- **Feedback:** valoración de utilidad de la decisión y de la explicación.

## Comportamiento esperado

1. La persona ve oportunidades mock de los tres spots durante 72 horas.
2. Cada oportunidad separa score, confianza y seguridad.
3. Al abrir una oportunidad ve factores positivos, negativos y limitaciones.
4. Una ventana insegura aparece invalidada aunque tenga buen potencial pesquero.
5. Ninguna recomendación promete capturas ni aparenta usar datos reales.
6. Tras una salida, la persona registra si pescó, el resultado y la utilidad percibida.
7. El sistema acepta y conserva una sesión sin capturas como información válida.

## Criterios de aceptación

- [ ] Se muestran exactamente los tres spots de demostración y la modalidad inicial.
- [ ] El horizonte visible no supera 72 horas.
- [ ] Todos los datos simulados se identifican como mock o demostración.
- [ ] Cada oportunidad muestra score entre 0 y 100 sin llamarlo probabilidad.
- [ ] Score y confianza aparecen como conceptos distintos.
- [ ] Se explican al menos un factor favorable y uno desfavorable cuando existan en el escenario mock.
- [ ] La versión del scoring de demostración es visible o recuperable.
- [ ] Existe al menos un escenario donde seguridad invalida una ventana con score favorable.
- [ ] La recomendación evita garantías de captura y certeza legal o de seguridad.
- [ ] Puede registrarse una sesión vinculada a una recomendación.
- [ ] Puede registrarse un bolo sin forzar una captura.
- [ ] Puede registrarse feedback sobre decisión y explicación.
- [ ] No se publica ubicación exacta en tiempo real.

## Riesgos

- Los datos mock podrían confundirse con información real.
- Un score numérico podría interpretarse como probabilidad o promesa.
- La demostración podría aparentar conocimiento no verificado de un spot.
- Seguridad y normativa podrían percibirse como garantías.
- Registrar solo sesiones exitosas sesgaría la evaluación.
- Un diseño demasiado amplio impediría validar el recorrido principal.

## Preguntas abiertas

- `needs-validation`: ¿qué factores mínimos hacen que la explicación sea útil?
- `needs-validation`: ¿cómo expresar confianza sin falsa precisión?
- `needs-validation`: ¿qué estados y mensajes de seguridad son comprensibles?
- `needs-validation`: ¿qué datos mínimos de esfuerzo necesita una sesión?
- `needs-validation`: ¿cómo medir una decisión considerada útil?
- `needs-validation`: ¿qué representación no sensible y no engañosa usar para los spots?

## Definición de hecho

- Todos los criterios de aceptación aplicables están verificados.
- El recorrido completo funciona con datos mock y sin integraciones externas.
- Las diferencias entre score, confianza y seguridad son comprensibles.
- Se ha probado una sesión con capturas y otra con bolo.
- No se presentan datos, coordenadas, normativa o seguridad no verificadas como hechos.
- La documentación, la especificación y el comportamiento están sincronizados.
- Se han ejecutado las validaciones disponibles y actualizado el changelog.

