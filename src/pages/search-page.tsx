import {
  Alert,
  Button,
  Container,
  Group,
  Loader,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useState, type FormEvent } from 'react'

import { toMediaSearchCardModel } from '../adapters/media-search-item-to-card-model'
import { AppHeader } from '../components/app-header'
import { MediaSearchResults } from '../components/media-search-results'
import { useMediaSearch } from '../hooks/features/use-media'
import type { SearchMediaInput } from '../types/media-api'
import type { MediaType } from '../types/media-item'

export function SearchPage() {
  const [draftQuery, setDraftQuery] = useState('')
  const [draftMediaType, setDraftMediaType] =
    useState<MediaType>('movie')
  const [submittedSearch, setSubmittedSearch] =
    useState<SearchMediaInput | null>(null)

  const mediaSearch = useMediaSearch(submittedSearch)
  const items = (mediaSearch.data ?? []).map(toMediaSearchCardModel)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = draftQuery.trim()

    if (query.length < 2) {
      return
    }

    setSubmittedSearch({
      query,
      mediaType: draftMediaType,
    })
  }

  function renderSearchContent() {
    if (submittedSearch === null) {
      return <Text>Escribe un título y confirma la búsqueda.</Text>
    }

    if (mediaSearch.isLoading) {
      return <Loader aria-label="Buscando títulos" />
    }

    if (mediaSearch.isError) {
      const message =
        mediaSearch.error instanceof Error
          ? mediaSearch.error.message
          : 'No se pudo completar la búsqueda.'

      return <Alert color="red">{message}</Alert>
    }

    if (items.length === 0) {
      return <Text>No encontramos resultados para esta búsqueda.</Text>
    }

    return <MediaSearchResults items={items} />
  }

  return (
    <>
      <AppHeader />

      <Container component="main" py="xl" size="md">
        <Stack gap="xl">
          <div>
            <Title order={2}>Busca en el catálogo remoto</Title>
            <Text c="dimmed">
              Confirma un título y un tipo para consultar la API.
            </Text>
          </div>

          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                label="Título"
                minLength={2}
                onChange={(event) =>
                  setDraftQuery(event.currentTarget.value)
                }
                placeholder="Dune"
                value={draftQuery}
              />

              <Select
                allowDeselect={false}
                data={[
                  { label: 'Película', value: 'movie' },
                  { label: 'Serie', value: 'series' },
                ]}
                label="Tipo"
                onChange={(value) => {
                  if (value === 'movie' || value === 'series') {
                    setDraftMediaType(value)
                  }
                }}
                value={draftMediaType}
              />

              <Group justify="flex-end">
                <Button
                  disabled={draftQuery.trim().length < 2}
                  type="submit"
                >
                  Buscar
                </Button>
              </Group>
            </Stack>
          </form>

          {mediaSearch.isFetching && !mediaSearch.isLoading ? (
            <Text size="sm">Actualizando resultados…</Text>
          ) : null}

          {renderSearchContent()}
        </Stack>
      </Container>
    </>
  )
}
