import type { MediaItem } from '../types/media-item'
import { EmptyState } from './empty-state'
import { MediaCard } from './media-card'

type MediaGridProps = {
  items: MediaItem[]
  onSelect: (mediaId: number) => void
}

export function MediaGrid(props: MediaGridProps) {
  const { items, onSelect } = props
  if (items.length === 0) {
    return (
      <EmptyState
        title="Catálogo vacío"
        description="No hay películas o series disponibles."
      />
    )
  }

  return (
    <div className="media-list">
      {items.map((media) => (
        <MediaCard key={media.id} data={media} onSelect={onSelect} />
      ))}
    </div>
  )
}
