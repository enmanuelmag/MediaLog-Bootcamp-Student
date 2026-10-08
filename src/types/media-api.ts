import type { MediaType } from './media-item'

export type SearchMediaInput = {
  query: string
  mediaType: MediaType
}

export type MediaSearchItemDto = {
  externalId: string
  title: string
  releaseYear: number
  coverUrl: string | null
  mediaType: MediaType
  isLogged: boolean
}

export type GetMediaDetailInput = {
  externalId: string
  mediaType: MediaType
}

export type MediaCatalogDetailDto = {
  externalId: number
  mediaType: MediaType
  title: string
  description: string | null
  coverUrl: string | null
  releaseYear: number | null
  releaseMonth: number | null
  releaseDay: number | null
  durationMinutes: number | null
  episodesCount: number | null
  seasonsCount: number | null
  genres: string[]
  reviewScore: number | null
}

export const MEDIA_STATUS_VALUES = [
  'pending',
  'acquired',
  'watching',
  'seen',
  'dropped',
  'paused',
] as const

export type MediaStatus = (typeof MEDIA_STATUS_VALUES)[number]

export const MEDIA_PRIORITY_VALUES = ['low', 'medium', 'high'] as const

export type MediaPriority = (typeof MEDIA_PRIORITY_VALUES)[number]

export type CreateCatalogMediaLogBody = {
  source: 'catalog'
  mediaType: MediaType
  externalId: string
  status: MediaStatus
  priority: MediaPriority
  notes: string | null
}

export type UserMediaDataDto = {
  id: string
  title: string
  status: MediaStatus
  priority: MediaPriority
  notes: string | null
}

export type MediaDetailDto = {
  catalog: MediaCatalogDetailDto | null
  entry: UserMediaDataDto | null
  isLogged: boolean
}
