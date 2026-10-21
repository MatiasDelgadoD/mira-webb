import { Eye, EyeOff, type LucideIcon } from 'lucide-react'
import { useId, useState, type InputHTMLAttributes } from 'react'
import { GOLD } from './GoldGradientDefs'
import styles from './TextField.module.css'

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Texto blanco de arriba ("Correo electronico"). */
  label?: string
  icon?: LucideIcon
  value: string
  onChange: (value: string) => void
  /** Borde dorado aunque no tenga el foco. */
  highlighted?: boolean
}

/**
 * Campo de texto del alta (OnboardingTextField de la app): ícono, texto y,
 * si es una contraseña, el ojo para verla. El borde y el ícono van dorados
 * mientras está resaltado.
 */
export function TextField({
  label,
  icon: Icon,
  value,
  onChange,
  highlighted,
  type = 'text',
  ...rest
}: TextFieldProps) {
  const id = useId()
  const [focus, setFocus] = useState(false)
  const [visible, setVisible] = useState(false)
  const esClave = type === 'password'
  const resaltado = highlighted || focus

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={`${styles.field} ${resaltado ? styles.active : ''}`}>
        {Icon && (
          <Icon size={22} strokeWidth={1.6} color={resaltado ? GOLD : 'var(--color-text-secondary)'} />
        )}
        <input
          id={id}
          className={styles.input}
          type={esClave && visible ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...rest}
        />
        {esClave && (
          <button
            type="button"
            className={styles.eye}
            aria-label={visible ? 'Ocultar contraseña' : 'Ver contraseña'}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  )
}
