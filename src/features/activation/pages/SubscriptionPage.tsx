import { CreditCard } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../../components/Button'
import { FormField } from '../../../components/FormField'
import { Screen } from '../../../components/Screen'
import { demora, MOCK } from '../../../mock/fixtures'
import styles from '../activation.module.css'

type PaymentMethod = 'card' | 'apple' | 'google'

const METODOS: { id: PaymentMethod; label: string }[] = [
  { id: 'card', label: 'Tarjeta' },
  { id: 'apple', label: 'Apple Pay' },
  { id: 'google', label: 'Google Pay' },
]

/** "1234123412341234" → "1234 1234 1234 1234". */
const enGrupos = (v: string) =>
  v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')

/** "1228" → "12/28". */
const comoVencimiento = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

/**
 * "Suscripcion" (Figma 877:8311): el plan y el pago, lo primero de "Activar
 * MIRA". Es una demo: no se cobra nada y los datos no se guardan.
 */
export function SubscriptionPage() {
  const navigate = useNavigate()
  const [metodo, setMetodo] = useState<PaymentMethod>('card')
  const [nombre, setNombre] = useState('')
  const [pais, setPais] = useState('')
  const [direccion, setDireccion] = useState('')
  const [tarjeta, setTarjeta] = useState('')
  const [vence, setVence] = useState('')
  const [cvc, setCvc] = useState('')
  const [cargando, setCargando] = useState(false)

  const confirmar = async () => {
    setCargando(true)
    await demora(900)
    navigate('/activar/encender')
  }

  return (
    <Screen
      footer={
        <Button disabled={cargando} onClick={confirmar}>
          {cargando ? 'Procesando…' : 'Confirmar'}
        </Button>
      }
    >
      <div className={styles.subscription}>
        <h1 className={styles.screenTitle}>Suscripcion</h1>
        <div className={styles.planCard}>
          <p className={styles.planName}>{MOCK.plan.name}</p>
          <span className={styles.pill}>Valor a pagar</span>
          <p className={styles.price}>{MOCK.plan.price}</p>
          <p className={styles.period}>{MOCK.plan.period}</p>
        </div>
        <p className={styles.section}>
          <span className={styles.sectionLabel}>METODO DE PAGO</span>
        </p>
        <FormField
          label="Nombre completo"
          placeholder="Nombre completo"
          autoComplete="off"
          value={nombre}
          onChange={setNombre}
        />
        <FormField
          label="Pais o region"
          placeholder="Pais"
          options={[...MOCK.countries]}
          value={pais}
          onChange={setPais}
        />
        <FormField
          label="Primera linea de la direccion"
          placeholder="Direccion"
          autoComplete="off"
          value={direccion}
          onChange={setDireccion}
        />
        <div className={styles.methods} role="radiogroup" aria-label="Método de pago">
          {METODOS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={metodo === id}
              className={`${styles.method} ${metodo === id ? styles.methodActive : ''}`}
              onClick={() => setMetodo(id)}
            >
              {id === 'card' && <CreditCard size={14} />}
              {label}
            </button>
          ))}
        </div>
        {metodo === 'card' && (
          <>
            <FormField
              label="Numero de tarjeta"
              placeholder="1234 1234 1234 1234"
              inputMode="numeric"
              autoComplete="off"
              value={tarjeta}
              onChange={(v) => setTarjeta(enGrupos(v))}
            />
            <div className={styles.twoColumns}>
              <FormField
                label="Fecha de vencimiento"
                placeholder="MM/AA"
                inputMode="numeric"
                autoComplete="off"
                value={vence}
                onChange={(v) => setVence(comoVencimiento(v))}
              />
              <FormField
                label="Codigo de seguridad"
                placeholder="CVC"
                inputMode="numeric"
                autoComplete="off"
                maxLength={4}
                value={cvc}
                onChange={(v) => setCvc(v.replace(/\D/g, ''))}
              />
            </div>
          </>
        )}
        <p className={styles.demoNote}>Demo: no se cobra nada y los datos no se guardan.</p>
      </div>
    </Screen>
  )
}
