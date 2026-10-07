import { Code, Container } from '@mantine/core'
import { useParams } from 'react-router'

import { mediaCatalogDetailToModel } from '../adapters/media-catalog-detail-to-model'
import { toMediaDetailInput } from '../adapters/media-detail-route-params-to-input'
import { PageState } from '../components/page-state'
import { useMediaDetail } from '../hooks/features/use-media'

export function MediaDetailPage() {
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
      <Code block>{JSON.stringify(model, null, 2)}</Code>
    </Container>
  )
}
