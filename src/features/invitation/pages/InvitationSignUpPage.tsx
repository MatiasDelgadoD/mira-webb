import { useNavigate } from 'react-router'
import logo from '../../../assets/logo.png'
import { GoldWaves } from '../../../components/GoldWaves'
import { Screen } from '../../../components/Screen'
import { OrDivider, SocialButton } from '../../../components/SocialButton'
import { TopBar } from '../../../components/TopBar'
import { demora } from '../../../mock/fixtures'
import styles from '../invitation.module.css'

/**
 * "Registrarse / Selecciona como quieres registrarte" de la invitación (Figma
 * 877:7686). Google y Apple crean la cuenta de una (en la demo, sin salir de
 * la página); el correo sigue los pasos.
 */
export function InvitationSignUpPage() {
  const navigate = useNavigate()

  const conCuenta = async () => {
    await demora()
    navigate('/invitacion/bienvenida')
  }

  return (
    <Screen>
      <GoldWaves flare />
      <GoldWaves />
      <TopBar />
      <div className={`${styles.center} ${styles.method}`}>
        <img src={logo} alt="MIRA" className={styles.methodLogo} />
        <h1 className={styles.methodTitle}>Registrarse</h1>
        <p className={styles.methodSubtitle}>
          Selecciona como quieres
          <br />
          registrarte
        </p>
        <div className={styles.options}>
          <SocialButton provider="google" onClick={conCuenta}>
            Registrarse con Google
          </SocialButton>
          <SocialButton provider="apple" onClick={conCuenta}>
            Registrarse con Apple
          </SocialButton>
          <OrDivider />
          <SocialButton provider="email" onClick={() => navigate('/invitacion/registro/correo')}>
            Registrarse con correo
          </SocialButton>
        </div>
        <p className={styles.footnote}>
          ¿Ya tienes cuenta?{' '}
          <button type="button" className={styles.textLink} onClick={() => navigate('/invitacion/ingresar')}>
            Inicia sesion
          </button>
        </p>
      </div>
    </Screen>
  )
}
