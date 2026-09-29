import { useQuery } from '@tanstack/react-query'

import { searchMedia } from '../../api/media'
import type { SearchMediaInput } from '../../types/media-api'
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
