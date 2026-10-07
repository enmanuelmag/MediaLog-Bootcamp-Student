import { mediaCatalogDetailToModel } from '../adapters/media-catalog-detail-to-model'
import type { MediaCatalogDetailDto } from '../types/media-api'

// Datos locales de demostración; no son una respuesta del servidor.
export const demoCatalog: MediaCatalogDetailDto = {
  externalId: 438631,
  mediaType: 'movie',
  title: 'Dune · demostración',
  description: 'Una familia llega al planeta del que depende un imperio.',
  coverUrl: null,
  releaseYear: 2021,
  releaseMonth: null,
  releaseDay: null,
  durationMinutes: 155,
  episodesCount: null,
  seasonsCount: null,
  genres: ['Ciencia ficción', 'Aventura'],
  reviewScore: 8,
}

export const demoMediaDetail = mediaCatalogDetailToModel(demoCatalog)
