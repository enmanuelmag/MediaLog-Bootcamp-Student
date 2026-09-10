import { Modal } from '@mantine/core'
import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { EmptyState } from './components/empty-state'
import { MediaDetailContent } from './components/media-detail-content'
import { MediaGrid } from './components/media-grid'
import {
  MediaTypeFilter,
  type MediaTypeFilterValue,
} from './components/media-type-filter'
import { SearchInput } from './components/search-input'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')
  const [mediaTypeFilter, setMediaTypeFilter] =
    useState<MediaTypeFilterValue>('all')

  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null)

  const selectedMedia =
    mediaItems.find((media) => media.id === selectedMediaId) ?? null
  const isDetailOpened = selectedMedia !== null

  function handleSelectMedia(mediaId: number) {
    setSelectedMediaId(mediaId)
  }

  function handleCloseDetail() {
    setSelectedMediaId(null)
  }

  const normalizedQuery = query.trim().toLowerCase()
  const visibleMedia = mediaItems.filter((media) => {
    const matchesQuery = media.title.toLowerCase().includes(normalizedQuery)
    const matchesType =
      mediaTypeFilter === 'all' || media.mediaType === mediaTypeFilter

    return matchesQuery && matchesType
  })

  const hasActiveFilters =
    normalizedQuery.length > 0 || mediaTypeFilter !== 'all'

  const hasNoResults =
    mediaItems.length > 0 &&
    hasActiveFilters &&
    visibleMedia.length === 0

  const resultCount = visibleMedia.length

  function handleClearFilters() {
    setQuery('')
    setMediaTypeFilter('all')
  }

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <SearchInput value={query} onQueryChange={setQuery} />
        <MediaTypeFilter
          value={mediaTypeFilter}
          onFilterChange={setMediaTypeFilter}
        />
        <div className="filter-summary">
          <p>Mostrando {resultCount} de {mediaItems.length}</p>
          <button
            type="button"
            onClick={handleClearFilters}
            disabled={!hasActiveFilters}
          >
            Limpiar filtros
          </button>
        </div>
        {hasNoResults ? (
          <EmptyState
            title="Sin resultados"
            description="No encontramos medios que coincidan con tus filtros."
          />
        ) : (
          <MediaGrid items={visibleMedia} onSelect={handleSelectMedia} />
        )}
      </main>
      <Modal
        opened={isDetailOpened}
        onClose={handleCloseDetail}
        title={selectedMedia?.title ?? 'Detalle'}
        closeButtonProps={{ 'aria-label': 'Cerrar detalle' }}
        centered
      >
        {selectedMedia !== null ? (
          <MediaDetailContent media={selectedMedia} />
        ) : null}
      </Modal>
    </>
  )
}

export default App
