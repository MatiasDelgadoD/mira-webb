# MIRA web

Las pantallas de MIRA que se abren en el navegador: el link de invitación a un grupo de cuidado,
la suscripción y activación del reloj, y la activación con un proveedor (Comfamiliar). El resto
del alta vive en la app Flutter (`mira-app`).

Por ahora todo es una demo con datos de prueba, sin backend.

## Desarrollo

```bash
npm install
npm run dev
```

Queda en http://localhost:5173 (desde el emulador de Android: http://10.0.2.2:5173).

- `npm run build`: chequea los tipos y arma `dist/`.
- `npm run lint`: oxlint.

## Flujos

`/` es un índice de la demo con los tres flujos.

| Flujo | Rutas | Figma |
|---|---|---|
| Invitación a un grupo de cuidado | `/invitacion?persona=Rosa&invita=Juan`, `/invitacion/registro` (+ `/correo`, `/codigo`, `/nombre`, `/contrasena`), `/invitacion/ingresar`, `/invitacion/bienvenida`, `/invitacion/pasos` | 877:7602 … 877:8904 |
| Activar con MIRA | `/activar/suscripcion`, `/activar/encender`, `/activar/qr` (+ `/camara`), `/activar/pin`, `/activar/listo` | 877:8311 … 877:8197 |
| Activar con proveedor | `/proveedor/comfamiliar` (+ `/codigo`, `/conectar`, `/pin`) | 877:7932 … 877:8243 |

Datos de prueba (en `src/mock/fixtures.ts`): el PIN del correo es `1234`, el del reloj `7789` y
cualquier código de 4 dígitos sirve para el proveedor. El pago no cobra ni guarda nada.

Al terminar la activación, `/activar/listo` ofrece volver a la app con `mira://onboarding/activado`;
la app todavía no escucha ese enlace, así que en la demo de la app se usa "Simular activación
completada".

## Estructura

- `src/theme/`: tokens copiados del tema de la app (`app_colors.dart`, `app_dimens.dart`).
- `src/components/`: piezas compartidas que replican los widgets de la app.
- `src/features/<flujo>/`: las pantallas de cada flujo, con sus rutas.
- `src/mock/`: los datos de prueba y el estado de la demo (en `sessionStorage`).
