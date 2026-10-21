import { Bell, ShieldCheck, Users, type LucideIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { BrandHeader } from '../../../components/BrandHeader'
import { Button } from '../../../components/Button'
import { GOLD } from '../../../components/GoldGradientDefs'
import { Screen } from '../../../components/Screen'
import { useMockStore } from '../../../mock/mockContext'
import styles from '../invitation.module.css'

const BENEFICIOS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Users, title: 'Cuidado en conjunto', text: 'Comparte información con las personas del grupo.' },
  { icon: Bell, title: 'Recibe notificaciones', text: 'Entérate de lo más importante en tiempo real.' },
  { icon: ShieldCheck, title: 'Más tranquilidad', text: 'Entre todos, brindan un entorno más seguro.' },
]

/**
 * "Fuiste invitado a un grupo de cuidado" (Figma 877:7602): lo primero que ve
 * quien abre el link de invitación. El link trae `persona` e `invita`.
 */
export function InvitationLandingPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { update } = useMockStore()

  // Los datos del link quedan para las páginas siguientes.
  useEffect(() => {
    const person = params.get('persona')
    const inviter = params.get('invita')
    if (person || inviter) {
      update({ ...(person && { person }), ...(inviter && { inviter }) })
    }
  }, [params, update])

  return (
    <Screen
      background="glow"
      footer={
        <>
          <Button onClick={() => navigate('/invitacion/ingresar')}>Iniciar sesion</Button>
          <Button variant="outlined" onClick={() => navigate('/invitacion/registro')}>
            Registrarse
          </Button>
        </>
      }
    >
      <div className={`${styles.center} ${styles.hero}`}>
        <BrandHeader large />
        <h1 className={styles.title}>
          Fuiste invitado a un
          <br />
          <span className={styles.gold}>grupo de cuidado</span>
        </h1>
        <p className={styles.subtitle}>
          Acepta la invitación para mantenerte conectado y ayudar a cuidar de las personas que más
          te importan.
        </p>
        <ul className={styles.features}>
          {BENEFICIOS.map(({ icon: Icon, title, text }) => (
            <li key={title} className={styles.feature}>
              <span className={styles.featureIcon}>
                <Icon size={24} strokeWidth={1.6} color={GOLD} />
              </span>
              <span>
                <span className={styles.featureTitle}>{title}</span>
                <p className={styles.featureText}>{text}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Screen>
  )
}
