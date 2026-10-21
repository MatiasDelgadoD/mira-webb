import { Check } from 'lucide-react'
import { useNavigate } from 'react-router'
import logo from '../../../assets/logo.png'
import { BrandHeader } from '../../../components/BrandHeader'
import { Button } from '../../../components/Button'
import { Screen } from '../../../components/Screen'
import { STORE_LINKS } from '../../../mock/fixtures'
import { useMockStore } from '../../../mock/mockContext'
import styles from '../invitation.module.css'
import done from './done.module.css'

/** "¡Felicitaciones! Estás en el grupo de cuidado de Rosa" (Figma 877:8878). */
export function InvitationWelcomePage() {
  const navigate = useNavigate()
  const { state } = useMockStore()

  return (
    <Screen
      background="glow"
      footer={<Button onClick={() => navigate('/invitacion/pasos')}>Continuar</Button>}
    >
      <div className={`${styles.center} ${styles.congrats}`}>
        <BrandHeader />
        <span className={done.check} aria-hidden>
          <Check size={92} strokeWidth={2.6} />
        </span>
        <h1 className={styles.bigTitle}>¡Felicitaciones!</h1>
        <span className={styles.shortLine} aria-hidden />
        <p className={styles.congratsText}>
          Estás en el grupo
          <br />
          de cuidado de <span className={styles.gold}>{state.person}</span>
        </p>
      </div>
    </Screen>
  )
}

/**
 * "Sigue estos pasos para comenzar" (Figma 877:8904): el final de la
 * invitación en la web. Lo que sigue es bajar la app e iniciar sesión.
 */
export function InvitationNextStepsPage() {
  const { state } = useMockStore()

  return (
    <Screen background="glow">
      <div className={`${styles.center} ${styles.hero}`} style={{ paddingTop: 20, paddingBottom: 24 }}>
        <BrandHeader />
        <h1 className={styles.title}>
          Sigue estos pasos
          <br />
          <span className={styles.gold}>para comenzar</span>
        </h1>
        <ol className={styles.steps}>
          <li className={styles.stepCard}>
            <span className={styles.stepNumber}>1</span>
            <div className={styles.stepBody}>
              <p className={styles.stepCardTitle}>Descarga MIRA.</p>
              <p className={styles.stepCardText}>Búscala en App Store o Google Play.</p>
              <div className={styles.stores}>
                <a className={styles.store} href={STORE_LINKS.appStore} target="_blank" rel="noreferrer">
                  <span>
                    Descárgala en el<strong>App Store</strong>
                  </span>
                </a>
                <a className={styles.store} href={STORE_LINKS.googlePlay} target="_blank" rel="noreferrer">
                  <span>
                    DISPONIBLE EN<strong>Google Play</strong>
                  </span>
                </a>
              </div>
            </div>
            <span className={styles.phone}>
              <img src={logo} alt="" className={styles.phoneLogo} />
              MIRA
            </span>
          </li>
          <li className={styles.stepCard}>
            <span className={styles.stepNumber}>2</span>
            <div className={styles.stepBody}>
              <p className={styles.stepCardTitle}>Abre la app</p>
              <p className={styles.stepCardText}>
                y toca <span className={styles.gold}>Iniciar sesión.</span>
              </p>
            </div>
            <span className={styles.phone}>
              <img src={logo} alt="" className={styles.phoneLogo} />
              <span className={styles.phoneButton}>Iniciar sesión</span>
              <span className={styles.phoneOption} style={{ textAlign: 'center' }}>
                Registrarse
              </span>
            </span>
          </li>
          <li className={styles.stepCard}>
            <span className={styles.stepNumber}>3</span>
            <div className={styles.stepBody}>
              <p className={styles.stepCardTitle}>Entra con la misma cuenta que usaste al registrarte:</p>
              <p className={styles.stepCardText}>Google, Apple o correo.</p>
            </div>
            <span className={styles.phone}>
              <span className={styles.phoneOption}>Continuar con Google</span>
              <span className={styles.phoneOption}>Continuar con Apple</span>
              <span className={styles.phoneOption}>Iniciar con correo</span>
            </span>
          </li>
          <li className={styles.stepCard} style={{ minHeight: 96 }}>
            <span className={styles.stepNumber}>4</span>
            <div className={styles.stepBody}>
              <p className={styles.stepCardTitle}>¡Listo!</p>
              <p className={styles.stepCardText}>
                Ya puedes acompañar a {state.person} desde tu celular.
              </p>
            </div>
            <span className={styles.done}>
              <span className={done.smallCheck} aria-hidden>
                <Check size={30} strokeWidth={2.6} />
              </span>
            </span>
          </li>
        </ol>
      </div>
    </Screen>
  )
}
