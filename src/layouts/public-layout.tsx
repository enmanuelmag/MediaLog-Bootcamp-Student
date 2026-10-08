import { Button } from '@mantine/core'
import { Outlet } from 'react-router'

import { AppHeader } from '../components/app-header'
import { CreateMediaLogModal } from '../components/create-media-log-modal'
import { useCreateMediaLogModalStore } from '../stores/create-media-log-modal-store'

export function PublicLayout() {
  const openCreate = useCreateMediaLogModalStore((state) => state.openCreate)

  return (
    <>
      <AppHeader />
      <Button
        onClick={() => openCreate({ mediaType: 'movie', externalId: '438631' })}
      >
        Probar apertura
      </Button>

      <main>
        <Outlet />
      </main>

      <CreateMediaLogModal />
    </>
  )
}
