# Reglas de trabajo para agentes

Estas reglas se aplican a futuros cambios en `alerts.fishing`.

## Antes de cambiar el repositorio

- Leer [docs/Home.md](docs/Home.md) antes de realizar cambios amplios.
- Revisar el estado de Git y preservar todos los cambios existentes del usuario.
- Confirmar en la documentación qué está decidido, propuesto, pendiente de validación o reservado para el futuro.

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

## Operaciones externas

- No hacer commits, pushes ni despliegues salvo petición explícita.
- No sustituir referencias oficiales o externas por afirmaciones propias no verificadas.

