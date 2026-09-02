# Privacidad y ubicación

**Estado: `decided` para privacidad por defecto; controles concretos: `proposed`.**

La ubicación exacta nunca será pública por defecto. La visibilidad debe ser explícita, revocable y adecuada a la sensibilidad del spot.

## Niveles previstos

- **Solo usuario:** ubicación exacta.
- **Contacto de seguridad:** ubicación exacta y temporal, con consentimiento y caducidad.
- **Círculo de confianza:** visibilidad elegida por el usuario.
- **Comunidad pública:** ubicación retrasada y aproximada.
- **Spots sensibles:** ubicación oculta.

## Reglas

- La ubicación pública exacta en tiempo real no será el comportamiento predeterminado.
- Una recomendación no debe revelar coordenadas que no sean públicas, necesarias y verificadas.
- La geometría precisa y la representación pública deben modelarse por separado.
- Compartir por seguridad no implica consentimiento para publicar o conservar indefinidamente.
- Debe ser posible retirar acceso futuro sin reescribir la historia pública de forma engañosa.

## Pendiente

- `needs-validation`: precisión, retraso y agregación apropiados para la comunidad.
- `needs-validation`: retención, consentimiento y eliminación de datos de ubicación.
- `needs-validation`: criterios para clasificar spots sensibles.
- `needs-validation`: requisitos legales aplicables antes de manejar ubicación personal.

[Strava Beacon](https://support.strava.com/en-us/articles/15401829-strava-beacon) queda registrado como referencia externa de producto en estado `not-integrated`; su funcionamiento y condiciones deben revisarse antes de derivar requisitos.

