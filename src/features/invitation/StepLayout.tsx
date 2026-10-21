import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../../components/Button'
import { Screen } from '../../components/Screen'
import { TopBar } from '../../components/TopBar'
import styles from './invitation.module.css'

interface StepLayoutProps {
  progress: number
  heading: string
  /** El título centrado (el PIN) en vez de a la izquierda. */
  centered?: boolean
  canContinue: boolean
  loading?: boolean
  onContinue: () => void
  children: ReactNode
}

/** Un paso del registro: "Registrarse" con su progreso, el título y "Continuar". */
export function StepLayout({
  progress,
  heading,
  centered,
  canContinue,
  loading,
  onContinue,
  children,
}: StepLayoutProps) {
  return (
    <Screen
      footer={
        <Button
          disabled={!canContinue || loading}
          onClick={onContinue}
          trailing={<ArrowRight size={22} />}
        >
          {loading ? 'Un momento…' : 'Continuar'}
        </Button>
      }
    >
      <TopBar title="Registrarse" progress={progress} />
      <form
        className={styles.step}
        onSubmit={(e) => {
          e.preventDefault()
          if (canContinue && !loading) onContinue()
        }}
      >
        <h2 className={`${styles.stepTitle} ${centered ? styles.stepTitleCentered : ''}`}>
          {heading}
        </h2>
        {children}
        {/* Enter en el teclado envía el paso. */}
        <button type="submit" hidden />
      </form>
    </Screen>
  )
}
