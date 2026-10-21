import { Check } from 'lucide-react'
import styles from './TermsCheckbox.module.css'

interface TermsCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

/** "Acepto los Terminos y condiciones y las Politicas de privacidad". */
export function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  return (
    <label className={styles.terms}>
      <input
        type="checkbox"
        className={styles.native}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={`${styles.box} ${checked ? styles.checked : ''}`} aria-hidden>
        {checked && <Check size={12} strokeWidth={3} />}
      </span>
      <span>
        Acepto los <span className={styles.link}>Terminos y condiciones</span> y las{' '}
        <span className={styles.link}>Politicas de privacidad</span>
      </span>
    </label>
  )
}
