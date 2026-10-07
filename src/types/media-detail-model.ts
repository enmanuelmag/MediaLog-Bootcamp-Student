import type { MediaType } from './media-item'

export type MediaDetailModel = Readonly<{
  mediaType: MediaType
  title: string
  description: string | null
  posterUrl: string | null
  releaseLabel: string
  genres: string[]
  durationMinutes: number | null
  episodesCount: number | null
  seasonsCount: number | null
  reviewScore: number | null
}>
