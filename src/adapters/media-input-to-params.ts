import type { GetMediaDetailInput } from '../types/media-api'

export function toMediaDetailSearchParams(
  input: GetMediaDetailInput,
): URLSearchParams {
  return new URLSearchParams({
    externalId: input.externalId,
    mediaType: input.mediaType,
  })
}
