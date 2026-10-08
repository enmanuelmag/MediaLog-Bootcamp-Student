import { Anchor, Button, Container, Stack } from '@mantine/core'
import { Link, useParams } from 'react-router'

import { mediaCatalogDetailToModel } from '../adapters/media-catalog-detail-to-model'
import { toMediaDetailInput } from '../adapters/media-detail-route-params-to-input'
import { MediaDetailContent } from '../components/media-detail-content'
import { MediaDocumentTitle } from '../components/media-document-title'
import { PageState } from '../components/page-state'
import { useMediaDetail } from '../hooks/features/use-media'
import { useCreateMediaLogModalStore } from '../stores/create-media-log-modal-store'

export function MediaDetailPage() {
  const openCreate = useCreateMediaLogModalStore((state) => state.openCreate)

  const params = useParams()
  const detailInput = toMediaDetailInput(params)
  const detailQuery = useMediaDetail(detailInput)

  if (detailInput === null) {
    return <PageState variant="invalid" />
  }

  if (detailQuery.isLoading) {
    return <PageState variant="loading" />
  }

  if (detailQuery.isError) {
    return <PageState variant="error" />
  }

  if (detailQuery.data === undefined) {
    return (
      <PageState
        variant="unavailable"
        title="Esperando conexión"
        description="Aún no hay una respuesta. Revisa tu conexión."
      />
    )
  }

  if (detailQuery.data.catalog === null) {
    return <PageState variant="unavailable" />
  }

  const model = mediaCatalogDetailToModel(detailQuery.data.catalog)

  return (
    <Container py="xl" size="md">
      <Stack gap="lg">
        <MediaDocumentTitle title={model.title} />

        <MediaDetailContent model={model} />

        <Button onClick={() => openCreate(detailInput)}>
          Agregar a mi biblioteca
        </Button>

        <Anchor component={Link} to="/search">
          Volver a la búsqueda
        </Anchor>
      </Stack>
    </Container>
  )
}
