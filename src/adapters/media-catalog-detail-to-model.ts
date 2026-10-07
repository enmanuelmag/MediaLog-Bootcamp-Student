import type { MediaCatalogDetailDto } from '../types/media-api'
import type { MediaDetailModel } from '../types/media-detail-model'

export function mediaCatalogDetailToModel(
  catalog: MediaCatalogDetailDto,
): MediaDetailModel {
  const releaseLabel =
    catalog.releaseYear === null
      ? 'Fecha desconocida'
      : String(catalog.releaseYear)

  return {
    mediaType: catalog.mediaType,
    title: catalog.title,
    description: catalog.description,
    posterUrl: catalog.coverUrl,
    releaseLabel,
    genres: catalog.genres,
    durationMinutes: catalog.durationMinutes,
    episodesCount: catalog.episodesCount,
    seasonsCount: catalog.seasonsCount,
    reviewScore: catalog.reviewScore,
  }
}
