import logo from '../../assets/logo.png'
import { Screen } from '../../components/Screen'
import styles from './DevIndexPage.module.css'

interface DemoFlow {
  title: string
  description: string
  /** Ruta de inicio; sin ruta todavía no está armado. */
  path?: string
}

// Cada bloque suma su flujo acá.
const flows: DemoFlow[] = [
  {
    title: 'Invitación a un grupo de cuidado',
    description: 'Registro o inicio de sesión desde el link de invitación.',
  },
  {
    title: 'Activar con MIRA',
    description: 'Suscripción, encender el reloj, QR y PIN.',
  },
  {
    title: 'Activar con proveedor',
    description: 'Comfamiliar: documento, código y vinculación del reloj.',
  },
]

/** Índice de la demo: los flujos web, todos con datos de prueba. */
export function DevIndexPage() {
  return (
    <Screen background="glow">
      <div className={styles.header}>
        <img src={logo} alt="MIRA" className={styles.logo} />
        <h1 className={styles.title}>MIRA web</h1>
        <p className={styles.subtitle}>Demo de los flujos web, sin backend.</p>
      </div>
      <ul className={styles.list}>
        {flows.map((flow) => (
          <li key={flow.title}>
            <a
              className={styles.item}
              href={flow.path}
              aria-disabled={!flow.path}
            >
              <span className={styles.itemTitle}>{flow.title}</span>
              <span className={styles.itemDescription}>
                {flow.path ? flow.description : `${flow.description} Próximamente.`}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Screen>
  )
}
