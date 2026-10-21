import logo from '../assets/logo.png'
import styles from './BrandHeader.module.css'

interface BrandHeaderProps {
  /** El logo grande de la portada de la invitación. */
  large?: boolean
}

/** El logo con "Ellos, seguros. Tú, tranquilo." de las páginas de la invitación. */
export function BrandHeader({ large }: BrandHeaderProps) {
  return (
    <div className={`${styles.header} ${large ? styles.large : ''}`}>
      <img src={logo} alt="MIRA" className={styles.logo} />
      <span className={styles.line} aria-hidden />
      <p className={styles.tagline}>Ellos, seguros. Tú, tranquilo.</p>
    </div>
  )
}
