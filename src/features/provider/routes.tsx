import type { RouteObject } from 'react-router'
import {
  ProviderCodePage,
  ProviderConnectPage,
  ProviderDocumentPage,
  ProviderWatchCodePage,
} from './pages/ProviderPages'

/** "Activar con proveedor": la app abre `/proveedor/<id>` en el navegador. */
export const providerRoutes: RouteObject[] = [
  { path: '/proveedor/:id', element: <ProviderDocumentPage /> },
  { path: '/proveedor/:id/codigo', element: <ProviderCodePage /> },
  { path: '/proveedor/:id/conectar', element: <ProviderConnectPage /> },
  { path: '/proveedor/:id/pin', element: <ProviderWatchCodePage /> },
]
