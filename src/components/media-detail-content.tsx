import { Badge, Group, Image, Stack, Text, Title } from '@mantine/core'

import type { MediaDetailModel } from '../types/media-detail-model'

type MediaDetailContentProps = Readonly<{
  model: MediaDetailModel
}>

export function MediaDetailContent(props: MediaDetailContentProps) {
  const { model } = props
  const typeLabel = model.mediaType === 'movie' ? 'Película' : 'Serie'

  return (
    <Stack component="article" gap="md">
      <Title order={1}>{model.title}</Title>

      <Group>
        <Badge>{typeLabel}</Badge>
        <Text>{model.releaseLabel}</Text>
      </Group>

      {model.posterUrl !== null ? (
        <Image
          src={model.posterUrl}
          alt={`Portada de ${model.title}`}
          h={300}
          w="auto"
          fit="contain"
        />
      ) : null}

      <Text>{model.description ?? 'Sin descripción disponible'}</Text>

      <Group gap="xs">
        {model.genres.map((genre) => (
          <Badge key={genre} variant="light">
            {genre}
          </Badge>
        ))}
      </Group>

      {model.mediaType === 'movie' ? (
        <Text>Duración: {model.durationMinutes ?? 'No disponible'} min</Text>
      ) : (
        <Stack gap="xs">
          <Text>Temporadas: {model.seasonsCount ?? 'No disponible'}</Text>
          <Text>Episodios: {model.episodesCount ?? 'No disponible'}</Text>
        </Stack>
      )}

      {model.reviewScore !== null ? (
        <Text>Puntuación: {model.reviewScore}</Text>
      ) : null}
    </Stack>
  )
}
