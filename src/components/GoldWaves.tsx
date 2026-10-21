import styles from './GoldWaves.module.css'

interface GoldWavesProps {
  /** El destello de arriba a la izquierda en vez de la franja del pie. */
  flare?: boolean
}

const LINEAS = 14

/**
 * Las ondas doradas de las pantallas de registro: líneas finas con el
 * degradado y una más brillante al medio. Son decorativas.
 */
export function GoldWaves({ flare }: GoldWavesProps) {
  const lineas = Array.from({ length: LINEAS }, (_, i) => {
    const t = i / (LINEAS - 1)
    const d = flare
      ? `M0 ${35 + 50 * t} Q 50 ${25 + 35 * t} ${85 + 15 * t} -5`
      : `M0 ${55 + 25 * t} C 30 ${50 - 25 * t} 55 ${85} 100 ${10 - 20 * t}`
    return { d, alfa: 0.25 + 0.6 * Math.sin(Math.PI * t), brillante: i === 6 }
  })

  return (
    <svg
      className={`${styles.waves} ${flare ? styles.flare : styles.bottom}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={flare ? 'ondas-flare' : 'ondas'} x1="0" x2="1">
          <stop offset="0" stopColor="#a06000" />
          <stop offset="0.6" stopColor="#ff9900" />
          <stop offset="1" stopColor="#ffd27a" />
        </linearGradient>
        <filter id="ondas-brillo">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      {lineas.map(({ d, alfa, brillante }) => (
        <g key={d}>
          {brillante && (
            <path
              d={d}
              fill="none"
              stroke={`url(#${flare ? 'ondas-flare' : 'ondas'})`}
              strokeWidth={2.5}
              filter="url(#ondas-brillo)"
              vectorEffect="non-scaling-stroke"
            />
          )}
          <path
            d={d}
            fill="none"
            stroke={`url(#${flare ? 'ondas-flare' : 'ondas'})`}
            strokeOpacity={alfa}
            strokeWidth={brillante ? 2 : 0.8}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  )
}
