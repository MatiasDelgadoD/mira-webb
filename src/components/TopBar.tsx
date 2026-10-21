import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router'
import { GOLD } from './GoldGradientDefs'
import styles from './TopBar.module.css'

interface TopBarProps {
  /** "Registrarse"; sin título queda sólo la flecha. */
  title?: string
  /** Avance de 0 a 1; sin él no hay barra. */
  progress?: number
  /** Sin flecha de volver. */
  hideBack?: boolean
}

/** La barra de arriba de los pasos: volver, el título y el progreso. */
export function TopBar({ title, progress, hideBack }: TopBarProps) {
  const navigate = useNavigate()
  return (
    <header className={styles.bar}>
      <div className={styles.row}>
        {!hideBack && (
          <button
            type="button"
            className={styles.back}
            aria-label="Volver"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={28} color={GOLD} strokeWidth={1.8} />
          </button>
        )}
        {title && <h1 className={styles.title}>{title}</h1>}
      </div>
      {progress !== undefined && <ProgressBar progress={progress} />}
    </header>
  )
}

/** La barra de 4 px llena con el degradado hasta `progress`. */
export function ProgressBar({ progress }: { progress: number }) {
  const ancho = Math.min(Math.max(progress, 0), 1) * 100
  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuenow={Math.round(ancho)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.fill} style={{ width: `${ancho}%` }} />
    </div>
  )
}
