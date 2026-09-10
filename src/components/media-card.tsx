import type { MediaItem } from '../types/media-item'
import { MediaTypeBadge } from './media-type-badge'

type MediaCardProps = {
  data: MediaItem
  onSelect: (mediaId: number) => void
}

export function MediaCard(props: MediaCardProps) {
  const { data } = props
  return (
    <article className="media-card">
      {data.posterUrl ? (
        <img
          className="media-card__poster-image"
          src={data.posterUrl}
          alt={`Poster de ${data.title}`}
        />
      ) : (
        <div className="media-card__poster">Poster no disponible</div>
      )}

      <div>
        <p className="media-card__meta">
          <MediaTypeBadge mediaType={data.mediaType} /> · {data.releaseDate}
        </p>
        <h3>{data.title}</h3>
        <p>{data.description ?? 'Sin descripción disponible'}</p>
      </div>
    </article>
  )
}
