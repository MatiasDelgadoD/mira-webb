import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import logo from '../../../assets/logo.png'
import watchCode from '../../../assets/watch/watch_code.png'
import watchHand from '../../../assets/watch/watch_hand.png'
import { Button } from '../../../components/Button'
import { FormField } from '../../../components/FormField'
import { Modal, Spinner } from '../../../components/Modal'
import { OtpInput } from '../../../components/OtpInput'
import { Screen } from '../../../components/Screen'
import { demora, MOCK, PROVIDERS } from '../../../mock/fixtures'
import { WatchCodeScreen } from '../../activation/WatchCodeScreen'
import activation from '../../activation/activation.module.css'
import { ProviderHeader } from '../ProviderHeader'
import styles from '../provider.module.css'

/** El proveedor de la ruta (`/proveedor/:id`), o `null` si no existe. */
function useProvider() {
  const { id = '' } = useParams()
  const provider = PROVIDERS[id]
  return provider ? { id, ...provider } : null
}

/** "Ingresa el numero de documento del afiliado" (Figma 877:7932). */
export function ProviderDocumentPage() {
  const navigate = useNavigate()
  const provider = useProvider()
  const [tipo, setTipo] = useState<string>(MOCK.documentTypes[0])
  const [numero, setNumero] = useState('')
  if (!provider) return <Navigate to="/" replace />

  return (
    <Screen
      background="white"
      footer={
        <Button
          variant="brand"
          disabled={numero.length < 5}
          onClick={() => navigate(`/proveedor/${provider.id}/codigo`)}
        >
          Continuar
        </Button>
      }
    >
      <div className={styles.page}>
        <ProviderHeader name={provider.name} />
        <h1 className={styles.title}>
          Ingresa el numero de documento
          <br />
          del afiliado
        </h1>
        <FormField
          variant="brand"
          label="Tipo de documento"
          options={[...MOCK.documentTypes]}
          value={tipo}
          onChange={setTipo}
        />
        <FormField
          variant="brand"
          label="Numero de documento"
          inputMode="numeric"
          value={numero}
          onChange={(v) => setNumero(v.replace(/\D/g, ''))}
        />
      </div>
    </Screen>
  )
}

/** "Pon el codigo de acceso que Comfamiliar te dio" y su validación (877:8018 / 8059). */
export function ProviderCodePage() {
  const navigate = useNavigate()
  const provider = useProvider()
  const [codigo, setCodigo] = useState('')
  const [validando, setValidando] = useState(false)
  if (!provider) return <Navigate to="/" replace />

  const validar = async () => {
    setValidando(true)
    await demora(1600)
    navigate(`/proveedor/${provider.id}/conectar`)
  }

  return (
    <Screen background="white">
      <div className={styles.page}>
        <ProviderHeader name={provider.name} />
        <h1 className={styles.title}>
          Pon el codigo de acceso que
          <br />
          {provider.name} te dio
        </h1>
        <OtpInput variant="brand" value={codigo} onChange={setCodigo} onComplete={validar} />
        <p className={styles.validatingText} style={{ textAlign: 'center' }}>
          Demo: cualquier código de 4 dígitos sirve ({MOCK.providerCode}, por ejemplo).
        </p>
      </div>
      <Modal open={validando}>
        <Spinner />
        <p className={styles.validating}>Validando tu código</p>
        <p className={styles.validatingText}>
          Estamos confirmando tu código de acceso con {provider.name}. Esto puede tardar unos
          segundos.
        </p>
      </Modal>
    </Screen>
  )
}

/** "Conecta tu MIRA Watch": encender el reloj y recibir el código (Figma 877:8287). */
export function ProviderConnectPage() {
  const navigate = useNavigate()
  const provider = useProvider()
  if (!provider) return <Navigate to="/" replace />

  return (
    <Screen
      footer={
        <Button onClick={() => navigate(`/proveedor/${provider.id}/pin`)}>Solicitar codigo</Button>
      }
    >
      <div className={styles.connect}>
        <img src={logo} alt="MIRA" className={activation.logo} />
        <h1 className={activation.titleStrong}>Conecta tu MIRA Watch</h1>
        <p className={activation.subtitle} style={{ fontSize: 15 }}>
          Sigue los siguientes pasos para vincular
          <br />
          tu reloj.
        </p>
        <ol className={styles.connectSteps}>
          <li className={styles.connectStep}>
            <span className={styles.badge}>1</span>
            <div className={styles.connectBody}>
              <p className={styles.connectTitle}>Enciende el reloj</p>
              <p className={styles.connectText}>
                Mantén pulsado el botón central del reloj hasta que se encienda la pantalla.
              </p>
            </div>
            <img src={watchHand} alt="" className={styles.connectImage} />
          </li>
          <li className={styles.connectStep}>
            <span className={styles.badge}>2</span>
            <div className={styles.connectBody}>
              <p className={styles.connectTitle}>Recibe el código</p>
              <p className={styles.connectText}>
                Después de encender el reloj, aparecerá un código de 4 dígitos en la pantalla de tu
                MIRA Watch.
              </p>
            </div>
            <img src={watchCode} alt="" className={styles.connectImage} />
          </li>
        </ol>
      </div>
    </Screen>
  )
}

/** "Ingresa el codigo del reloj" (Figma 877:8243): sigue solo al completarlo. */
export function ProviderWatchCodePage() {
  const navigate = useNavigate()
  return (
    <WatchCodeScreen
      title="Ingresa el codigo del reloj"
      onDone={() => navigate('/activar/listo?canal=proveedor')}
    />
  )
}
