import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import logo from '../../../assets/logo.png'
import watchBox from '../../../assets/watch/watch_box.png'
import { Button } from '../../../components/Button'
import { Screen } from '../../../components/Screen'
import { TopBar } from '../../../components/TopBar'
import styles from '../activation.module.css'

function Esquinas() {
  return (
    <>
      <span className={`${styles.corner} ${styles.cornerTl}`} />
      <span className={`${styles.corner} ${styles.cornerTr}`} />
      <span className={`${styles.corner} ${styles.cornerBl}`} />
      <span className={`${styles.corner} ${styles.cornerBr}`} />
    </>
  )
}

/**
 * "Escanea el QR" (Figma 877:7881): dónde está el código y el visor. Tocar el
 * visor abre la cámara.
 */
export function ScanQrPage() {
  const navigate = useNavigate()
  return (
    <Screen>
      <div className={styles.page}>
        <img src={logo} alt="MIRA" className={styles.logo} />
        <h1 className={styles.title}>Escanea el QR</h1>
        <button
          type="button"
          className={styles.scanner}
          aria-label="Abrir la cámara"
          style={{ border: 'none', cursor: 'pointer' }}
          onClick={() => navigate('/activar/qr/camara')}
        >
          <Esquinas />
          <span className={styles.scanLine} />
        </button>
        <p className={styles.subtitle} style={{ fontSize: 15, color: 'var(--color-text)' }}>
          El codigo QR se encuentra dentro
          <br />
          de la caja, debajo del manual de
          <br />
          usuario
        </p>
        <img src={watchBox} alt="Caja del reloj con el QR" className={styles.box} />
        {/* En el diseño todavía no tiene pantalla: lleva directo al PIN. */}
        <button type="button" className={styles.link} style={{ marginTop: 18 }} onClick={() => navigate('/activar/pin')}>
          Ingresa manualmente el IMEI
        </button>
      </div>
    </Screen>
  )
}

/**
 * La cámara del QR (Figma 877:8145). Si el navegador da permiso se ve la
 * cámara; la lectura del código se simula.
 */
export function CameraPage() {
  const navigate = useNavigate()
  const video = useRef<HTMLVideoElement>(null)
  // Sin `mediaDevices` (http fuera de localhost, navegador viejo) ni se pide.
  const [sinCamara, setSinCamara] = useState(() => !navigator.mediaDevices)

  useEffect(() => {
    if (!navigator.mediaDevices) return
    let stream: MediaStream | undefined
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((s) => {
        stream = s
        if (video.current) video.current.srcObject = s
      })
      .catch(() => setSinCamara(true))
    return () => stream?.getTracks().forEach((t) => t.stop())
  }, [])

  return (
    <Screen
      background="plain"
      footer={<Button onClick={() => navigate('/activar/pin')}>Simular lectura del QR</Button>}
    >
      <TopBar />
      <div className={styles.page} style={{ paddingTop: 0 }}>
        <img src={logo} alt="MIRA" className={styles.logo} />
        <h1 className={styles.title}>Escanea el QR</h1>
        <div className={styles.camera}>
          <video ref={video} className={styles.video} autoPlay playsInline muted />
          {sinCamara && (
            <p className={styles.cameraHint}>Sin acceso a la cámara. Usa "Simular lectura del QR".</p>
          )}
          <Esquinas />
        </div>
        <p className={styles.subtitle} style={{ fontSize: 15, color: 'var(--color-text)' }}>
          El codigo QR se encuentra dentro
          <br />
          de la caja, debajo del manual de
          <br />
          usuario
        </p>
      </div>
    </Screen>
  )
}
