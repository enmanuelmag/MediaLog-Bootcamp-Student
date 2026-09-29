import { toMediaDetailSearchParams } from '../adapters/media-input-to-params'
import type {
  GetMediaDetailInput,
  MediaDetailDto,
  MediaSearchItemDto,
  SearchMediaInput,
} from '../types/media-api'

const API_URL = import.meta.env.VITE_API_URL

export async function searchMedia(
  input: SearchMediaInput,
): Promise<MediaSearchItemDto[]> {
  const response = await fetch(`${API_URL}/api/v2/media/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(`La API respondió con status ${response.status}`)
  }

  return (await response.json()) as MediaSearchItemDto[]
}

export async function getMediaDetail(
  input: GetMediaDetailInput,
): Promise<MediaDetailDto> {
  const params = toMediaDetailSearchParams(input)
  const response = await fetch(
    `${API_URL}/api/v2/media/detail?${params.toString()}`,
  )

  if (!response.ok) {
    throw new Error(`La API respondió con status ${response.status}`)
  }

  return (await response.json()) as MediaDetailDto
}
