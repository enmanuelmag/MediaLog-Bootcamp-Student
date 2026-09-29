import { describe, expect, it } from 'vitest'

import { toMediaDetailInput } from '../media-detail-route-params-to-input'

describe('toMediaDetailInput', () => {
  it('construye el input de una película', () => {
    expect(
      toMediaDetailInput({ mediaType: 'movie', externalId: '438631' }),
    ).toEqual({ mediaType: 'movie', externalId: '438631' })
  })

  it('construye el input de una serie', () => {
    expect(
      toMediaDetailInput({ mediaType: 'series', externalId: '1399' }),
    ).toEqual({ mediaType: 'series', externalId: '1399' })
  })

  it('rechaza un tipo que no pertenece al dominio', () => {
    expect(
      toMediaDetailInput({ mediaType: 'anime', externalId: '438631' }),
    ).toBeNull()
  })

  it('rechaza una ruta sin identificador', () => {
    expect(toMediaDetailInput({ mediaType: 'movie' })).toBeNull()
  })

  it('rechaza una ruta sin tipo', () => {
    expect(toMediaDetailInput({ externalId: '438631' })).toBeNull()
  })
})
