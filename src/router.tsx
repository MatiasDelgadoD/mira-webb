import { createBrowserRouter } from 'react-router'
import { Root } from './app/Root'
import { activationRoutes } from './features/activation/routes'
import { DevIndexPage } from './features/dev/DevIndexPage'
import { invitationRoutes } from './features/invitation/routes'
import { providerRoutes } from './features/provider/routes'

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <DevIndexPage /> },
      ...invitationRoutes,
      ...activationRoutes,
      ...providerRoutes,
    ],
  },
])
