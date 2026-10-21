import { ChevronDown } from 'lucide-react'
import { useId } from 'react'
import styles from './FormField.module.css'

interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** Opciones: lo vuelve una lista desplegable. */
  options?: string[]
  /** `brand`: el formulario azul sobre blanco del proveedor. */
  variant?: 'dark' | 'brand'
  inputMode?: 'text' | 'numeric'
  autoComplete?: string
  maxLength?: number
}

/** Un campo con la etiqueta arriba, de los formularios de pago y del proveedor. */
export function FormField({
  label,
  value,
  onChange,
  placeholder,
  options,
  variant = 'dark',
  inputMode,
  autoComplete,
  maxLength,
}: FormFieldProps) {
  const id = useId()
  return (
    <div className={`${styles.field} ${styles[variant]}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {options ? (
        <div className={styles.selectWrap}>
          <select
            id={id}
            className={styles.control}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
          <ChevronDown size={20} className={styles.chevron} />
        </div>
      ) : (
        <input
          id={id}
          className={styles.control}
          value={value}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}
