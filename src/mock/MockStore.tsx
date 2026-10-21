import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { INITIAL_MOCK_STATE, MockContext, type MockState, type MockStoreValue } from './mockContext'

const CLAVE = 'mira-web-demo'

/** Lee lo guardado en la pestaña; si no hay (o no se puede), arranca de cero. */
function leer(): MockState {
  try {
    const guardado = sessionStorage.getItem(CLAVE)
    return guardado ? { ...INITIAL_MOCK_STATE, ...JSON.parse(guardado) } : INITIAL_MOCK_STATE
  } catch {
    return INITIAL_MOCK_STATE
  }
}

/**
 * El estado de la demo, guardado en `sessionStorage` para que sobreviva a un
 * refresco. Cada pantalla se puede abrir sola por URL: lo que falte sale de
 * los datos de prueba.
 */
export function MockStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MockState>(leer)

  useEffect(() => {
    try {
      sessionStorage.setItem(CLAVE, JSON.stringify(state))
    } catch {
      // Sin almacenamiento (modo privado): la demo sigue en memoria.
    }
  }, [state])

  // Estables: las páginas los usan en efectos sin que se vuelvan a correr.
  const update = useCallback(
    (cambios: Partial<MockState>) => setState((actual) => ({ ...actual, ...cambios })),
    [],
  )
  const reset = useCallback(() => setState(INITIAL_MOCK_STATE), [])

  const value = useMemo<MockStoreValue>(() => ({ state, update, reset }), [state, update, reset])

  return <MockContext.Provider value={value}>{children}</MockContext.Provider>
}
