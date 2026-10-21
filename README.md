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

## Estructura

- `src/theme/`: tokens copiados del tema de la app (`app_colors.dart`, `app_dimens.dart`).
- `src/components/`: piezas compartidas que replican los widgets de la app.
- `src/features/<flujo>/`: las pantallas de cada flujo, con sus rutas.
