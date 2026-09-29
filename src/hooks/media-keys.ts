import type { SearchMediaInput } from '../types/media-api'

export const mediaKeys = {
  all: ['media'] as const,
  searches: () => [...mediaKeys.all, 'search'] as const,
  search: (input: SearchMediaInput) =>
    [
      ...mediaKeys.searches(),
      {
        query: input.query.trim(),
        mediaType: input.mediaType,
      },
    ] as const,
}
