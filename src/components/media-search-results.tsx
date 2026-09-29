import {
  Badge,
  Box,
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core'

import type { MediaSearchCardModel } from '../types/media-search-card-model'

type MediaSearchResultsProps = {
  items: MediaSearchCardModel[]
}

export function MediaSearchResults(props: MediaSearchResultsProps) {
  const { items } = props

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
      {items.map((item) => (
        <Card key={item.key} padding="lg" radius="md" withBorder>
          <Card.Section>
            {item.posterUrl === null ? (
              <Box
                aria-label={`Sin portada para ${item.title}`}
                bg="gray.9"
                h={240}
              >
                <Text pt="xl" ta="center">
                  Sin portada
                </Text>
              </Box>
            ) : (
              <Image
                alt={`Portada de ${item.title}`}
                h={240}
                src={item.posterUrl}
              />
            )}
          </Card.Section>

          <Stack gap="xs" mt="md">
            <Text fw={700}>{item.title}</Text>
            <Group gap="xs">
              <Badge variant="light">
                {item.mediaType === 'movie' ? 'Película' : 'Serie'}
              </Badge>
              <Text c="dimmed" size="sm">
                {item.releaseLabel}
              </Text>
              {item.isLogged ? (
                <Badge color="green">En biblioteca</Badge>
              ) : null}
            </Group>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  )
}
