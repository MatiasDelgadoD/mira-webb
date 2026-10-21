/** Los datos de prueba de la demo: no hay backend. */
export const MOCK = {
  /** El PIN que "llega" al correo. */
  emailCode: '1234',
  /** El PIN que muestra el reloj al encenderlo. */
  watchPin: '7789',
  /** El código de acceso que entrega el proveedor. */
  providerCode: '1234',
  /** La invitación si el link no trae datos. */
  invitation: { person: 'Rosa', inviter: 'Juan' },
  plan: { name: 'Plan Estándar', price: 'Valor a pagar', period: 'COP / mes' },
  countries: ['Colombia', 'Argentina', 'Chile', 'México', 'Perú'],
  documentTypes: ['Cedula de ciudadania', 'Cedula de extranjeria', 'Pasaporte'],
} as const

/** Los proveedores que entregan el reloj. */
export const PROVIDERS: Record<string, { name: string }> = {
  comfamiliar: { name: 'Comfamiliar' },
}

/** Lo que espera la app para seguir después de la web (todavía no lo escucha). */
export const APP_RETURN_LINK = 'mira://onboarding/activado'

export const STORE_LINKS = {
  appStore: 'https://apps.apple.com/',
  googlePlay: 'https://play.google.com/store',
}

/** Espera un poco, como lo haría la red. */
export const demora = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))
