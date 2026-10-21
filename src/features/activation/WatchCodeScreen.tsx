import { useState } from 'react'
import logo from '../../assets/logo.png'
import watchCode from '../../assets/watch/watch_code.png'
import { Button } from '../../components/Button'
import { OtpInput } from '../../components/OtpInput'
import { Screen } from '../../components/Screen'
import { MOCK } from '../../mock/fixtures'
import styles from './activation.module.css'

interface WatchCodeScreenProps {
  /** "Ingresa el pin del reloj" o "Ingresa el codigo del reloj". */
  title: string
  /** Con "Confirmar" al pie; sin él, sigue solo al completar los 4 dígitos. */
  withConfirm?: boolean
  onDone: () => void
}

/**
 * El código de 4 dígitos que muestra el reloj al encenderlo (Figma 877:8197 y
 * 877:8243). En la demo el reloj siempre muestra el mismo.
 */
export function WatchCodeScreen({ title, withConfirm, onDone }: WatchCodeScreenProps) {
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')

  const confirmar = (valor = codigo) => {
    if (valor !== MOCK.watchPin) {
      setError('El código no coincide con el del reloj.')
      setCodigo('')
      return
    }
    onDone()
  }

  return (
    <Screen
      footer={
        withConfirm && (
          <Button disabled={codigo.length < 4} onClick={() => confirmar()}>
            Confirmar
          </Button>
        )
      }
    >
      <div className={styles.page}>
        <img src={logo} alt="MIRA" className={styles.logo} />
        <h1 className={styles.titleStrong}>{title}</h1>
        <img src={watchCode} alt="Reloj mostrando el código" className={styles.watchCode} />
        <p className={styles.small}>El código aparecera en la pantalla de tu reloj</p>
        <h2 className={styles.codeTitle}>Ingresa el codigo</h2>
        <p className={styles.subtitle}>
          Escribe los 4 dígitos que aparecen en
          <br />
          la pantalla de tu MIRA Watch
        </p>
        <div className={styles.otpWrap}>
          <OtpInput
            value={codigo}
            onChange={(v) => {
              setCodigo(v)
              setError('')
            }}
            onComplete={withConfirm ? undefined : confirmar}
          />
        </div>
        {error && (
          <p className={styles.question} role="alert">
            {error}
          </p>
        )}
        <p className={styles.question}>
          ¿El codigo no aparece en tu reloj?
          <br />
          <button type="button" className={styles.link} style={{ fontSize: 13 }} onClick={() => setCodigo('')}>
            Volver a enviar codigo
          </button>
        </p>
        <p className={styles.demoNote}>Demo: el reloj muestra {MOCK.watchPin}</p>
      </div>
    </Screen>
  )
}
