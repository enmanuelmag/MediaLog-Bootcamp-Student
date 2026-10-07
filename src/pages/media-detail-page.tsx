import { Anchor, Button, Code, Container, Group, Stack, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { Link } from 'react-router'

import { demoCatalog, demoMediaDetail } from '../data/demo-media-detail'
import { useMediaDetail } from '../hooks/features/use-media'
import { mediaKeys } from '../hooks/media-keys'
import type { GetMediaDetailInput } from '../types/media-api'

export function MediaDetailPage() {
  // Demostración: todavía no usamos la identidad de la URL.
  const [demoInput, setDemoInput] = useState<GetMediaDetailInput | null>(null)
  const detailQuery = useMediaDetail(demoInput)

  return (
    <Container py="xl" size="md">
      <Stack gap="lg">
        <Title order={1}>Laboratorio de detalle</Title>

        <Group>
          <Button
            onClick={() => setDemoInput({ mediaType: 'movie', externalId: '438631' })}
          >
            Consultar película
          </Button>

          <Button
            onClick={() => setDemoInput({ mediaType: 'series', externalId: '1399' })}
          >
            Consultar serie
          </Button>

          <Button variant="light" onClick={() => setDemoInput(null)}>
            Sin identidad
          </Button>
        </Group>

        <Code block>{JSON.stringify(mediaKeys.detail(demoInput), null, 2)}</Code>

        <Text>
          Datos: {detailQuery.status} · Red: {detailQuery.fetchStatus}
        </Text>

        <Code block>{JSON.stringify(detailQuery.data ?? null, null, 2)}</Code>

        <Title order={2}>Traducción con datos locales</Title>

        <Text>DTO de demostración</Text>
        <Code block>{JSON.stringify(demoCatalog, null, 2)}</Code>

        <Text>Modelo visual</Text>
        <Code block>{JSON.stringify(demoMediaDetail, null, 2)}</Code>

        <Anchor component={Link} to="/search">
          Volver a la búsqueda
        </Anchor>
      </Stack>
    </Container>
  )
}
