import type { RouteObject } from 'react-router'
import { InvitationNextStepsPage, InvitationWelcomePage } from './pages/InvitationDonePages'
import { InvitationLandingPage } from './pages/InvitationLandingPage'
import { InvitationLoginPage } from './pages/InvitationLoginPage'
import { InvitationSignUpPage } from './pages/InvitationSignUpPage'
import { CodeStepPage, EmailStepPage, NameStepPage, PasswordStepPage } from './pages/SignUpSteps'

/** La invitación a un grupo de cuidado: lo que abre el link que se comparte. */
export const invitationRoutes: RouteObject[] = [
  { path: '/invitacion', element: <InvitationLandingPage /> },
  { path: '/invitacion/registro', element: <InvitationSignUpPage /> },
  { path: '/invitacion/registro/correo', element: <EmailStepPage /> },
  { path: '/invitacion/registro/codigo', element: <CodeStepPage /> },
  { path: '/invitacion/registro/nombre', element: <NameStepPage /> },
  { path: '/invitacion/registro/contrasena', element: <PasswordStepPage /> },
  { path: '/invitacion/ingresar', element: <InvitationLoginPage /> },
  { path: '/invitacion/bienvenida', element: <InvitationWelcomePage /> },
  { path: '/invitacion/pasos', element: <InvitationNextStepsPage /> },
]
