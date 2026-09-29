import type { GetMediaDetailInput } from '../types/media-api'

export type MediaDetailRouteParams = Readonly<{
  externalId?: string
  mediaType?: string
}>

export function toMediaDetailInput(
  params: MediaDetailRouteParams,
): GetMediaDetailInput | null {
  if (params.mediaType !== 'movie' && params.mediaType !== 'series') {
    return null
  }

  if (params.externalId === undefined || params.externalId.length === 0) {
    return null
  }

  return {
    externalId: params.externalId,
    mediaType: params.mediaType,
  }
}
