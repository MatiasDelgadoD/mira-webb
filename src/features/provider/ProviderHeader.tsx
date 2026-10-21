import logo from '../../assets/logo.png'
import comfamiliar from '../../assets/providers/comfamiliar.png'
import styles from './provider.module.css'

/** Los dos logos de arriba: MIRA y el del proveedor. */
export function ProviderHeader({ name }: { name: string }) {
  return (
    <div className={styles.brands}>
      <img src={logo} alt="MIRA" className={styles.miraLogo} />
      <img src={comfamiliar} alt={name} className={styles.providerLogo} />
    </div>
  )
}
