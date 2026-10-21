import type { ReactNode } from 'react'
import styles from './Screen.module.css'

type ScreenBackground = 'light' | 'glow' | 'plain' | 'white'

interface ScreenProps {
  /** Fondo de la pantalla: los dos brillos ámbar de la app, negro o blanco. */
  background?: ScreenBackground
  /** Lo que queda pegado al pie (botones principales). */
  footer?: ReactNode
  children: ReactNode
}

/** Pantalla móvil a lo alto de la ventana, con el pie abajo. */
export function Screen({ background = 'light', footer, children }: ScreenProps) {
  return (
    <div className={`${styles.screen} ${styles[background]}`}>
      <main className={styles.body}>{children}</main>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  )
}
