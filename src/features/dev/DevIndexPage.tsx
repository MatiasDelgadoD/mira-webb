import { Link } from 'react-router'
import logo from '../../assets/logo.png'
import { Screen } from '../../components/Screen'
import { useMockStore } from '../../mock/mockContext'
import styles from './DevIndexPage.module.css'

interface DemoFlow {
  title: string
  description: string
  /** Por dónde entra; es lo que abre la app (o el link de invitación). */
  path: string
}

const flows: DemoFlow[] = [
  {
    title: 'Invitación a un grupo de cuidado',
    description: 'Registro o inicio de sesión desde el link de invitación.',
    path: '/invitacion?persona=Rosa&invita=Juan',
  },
  {
    title: 'Activar con MIRA',
    description: 'Suscripción, encender el reloj, QR y PIN.',
    path: '/activar/suscripcion',
  },
  {
    title: 'Activar con proveedor',
    description: 'Comfamiliar: documento, código y vinculación del reloj.',
    path: '/proveedor/comfamiliar',
  },
]

/** Índice de la demo: los flujos web, todos con datos de prueba. */
export function DevIndexPage() {
  const { reset } = useMockStore()
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
            <Link className={styles.item} to={flow.path}>
              <span className={styles.itemTitle}>{flow.title}</span>
              <span className={styles.itemDescription}>{flow.description}</span>
            </Link>
          </li>
        ))}
        <li>
          <button type="button" className={styles.reset} onClick={reset}>
            Reiniciar datos de la demo
          </button>
        </li>
      </ul>
    </Screen>
  )
}
