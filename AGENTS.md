# Reglas de trabajo para agentes

Estas reglas se aplican a futuros cambios en `alerts.fishing`.

## Ámbito del repositorio

- Este repositorio pertenece únicamente a `alerts.fishing`.
- No introducir referencias ni dependencias hacia `alerts.surf`.
- No acoplar la lógica futura del dominio de pesca al nombre comercial del producto.
- Preservar la estructura documental y el contenido existente.
- Mantener `.obsidian/` intacto e ignorado.
- No realizar trabajo fuera del objetivo solicitado.

## Antes de cambiar el repositorio

- Leer [docs/Home.md](docs/Home.md) antes de realizar cambios amplios.
- Revisar el estado de Git y preservar todos los cambios existentes del usuario.
- Confirmar en la documentación qué está decidido, propuesto, pendiente de validación o reservado para el futuro.

## Spec-Driven Development obligatorio

Cualquier funcionalidad o cambio de comportamiento debe seguir esta secuencia antes de considerarse terminado:

1. Crear o actualizar una especificación.
2. Definir el problema, los objetivos, los requisitos y lo que queda fuera de alcance.
3. Establecer criterios de aceptación verificables.
4. Identificar riesgos, supuestos y puntos pendientes de validación.
5. Preparar el plan técnico y dividirlo en tareas pequeñas.
6. Derivar las pruebas de los criterios de aceptación.
7. Implementar únicamente lo definido en la especificación.
8. Ejecutar las validaciones correspondientes.
9. Sincronizar la documentación, las decisiones y el changelog.
10. Confirmar que la implementación y la especificación no se contradicen.

No implementar ninguna funcionalidad relevante sin una especificación aprobada o marcada explícitamente con el estado adecuado. Mantener los estados documentales existentes:

- `decided`: decisión actual aceptada, aunque todavía pueda no estar implementada.
- `proposed`: dirección propuesta pendiente de confirmación.
- `future`: trabajo fuera del alcance inmediato y reservado para una fase posterior.
- `needs-validation`: hipótesis, dato o decisión que requiere evidencia o una fuente vigente.
- `not-integrated`: fuente identificada, pero sin integración técnica.

No describir como implementado nada que todavía sea una propuesta.

## Forma de trabajo

- Trabajar en vertical slices pequeños, verificables y vinculados a una necesidad del dominio de pesca.
- No añadir dependencias sin una justificación explícita.
- No crear microservicios prematuramente; la dirección decidida es un monolito modular.
- No presentar datos mock, simulados o de demostración como datos reales.
- No ofrecer certeza legal o de seguridad sin fuentes oficiales vigentes y verificadas.
- No publicar coordenadas sensibles ni hacer pública por defecto una ubicación exacta.
- Mantener sincronizados las especificaciones y el comportamiento implementado.
- Ejecutar las validaciones disponibles antes de declarar una tarea terminada.

## Documentación y decisiones

- Actualizar la documentación afectada después de cambios relevantes.
- Actualizar [docs/changelog.md](docs/changelog.md) con cambios significativos.
- Crear un ADR cuando una decisión arquitectónica sea significativa.
- Registrar fuentes, fecha de consulta, licencia, atribución y limitaciones cuando se incorporen datos externos.

## Commits atómicos obligatorios

- Cada commit debe representar una sola unidad lógica y reversible.
- Todo trabajo modificador completado debe quedar validado y confirmado antes de comenzar una nueva unidad solicitada.
- Separar los cambios de documentación, infraestructura, pruebas y aplicación cuando representen intenciones distintas.
- Revisar siempre `git diff` y `git diff --staged` antes de confirmar.
- Añadir archivos mediante rutas explícitas. No utilizar `git add .`, `git add -A` ni equivalentes indiscriminados.
- No mezclar cambios ajenos o no relacionados.
- No crear commits vacíos para tareas exclusivamente de análisis.
- No modificar commits publicados ni utilizar `--amend`, rebase destructivo, force push o comandos destructivos sin autorización explícita.
- No incluir secretos, credenciales, archivos locales de Obsidian ni artefactos generados innecesarios.
- Ejecutar las validaciones relevantes antes del commit.
- Usar mensajes que sigan Conventional Commits y describan la intención real del cambio.
- Después del commit, ejecutar `git status --short`.
- Si queda cualquier cambio pendiente, explicarlo expresamente antes de continuar.

## Operaciones externas

- No hacer commits, pushes ni despliegues salvo petición explícita.
- No sustituir referencias oficiales o externas por afirmaciones propias no verificadas.
