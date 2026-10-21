import { createContext, useContext } from 'react'
import { MOCK } from './fixtures'

/** Lo que se va cargando en los flujos web. */
export interface MockState {
  /** A quién cuida el grupo de la invitación ("Rosa"). */
  person: string
  /** Quién invitó. */
  inviter: string
  email: string
  name: string
}

export const INITIAL_MOCK_STATE: MockState = {
  person: MOCK.invitation.person,
  inviter: MOCK.invitation.inviter,
  email: '',
  name: '',
}

export interface MockStoreValue {
  state: MockState
  update: (cambios: Partial<MockState>) => void
  reset: () => void
}

export const MockContext = createContext<MockStoreValue | null>(null)

/** El estado de la demo (ver `MockStoreProvider`). */
export function useMockStore() {
  const value = useContext(MockContext)
  if (!value) throw new Error('useMockStore va dentro de MockStoreProvider')
  return value
}
