import type { ReactNode } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  open: boolean
  children: ReactNode
}

/** Un aviso blanco sobre la pantalla oscurecida ("Validando tu código"). */
export function Modal({ open, children }: ModalProps) {
  if (!open) return null
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.card}>{children}</div>
    </div>
  )
}

/** La ruedita de carga. */
export function Spinner({ color = 'var(--color-brand)' }: { color?: string }) {
  return <span className={styles.spinner} style={{ borderTopColor: color }} aria-label="Cargando" />
}
