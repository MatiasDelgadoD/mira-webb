import { Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import logo from '../../../assets/logo.png'
import { Button } from '../../../components/Button'
import { Screen } from '../../../components/Screen'
import { OrDivider, SocialButton } from '../../../components/SocialButton'
import { TextField } from '../../../components/TextField'
import { demora } from '../../../mock/fixtures'
import { useMockStore } from '../../../mock/mockContext'
import styles from '../invitation.module.css'

/**
 * "Bienvenido de nuevo" (Figma 877:8822): quien ya tiene cuenta acepta la
 * invitación iniciando sesión. En la demo cualquier dato entra.
 */
export function InvitationLoginPage() {
  const navigate = useNavigate()
  const { state, update } = useMockStore()
  const [email, setEmail] = useState(state.email)
  const [clave, setClave] = useState('')
  const [cargando, setCargando] = useState(false)

  const entrar = async () => {
    setCargando(true)
    await demora()
    update({ email: email.trim() })
    navigate('/invitacion/bienvenida')
  }

  return (
    <Screen>
      <form
        className={`${styles.center} ${styles.login}`}
        onSubmit={(e) => {
          e.preventDefault()
          entrar()
        }}
      >
        <img src={logo} alt="MIRA" className={styles.methodLogo} />
        <h1 className={styles.methodTitle}>Bienvenido de nuevo</h1>
        <p className={styles.methodSubtitle}>
          Ingresa tu cuenta para ver
          <br />a quien mas quieres.
        </p>
        <div className={styles.loginForm}>
          <TextField
            icon={Mail}
            type="email"
            placeholder="juan@email.com"
            autoComplete="email"
            highlighted
            value={email}
            onChange={setEmail}
          />
          <TextField
            icon={Lock}
            type="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            highlighted
            value={clave}
            onChange={setClave}
          />
          <button type="button" className={`${styles.textLink} ${styles.forgot}`}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <div className={styles.options} style={{ marginTop: 22 }}>
          <Button type="submit" disabled={!email || !clave || cargando}>
            {cargando ? 'Un momento…' : 'Ingresar'}
          </Button>
          <OrDivider />
          <SocialButton provider="google" onClick={entrar}>
            Continuar con Google
          </SocialButton>
          <SocialButton provider="apple" onClick={entrar}>
            Continuar con Apple
          </SocialButton>
        </div>
        <p className={styles.footnote}>
          ¿No tienes cuenta?{' '}
          <button type="button" className={styles.textLink} onClick={() => navigate('/invitacion/registro')}>
            Registrate
          </button>
        </p>
      </form>
    </Screen>
  )
}
