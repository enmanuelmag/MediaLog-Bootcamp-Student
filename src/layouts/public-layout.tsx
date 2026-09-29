import { Outlet } from 'react-router'

import { AppHeader } from '../components/app-header'

export function PublicLayout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}
