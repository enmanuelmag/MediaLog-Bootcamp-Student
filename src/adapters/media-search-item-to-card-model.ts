import type { MediaSearchItemDto } from '../types/media-api'
import type { MediaSearchCardModel } from '../types/media-search-card-model'

export function toMediaSearchCardModel(
  dto: MediaSearchItemDto,
): MediaSearchCardModel {
  return {
    key: `${dto.mediaType}:${dto.externalId}`,
    externalId: dto.externalId,
    mediaType: dto.mediaType,
    title: dto.title,
    releaseLabel:
      dto.releaseYear > 0 ? String(dto.releaseYear) : 'Fecha desconocida',
    posterUrl: dto.coverUrl,
    isLogged: dto.isLogged,
  }
}
