# Investigación: estrategia de entrega móvil

**Estado:** `proposed` (recomendación pendiente de validación; no hay clientes ni integraciones implementados).
**Fecha de consulta:** 2026-09-03.
**Contexto:** `alerts.fishing` será el sitio público; `app.alerts.fishing` será la aplicación Nuxt. iOS y Android son posteriores y comparten una API independiente del cliente.

## Problema y objetivo

Necesitamos escoger una ruta de entrega que permita validar pronto mapas, cámara, notificaciones, comunidad, ubicación y posible uso sin conexión, con el menor coste y riesgo de mantenimiento razonables. El objetivo no es prometer paridad nativa: es preservar la opción de evolucionar cuando la evidencia de uso justifique una aplicación instalada.

## Requisitos de decisión

- Reutilizar la inversión prevista en Nuxt/Vue/TypeScript y el contrato API común.
- Poder añadir mapas, captura de fotos, push, ubicación (incluido background si se demuestra necesario) y almacenamiento offline.
- Comparar experiencia nativa, coste operativo y de publicación, tiempo hasta una prueba, mantenimiento, pruebas y CI/CD.
- No exponer por defecto coordenadas sensibles ni asumir que una API de plataforma funciona igual en iOS y Android.

## Fuera de alcance

No se elige proveedor de mapas, servicio push, librería de sincronización, modelo de monetización, versión mínima de OS ni diseño de UI. Tampoco se implementan clientes, plugins, endpoints, pipelines ni una aplicación en esta investigación.

## Alternativas comparadas

### PWA sobre Nuxt (primera fase)

Nuxt puede generar una salida estática con `nuxt generate`, o desplegar SSR/Node; el modo elegido debe dejar explícito qué rutas requieren servidor ([Nuxt deployment](https://nuxt.com/docs/3.x/getting-started/deployment), consultado 2026-09-03). Una PWA comparte casi todo el código existente (UI Vue, lógica web y API), evita dos binarios y no requiere cuenta de tienda para distribuir una URL.

El navegador ofrece cámara mediante APIs web sujetas a permisos y contexto seguro, ubicación en primer plano y almacenamiento local; mapas y sincronización offline dependen de librerías y diseño de caché. Web Push requiere Push API, Notifications API, Service Worker y un servidor que gestione VAPID; Safari permite push en web apps añadidas a pantalla de inicio desde iOS/iPadOS 16.4, no en una pestaña Safari normal ([Apple web push](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers), consultado 2026-09-03; [WebKit 16.4](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/), consultado 2026-09-03). La entrega background y el acceso continuo a ubicación están condicionados por el navegador y el sistema; no deben tratarse como equivalentes a un servicio nativo.

**Lectura propuesta:** es la vía más rápida y barata para validar el vertical slice, enlaces profundos, permisos, uso en campo y demanda de instalación. La experiencia puede ser excelente para consulta, registro y captura ocasional, pero la cobertura desigual de background location, push en iOS y offline profundo es un riesgo `needs-validation`.

### Capacitor alrededor de la aplicación Nuxt/PWA

Capacitor se puede añadir a un proyecto JavaScript existente y mantiene una UI web dentro de un runtime nativo; expone plugins para Camera, Geolocation, Notifications y Filesystem, además de una API para plugins propios ([Capacitor documentation](https://capacitorjs.com/docs), consultado 2026-09-03; [Capacitor](https://capacitorjs.com/), consultado 2026-09-03). Para Nuxt habrá que producir un bundle web compatible con el `webDir`; si se necesita SSR, el contenedor no sustituye al servidor y deberá consumir la API remota (inferencia técnica a validar con una prueba mínima).

Reutiliza la mayor parte de la UI y del dominio web, pero añade proyectos Xcode/Gradle, permisos, firmas, plugins y pruebas de dos plataformas. Cámara, archivos, notificaciones locales/push y ubicación básica tienen una ruta clara; background location, geofencing, mapas con rendimiento nativo y sincronización offline robusta pueden requerir configuración específica o plugins externos. La publicación queda sujeta a App Store y Play Store. Apple exige que una app aporte utilidad y UI más allá de un sitio reempaquetado ([App Review 4.2](https://developer.apple.com/app-store/review/guidelines/#minimum-functionality), consultado 2026-09-03); por tanto, un wrapper sin valor nativo tiene riesgo de rechazo (inferencia, no garantía). Google Play también aplica requisitos de funcionalidad y datos según el caso.

**Lectura propuesta:** es el puente de menor ruptura si la PWA ya está validada y aparecen una o dos capacidades nativas concretas. No elimina el coste de ciclo de vida nativo ni garantiza que los plugins comunitarios sigan políticas o soporten todas las versiones.

### Expo + React Native

Expo SDK ofrece paquetes para cámara, ubicación y otras funciones de dispositivo ([Expo SDK](https://docs.expo.dev/versions/latest/), consultado 2026-09-03); `expo-maps` cubre mapas nativos en iOS y Android ([Expo Maps](https://docs.expo.dev/versions/latest/sdk/maps/), consultado 2026-09-03). Expo Location documenta permisos foreground/background y límites distintos: en Android una app terminada no se reinicia automáticamente por geofencing; iOS tiene límites de regiones y requiere permiso `Always` para background ([Expo Location](https://docs.expo.dev/versions/latest/sdk/location/), consultado 2026-09-03). Push se apoya en APNs/FCM y requiere development build; la entrega background no está garantizada ([Expo notifications](https://docs.expo.dev/push-notifications/what-you-need-to-know/), consultado 2026-09-03).

La UI no se reutiliza directamente desde Vue/Nuxt: se comparte API, tipos, reglas y quizá paquetes de dominio, pero hay que reescribir pantallas en React Native y formar al equipo. El resultado es más nativo que una WebView y tiene un camino oficial de build/submit/update: EAS documenta Build, Submit y actualizaciones OTA, con la salvedad de que cambios nativos o permisos exigen un nuevo binario ([EAS tutorial](https://docs.expo.dev/tutorial/eas/introduction/), consultado 2026-09-03; [EAS Update](https://docs.expo.dev/eas-update/introduction/), consultado 2026-09-03). EAS es un servicio opcional: también son posibles builds y CI propios; su precio y límites deben verificarse antes de presupuestar.

**Lectura propuesta:** mejor candidato cuando la evidencia exige cámara/mapas/push/background con UX nativa consistente en ambas plataformas. Tiene mayor tiempo inicial, superficie de permisos y coste de mantenimiento que PWA/Capacitor, aunque reduce la dependencia de WebView.

### Flutter (alternativa de control)

Flutter compila aplicaciones nativas para móvil, web y escritorio desde una base de código ([Flutter FAQ](https://docs.flutter.dev/resources/faq), consultado 2026-09-03). Su UI y lenguaje Dart no reutilizan las pantallas Vue; sí puede compartir el contrato API y, con trabajo adicional, lógica agnóstica. Hay paquetes para servicios de plataforma, pero su soporte, licencia, calidad y cobertura de background/maps deben auditarse por paquete ([Flutter add-to-app](https://docs.flutter.dev/add-to-app), consultado 2026-09-03).

**Lectura propuesta:** añade valor como comparación si se decide priorizar una UX móvil muy cuidada y el equipo acepta una segunda pila. Para el contexto actual no supera la reutilización de PWA/Capacitor ni la ruta oficial de Expo, por lo que queda como `future` salvo que una prueba de rendimiento/UX cambie la decisión.

## Comparación por criterio

- **Código y equipo:** PWA reutiliza Nuxt/Vue/TypeScript casi íntegramente; Capacitor reutiliza UI y suma código nativo; Expo reutiliza API/tipos/dominio pero reescribe UI en React Native; Flutter reescribe UI y cambia a Dart. Esta valoración es inferencia basada en las arquitecturas documentadas.
- **Experiencia nativa:** PWA depende del navegador; Capacitor es web-first con puntos nativos; Expo y Flutter renderizan UI nativa/compilada. La percepción real requiere pruebas en dispositivos de gama baja.
- **Coste y tiempo:** PWA tiene menor coste incremental y camino más corto; Capacitor añade configuración de stores; Expo/Flutter requieren nueva UI y toolchain. Son comparaciones relativas, no presupuestos. Costes externos (cuentas, mapas, push, CI y observabilidad) deben verificarse por proveedor. Apple publica 99 USD/año para distribuir en App Store ([membership](https://developer.apple.com/support/compare-memberships/), consultado 2026-09-03) y Google publica 25 USD de registro único para Play Console ([Play Console](https://support.google.com/googleplay/android-developer/answer/6112435), consultado 2026-09-03); impuestos, región y cambios futuros quedan `needs-validation`.
- **Tiendas y rechazo:** PWA evita revisión de tienda (aunque puede distribuirse posteriormente mediante wrappers); Capacitor, Expo y Flutter deben cumplir ambas tiendas. Apple 4.2 hace que un wrapper de contenido web con utilidad limitada tenga riesgo de rechazo; ninguna tecnología garantiza aprobación.
- **Mapas:** PWA usa mapas web y puede cachear tiles sujeto a licencia; Capacitor puede conservar el mapa web o usar SDK/plugin nativo; Expo ofrece `expo-maps`; Flutter depende del paquete/SDK elegido. Licencia, atribución, cobertura, coste y offline de tiles son `needs-validation`.
- **Cámara y archivos:** APIs web cubren captura básica en PWA; Capacitor y Expo ofrecen plugins documentados; Flutter necesita seleccionar y mantener paquetes. Subida, compresión, EXIF y permisos de fotos requieren pruebas de privacidad.
- **Push:** PWA usa Web Push y tiene la condición Home Screen en iOS; Capacitor/Expo/Flutter usan APNs/FCM mediante código nativo. Entrega, permisos, deep links, frecuencia y comportamiento con app terminada nunca deben darse por garantizados.
- **Background location:** es el criterio que más separa las opciones. PWA no debe prometerlo; Capacitor/Flutter dependen de plugins y políticas; Expo documenta permisos y límites concretos. Solo debe activarse tras un caso de seguridad/utilidad validado y revisión legal/privacidad.
- **Offline:** PWA puede usar Service Worker + IndexedDB, pero la cuota, evicción y sincronización son específicas del navegador; Capacitor añade filesystem nativo; Expo/Flutter ofrecen almacenamiento nativo. En todos los casos hay que definir conflictos, cifrado, caducidad y qué datos se pueden guardar localmente.
- **Mantenimiento y pruebas:** PWA concentra una matriz de navegadores; Capacitor añade WebView + iOS + Android; Expo añade React Native + dos OS; Flutter añade Dart/Flutter + dos OS. Las cuatro requieren dispositivos físicos para cámara, permisos, push, batería y conectividad intermitente.
- **CI/CD:** PWA encaja con el pipeline web; Capacitor/Expo/Flutter necesitan firma, artefactos, canales internos y revisión de tiendas. Expo ofrece EAS como opción documentada; Capacitor y Flutter dejan más decisiones en Xcode/Gradle o CI elegido.

## Recomendación por fases (todo `proposed`)

1. **Validación web:** entregar primero `app.alerts.fishing` como PWA instalable. Medir finalización del recorrido de oportunidad, registro de sesión, retención, errores de permisos, uso offline real y solicitudes de push/cámara. No prometer background location ni exactitud de datos.
2. **Hardening PWA:** probar Safari iOS, Chrome Android y escritorio con dispositivos reales; documentar límites de push, cámara, ubicación y caché; fijar una política de datos offline y un presupuesto de mapas. Solo si los criterios pasan, mantener PWA como cliente principal.
3. **Spike Capacitor (si procede):** empaquetar una ruta Nuxt estática y probar cámara, filesystem, deep links, push y un mapa en iOS/Android. Continuar únicamente si aporta una capacidad medible sin duplicar la mayoría de la UI.
4. **Expo/React Native (si procede):** activar cuando dos o más capacidades críticas no sean fiables en web/Capacitor, o la retención justifique una UX móvil dedicada. Compartir API, contratos y dominio; no forzar compartir componentes Vue.
5. **Flutter `future`:** reconsiderar solo si una prueba comparativa demuestra una ventaja material de rendimiento/UX o capacidad nativa frente a Expo y compensa cambiar de pila.

### Disparadores de decisión

- `needs-validation`: una prueba en dispositivos confirma que una capacidad crítica falla o es demasiado frágil en PWA.
- `needs-validation`: usuarios solicitan notificaciones fiables con app cerrada, geofencing o captura frecuente sin red.
- `needs-validation`: métricas muestran que la instalación nativa mejora retención o seguridad frente a la PWA.
- `needs-validation`: licencias, cuotas, costes o políticas de mapas/push cambian el coste total.
- `needs-validation`: la revisión de tiendas identifica requisitos de privacidad, contenido o utilidad no cubiertos.

## Criterios de aceptación de esta investigación

- [ ] Se comparan PWA, Capacitor y Expo/React Native; Flutter queda justificado como cuarta alternativa.
- [ ] Cada criterio (reutilización, UX, coste/tiempo, tiendas, mapas, cámara, push, ubicación background, offline, mantenimiento, pruebas, CI/CD y equipo) tiene una conclusión y sus límites.
- [ ] Las afirmaciones de plataforma enlazan fuentes oficiales/primarias y llevan fecha de consulta.
- [ ] Inferencias, propuestas y puntos `needs-validation` están etiquetados; no se afirma que exista código, endpoint, cliente o integración.
- [ ] La recomendación es por fases y contiene disparadores verificables.

## Riesgos, supuestos y validaciones pendientes

- Los límites de OS, navegadores, SDK y políticas cambian; revisar fuentes antes de iniciar cada fase.
- Se asume que la API será cliente-agnóstica y que el equipo domina Vue/TypeScript; ambas son premisas `needs-validation` para planificación.
- No se presupone cobertura, licencia ni precio de un proveedor de mapas, push, almacenamiento o CI.
- La ubicación exacta y los datos de pesca pueden ser sensibles: validar minimización, consentimiento, retención y seguridad antes de sincronizar offline o compartir.
- Probar en hardware real, redes intermitentes y app terminada; registrar versión de OS, navegador/SDK, dispositivo y resultado.

## Plan técnico y pruebas derivadas (propuesto)

1. Congelar contrato API y tipos compartidos, sin acoplarlo a un cliente.
2. Construir la PWA mínima y una matriz de pruebas manual/automatizada para instalación, navegación, cámara, ubicación, push y offline.
3. Medir las métricas de salida de la fase web durante un periodo acordado.
4. Solo si se activa un disparador, ejecutar un spike Capacitor o Expo con la misma API y pruebas de permisos.
5. Antes de publicar una app, revisar privacidad, datos sensibles, cuentas de desarrollador, firma, metadatos, revisión y rollback.

Las pruebas deben verificar comportamiento observable (incluido rechazo de permisos, revocación, app terminada, batería y pérdida de red), no solo que una API devuelva éxito. Ningún resultado de laboratorio convierte una limitación de plataforma en una garantía de producción.

## Fuentes y limitaciones

Las URL anteriores son documentación oficial de Expo, Capacitor, Nuxt, WebKit/Apple, Google Play y Flutter, consultada el 2026-09-03. No se han integrado datos ni SDK; los precios y políticas son instantáneas y deben volver a comprobarse. La comparación de coste, velocidad y capacidad de equipo es inferencia de arquitectura y del contexto documental de `alerts.fishing`, no una cotización ni una garantía.
