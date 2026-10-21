import { Mail } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { GOLD } from './GoldGradientDefs'
import styles from './SocialButton.module.css'

type SocialProvider = 'google' | 'apple' | 'email'

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider
}

/** Uno de los botones de "Selecciona como quieres registrarte". */
export function SocialButton({ provider, children, type = 'button', ...rest }: SocialButtonProps) {
  return (
    <button type={type} className={styles.button} {...rest}>
      <span className={`${styles.icon} ${provider === 'apple' ? styles.apple : ''}`}>
        {provider === 'google' && <GoogleLogo />}
        {provider === 'apple' && <AppleLogo />}
        {provider === 'email' && <Mail size={24} strokeWidth={1.6} color={GOLD} />}
      </span>
      <span className={styles.label}>{children}</span>
    </button>
  )
}

/** La "o" entre los botones de cuentas y el de correo. */
export function OrDivider() {
  return (
    <div className={styles.divider} role="separator">
      <span>o</span>
    </div>
  )
}

function GoogleLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.9 6.2C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" />
      <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.2C1 16.5 0 20.1 0 24s1 7.5 2.6 10.8l7.9-6.2z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.2C6.6 42.6 14.6 48 24 48z" />
    </svg>
  )
}

function AppleLogo() {
  return (
    <svg width="20" height="24" viewBox="0 0 384 512" aria-hidden>
      <path
        fill="#ffffff"
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      />
    </svg>
  )
}
