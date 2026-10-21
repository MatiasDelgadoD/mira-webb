import { Lock, Mail, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { OtpInput } from '../../../components/OtpInput'
import { TermsCheckbox } from '../../../components/TermsCheckbox'
import { TextField } from '../../../components/TextField'
import { demora, MOCK } from '../../../mock/fixtures'
import { useMockStore } from '../../../mock/mockContext'
import { StepLayout } from '../StepLayout'
import styles from '../invitation.module.css'

// Los pasos del registro con correo de la invitación (Figma 877:8961, 8935,
// 8987 y 9013). Las mismas pantallas que el registro de la app.

const CORREO = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/** "Tu información / Correo electronico". */
export function EmailStepPage() {
  const navigate = useNavigate()
  const { state, update } = useMockStore()
  const [email, setEmail] = useState(state.email)
  const [cargando, setCargando] = useState(false)

  return (
    <StepLayout
      progress={143 / 351}
      heading="Tu información"
      canContinue={CORREO.test(email.trim())}
      loading={cargando}
      onContinue={async () => {
        setCargando(true)
        await demora()
        update({ email: email.trim() })
        navigate('/invitacion/registro/codigo')
      }}
    >
      <TextField
        label="Correo electronico"
        icon={Mail}
        type="email"
        placeholder="correo@gmail.com"
        autoComplete="email"
        highlighted
        value={email}
        onChange={setEmail}
      />
    </StepLayout>
  )
}

/** "Confirma tu cuenta": el PIN de 4 dígitos que llegó al correo. */
export function CodeStepPage() {
  const navigate = useNavigate()
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [restante, setRestante] = useState(30)

  useEffect(() => {
    if (restante <= 0) return
    const id = setTimeout(() => setRestante((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [restante])

  const confirmar = (valor = codigo) => {
    if (valor !== MOCK.emailCode) {
      setError('El código no es correcto.')
      setCodigo('')
      return
    }
    navigate('/invitacion/registro/nombre')
  }

  return (
    <StepLayout
      progress={215 / 351}
      heading="Confirma tu cuenta"
      centered
      canContinue={codigo.length === 4}
      onContinue={() => confirmar()}
    >
      <p className={styles.muted}>
        Ingresa el pin de 4 digitos que te llego
        <br />
        al correo
      </p>
      <OtpInput
        value={codigo}
        onChange={(v) => {
          setCodigo(v)
          setError('')
        }}
        onComplete={confirmar}
      />
      <p className={styles.resend}>
        <button
          type="button"
          className={styles.resendLink}
          disabled={restante > 0}
          onClick={() => setRestante(30)}
        >
          Enviar otra vez
        </button>
        {restante > 0 && <span>{restante} segundos</span>}
      </p>
      {error && <p className={styles.muted} role="alert">{error}</p>}
      <p className={styles.demoNote}>Demo: el código es {MOCK.emailCode}</p>
    </StepLayout>
  )
}

/** "Tu información / Nombre". */
export function NameStepPage() {
  const navigate = useNavigate()
  const { state, update } = useMockStore()
  const [nombre, setNombre] = useState(state.name)

  return (
    <StepLayout
      progress={261 / 351}
      heading="Tu información"
      canContinue={nombre.trim().length > 0}
      onContinue={() => {
        update({ name: nombre.trim() })
        navigate('/invitacion/registro/contrasena')
      }}
    >
      <TextField
        label="Nombre"
        icon={User}
        placeholder="Rosa garcia"
        autoComplete="name"
        highlighted
        value={nombre}
        onChange={setNombre}
      />
    </StepLayout>
  )
}

/** Lo que le falta a la contraseña; vacío si está lista. */
function faltaEnLaClave(clave: string, confirmacion: string) {
  if (clave.length < 8) return 'Debe tener al menos 8 caracteres.'
  if (!/[A-ZÁÉÍÓÚÑ]/.test(clave)) return 'Debe tener una mayúscula.'
  if (clave !== confirmacion) return 'Las contraseñas no coinciden.'
  return ''
}

/** "Crear contraseña": la contraseña, su confirmación y los términos. */
export function PasswordStepPage() {
  const navigate = useNavigate()
  const [clave, setClave] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const [terminos, setTerminos] = useState(false)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  return (
    <StepLayout
      progress={1}
      heading="Crear contraseña"
      canContinue={clave.length > 0 && confirmacion.length > 0}
      loading={cargando}
      onContinue={async () => {
        const falta = faltaEnLaClave(clave, confirmacion)
        if (falta || !terminos) {
          setError(falta || 'Acepta los términos y condiciones para seguir.')
          return
        }
        setCargando(true)
        await demora()
        navigate('/invitacion/bienvenida')
      }}
    >
      <div>
        <TextField
          icon={Lock}
          type="password"
          placeholder="Contraseña"
          autoComplete="new-password"
          value={clave}
          onChange={(v) => {
            setClave(v)
            setError('')
          }}
        />
        <p className={styles.hint} style={{ marginTop: 8 }}>
          La contraseña minimo debe llevar 8 caracteres y una mayuscula
        </p>
      </div>
      <TextField
        icon={Lock}
        type="password"
        placeholder="Confirma contraseña"
        autoComplete="new-password"
        value={confirmacion}
        onChange={(v) => {
          setConfirmacion(v)
          setError('')
        }}
      />
      <TermsCheckbox checked={terminos} onChange={setTerminos} />
      {error && <p className={styles.muted} role="alert">{error}</p>}
    </StepLayout>
  )
}
