import type { MediaType } from './media-item'

export type MediaSearchCardModel = {
  key: string
  externalId: string
  mediaType: MediaType
  title: string
  releaseLabel: string
  posterUrl: string | null
  isLogged: boolean
}
