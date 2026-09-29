import { Anchor, Code, Container, Stack, Text, Title } from '@mantine/core'
import { Link, useParams } from 'react-router'

import { toMediaDetailInput } from '../adapters/media-detail-route-params-to-input'

export function MediaDetailPage() {
  const detailInput = toMediaDetailInput(useParams())

  if (detailInput === null) {
    return (
      <Container py="xl" size="sm">
        <Stack>
          <Title order={1}>URL de detalle no válida</Title>
          <Text>Revisa el tipo y el identificador del medio.</Text>
          <Anchor component={Link} to="/search">
            Volver a la búsqueda
          </Anchor>
        </Stack>
      </Container>
    )
  }

  return (
    <Container py="xl" size="sm">
      <Stack>
        <Title order={1}>Detalle provisional</Title>
        <Text>
          La ruta ya produjo un input válido. La próxima sesión consultará el
          detalle remoto.
        </Text>
        <Code block>
          {JSON.stringify(detailInput, null, 2)}
        </Code>
        <Anchor component={Link} to="/search">
          Volver a la búsqueda
        </Anchor>
      </Stack>
    </Container>
  )
}
