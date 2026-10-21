import { createBrowserRouter } from 'react-router'
import { DevIndexPage } from './features/dev/DevIndexPage'

// Cada flujo (invitation, activation, provider) suma sus rutas acá.
export const router = createBrowserRouter([{ path: '/', element: <DevIndexPage /> }])
