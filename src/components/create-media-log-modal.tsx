import { Modal } from '@mantine/core'

import { useCreateMediaLogModalStore } from '../stores/create-media-log-modal-store'
import { CreateMediaLogForm } from './create-media-log-form'

export function CreateMediaLogModal() {
  const selection = useCreateMediaLogModalStore((state) => state.selection)
  const closeCreate = useCreateMediaLogModalStore((state) => state.closeCreate)

  return (
    <Modal
      opened={selection !== null}
      onClose={closeCreate}
      title="Agregar a mi biblioteca"
      closeButtonProps={{ 'aria-label': 'Cerrar' }}
    >
      {selection !== null ? (
        <CreateMediaLogForm
          key={`${selection.mediaType}:${selection.externalId}`}
          identity={selection}
          onCancel={closeCreate}
        />
      ) : null}
    </Modal>
  )
}
