import { useRef, useState } from 'react'
import styles from './OtpInput.module.css'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  /** Se llama al completar el último dígito. */
  onComplete?: (value: string) => void
  length?: number
  /** `brand`: las cajas azules de la página del proveedor. */
  variant?: 'dark' | 'brand'
  autoFocus?: boolean
}

/**
 * Las cajas del PIN. Por debajo hay un único input invisible: las cajas sólo
 * muestran lo que se va tipeando (y así funcionan el pegado y el autocompletar
 * del código).
 */
export function OtpInput({
  value,
  onChange,
  onComplete,
  length = 4,
  variant = 'dark',
  autoFocus = true,
}: OtpInputProps) {
  const input = useRef<HTMLInputElement>(null)
  const [focus, setFocus] = useState(false)
  const activa = Math.min(value.length, length - 1)

  return (
    <div className={styles.otp} onClick={() => input.current?.focus()}>
      <input
        ref={input}
        className={styles.hidden}
        inputMode="numeric"
        autoComplete="one-time-code"
        autoFocus={autoFocus}
        maxLength={length}
        value={value}
        aria-label="Código"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          const digitos = e.target.value.replace(/\D/g, '').slice(0, length)
          onChange(digitos)
          if (digitos.length === length) onComplete?.(digitos)
        }}
      />
      {Array.from({ length }, (_, i) => (
        <span
          key={i}
          className={`${styles.box} ${styles[variant]} ${focus && i === activa ? styles.active : ''}`}
          aria-hidden
        >
          {value[i] ?? ''}
        </span>
      ))}
    </div>
  )
}
