import { Outlet } from 'react-router'

import { AppHeader } from '../components/app-header'
import { CreateMediaLogModal } from '../components/create-media-log-modal'

export function PublicLayout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>

      <CreateMediaLogModal />
    </>
  )
}
