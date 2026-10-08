import { Modal, Text } from '@mantine/core'

import { useCreateMediaLogModalStore } from '../stores/create-media-log-modal-store'

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
        <Text>
          Tipo: {selection.mediaType} · ID: {selection.externalId}
        </Text>
      ) : null}
    </Modal>
  )
}
