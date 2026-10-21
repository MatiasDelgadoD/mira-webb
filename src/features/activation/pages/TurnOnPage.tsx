import { AlarmClock, ArrowRight, Grid2x2, QrCode, Watch, type LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import watchSide from '../../../assets/watch/watch_1.png'
import { Button } from '../../../components/Button'
import { GOLD } from '../../../components/GoldGradientDefs'
import { Screen } from '../../../components/Screen'
import styles from '../activation.module.css'

const PASOS: { text: string; icon: LucideIcon }[] = [
  { text: 'Presiona el boton central 3 segundos', icon: Watch },
  { text: 'Escanea el QR', icon: QrCode },
  { text: 'Ingresa el pin que muestra el reloj', icon: Grid2x2 },
]

/** "Enciende tu reloj" (Figma 877:8398): el primero de los tres pasos. */
export function TurnOnPage() {
  const navigate = useNavigate()
  return (
    <Screen
      footer={
        <Button onClick={() => navigate('/activar/qr')} trailing={<ArrowRight size={22} />}>
          Ya lo encendi
        </Button>
      }
    >
      <div className={styles.page}>
        <img src={watchSide} alt="Botón central del reloj" className={styles.watchSide} />
        <span className={styles.holdPill}>
          <AlarmClock size={14} color={GOLD} />
          <span className={styles.gold}>Manten presionado 3 segundos</span>
        </span>
        <h1 className={styles.title}>Enciende tu reloj</h1>
        <p className={styles.subtitle}>
          Presiona y manten el boton central 3 segundos
          <br />
          El reloj mostrara un codigo de 4 digitos en pantalla
        </p>
        <ol className={styles.stepList}>
          {PASOS.map(({ text, icon: Icon }, i) => (
            <li key={text} className={styles.stepItem}>
              <span className={`${styles.stepNumber} ${i === 0 ? styles.stepNumberActive : ''}`}>
                {i + 1}
              </span>
              <span className={styles.stepText}>{text}</span>
              <Icon size={24} strokeWidth={1.6} color={GOLD} />
            </li>
          ))}
        </ol>
      </div>
    </Screen>
  )
}
