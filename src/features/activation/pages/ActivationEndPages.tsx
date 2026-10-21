import { Check } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router'
import { Button } from '../../../components/Button'
import { Screen } from '../../../components/Screen'
import { APP_RETURN_LINK } from '../../../mock/fixtures'
import { WatchCodeScreen } from '../WatchCodeScreen'
import styles from '../activation.module.css'

/** "Ingresa el pin del reloj" (Figma 877:8197), el último paso de "Activar MIRA". */
export function WatchPinPage() {
  const navigate = useNavigate()
  return (
    <WatchCodeScreen
      title="Ingresa el pin del reloj"
      withConfirm
      onDone={() => navigate('/activar/listo?canal=mira')}
    />
  )
}

/**
 * El reloj quedó activado: de acá se vuelve a la app, a "¿Para quién es el
 * reloj?". Todavía es una demo: la app no escucha el enlace de vuelta.
 */
export function ReturnToAppPage() {
  const [params] = useSearchParams()
  const canal = params.get('canal') ?? 'mira'

  return (
    <Screen
      background="glow"
      footer={
        <Button onClick={() => window.location.assign(`${APP_RETURN_LINK}?canal=${canal}`)}>
          Volver a la app
        </Button>
      }
    >
      <div className={styles.page} style={{ paddingTop: 60 }}>
        <span className={styles.doneIcon} aria-hidden>
          <Check size={64} strokeWidth={2.4} />
        </span>
        <h1 className={styles.title} style={{ marginTop: 28 }}>
          ¡Tu reloj quedó activado!
        </h1>
        <p className={styles.subtitle} style={{ fontSize: 15 }}>
          Vuelve a la app de MIRA para terminar de configurarlo.
        </p>
        <p className={styles.demoNote}>
          Demo: si la app no se abre, toca "Simular activación completada" en MIRA.
        </p>
      </div>
    </Screen>
  )
}
