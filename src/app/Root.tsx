import { Outlet } from 'react-router'
import { GoldGradientDefs } from '../components/GoldGradientDefs'
import { MockStoreProvider } from '../mock/MockStore'

/** Lo que comparten todas las páginas: el estado de la demo y el degradado. */
export function Root() {
  return (
    <MockStoreProvider>
      <GoldGradientDefs />
      <Outlet />
    </MockStoreProvider>
  )
}
