import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'gradient' | 'outlined' | 'dark' | 'brand' | 'link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * gradient: CTA dorado; outlined: borde dorado; dark: gris oscuro; brand:
   * el azul del proveedor; link: texto.
   */
  variant?: ButtonVariant
  /** Ícono a la derecha del texto (la flecha de "Continuar"). */
  trailing?: ReactNode
}

/** Botón de la app (MiraGradientButton y sus variantes). */
export function Button({
  variant = 'gradient',
  trailing,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${className ?? ''}`}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      {trailing}
    </button>
  )
}
