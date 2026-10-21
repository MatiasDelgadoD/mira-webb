import { Navigate, type RouteObject } from 'react-router'
import { ReturnToAppPage, WatchPinPage } from './pages/ActivationEndPages'
import { CameraPage, ScanQrPage } from './pages/ScanQrPages'
import { SubscriptionPage } from './pages/SubscriptionPage'
import { TurnOnPage } from './pages/TurnOnPage'

/** "Activar MIRA": la app abre esta parte en el navegador. */
export const activationRoutes: RouteObject[] = [
  { path: '/activar', element: <Navigate to="/activar/suscripcion" replace /> },
  { path: '/activar/suscripcion', element: <SubscriptionPage /> },
  { path: '/activar/encender', element: <TurnOnPage /> },
  { path: '/activar/qr', element: <ScanQrPage /> },
  { path: '/activar/qr/camara', element: <CameraPage /> },
  { path: '/activar/pin', element: <WatchPinPage /> },
  { path: '/activar/listo', element: <ReturnToAppPage /> },
]
