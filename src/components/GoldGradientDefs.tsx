/** Id del degradado dorado para usar como `stroke` o `fill` en los SVG. */
export const GOLD = 'url(#mira-gold)'

/**
 * Define una vez el degradado de los botones (#A06000 → #FF9900) para que los
 * íconos lo usen: todo lo dorado va con el degradado, nunca plano.
 *
 * En unidades del ícono (la grilla de 24 de lucide) y no de su caja: con la
 * caja, los trazos rectos (de alto o ancho cero) quedaban sin pintar.
 */
export function GoldGradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <linearGradient id="mira-gold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="0">
          <stop offset="0%" stopColor="#a06000" />
          <stop offset="100%" stopColor="#ff9900" />
        </linearGradient>
      </defs>
    </svg>
  )
}
