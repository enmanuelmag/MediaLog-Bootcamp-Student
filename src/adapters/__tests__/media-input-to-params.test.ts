import { describe, expect, it } from 'vitest'

import { toMediaDetailSearchParams } from '../media-input-to-params'

describe('toMediaDetailSearchParams', () => {
  it('conserva la identidad de una película', () => {
    const params = toMediaDetailSearchParams({
      externalId: '438631',
      mediaType: 'movie',
    })

    expect(params.toString()).toBe('externalId=438631&mediaType=movie')
  })

  it('conserva la identidad de una serie', () => {
    const params = toMediaDetailSearchParams({
      externalId: '1399',
      mediaType: 'series',
    })

    expect(params.toString()).toBe('externalId=1399&mediaType=series')
  })
})
