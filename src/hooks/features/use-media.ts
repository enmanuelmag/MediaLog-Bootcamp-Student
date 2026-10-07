import { useQuery } from '@tanstack/react-query'

import { getMediaDetail, searchMedia } from '../../api/media'
import type { GetMediaDetailInput, SearchMediaInput } from '../../types/media-api'
import { mediaKeys } from '../media-keys'

const emptySearch: SearchMediaInput = {
  query: '',
  mediaType: 'movie',
}

export function useMediaSearch(input: SearchMediaInput | null) {
  const normalizedInput =
    input === null
      ? emptySearch
      : {
          query: input.query.trim(),
          mediaType: input.mediaType,
        }

  return useQuery({
    queryKey: mediaKeys.search(normalizedInput),
    queryFn: () => searchMedia(normalizedInput),
    enabled: input !== null && normalizedInput.query.length >= 2,
  })
}

export function useMediaDetail(input: GetMediaDetailInput | null) {
  return useQuery({
    queryKey: mediaKeys.detail(input),
    queryFn: () => {

      if (input === null) {
        throw new Error('Falta la identidad del medio')
      }

      return getMediaDetail(input)
    },
    enabled: input !== null,
  })
}
