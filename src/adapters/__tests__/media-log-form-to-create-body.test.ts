import { describe, expect, it } from 'vitest'

import type { MediaLogFormValues } from '../../schemas/media-log'
import type { GetMediaDetailInput } from '../../types/media-api'
import { toCreateMediaLogBody } from '../media-log-form-to-create-body'

const identity: GetMediaDetailInput = {
  mediaType: 'series',
  externalId: '1399',
}

const values: MediaLogFormValues = {
  status: 'watching',
  priority: 'high',
  notes: '',
}

describe('toCreateMediaLogBody', () => {
  it('conserva el tipo, el ID, el estado y la prioridad elegidos', () => {
    const body = toCreateMediaLogBody(identity, values)

    expect(body).toMatchObject({
      mediaType: 'series',
      externalId: '1399',
      status: 'watching',
      priority: 'high',
    })
  })

  it('indica que el medio procede del catálogo', () => {
    const body = toCreateMediaLogBody(identity, values)

    expect(body.source).toBe('catalog')
  })

  it('convierte las notas vacías en null', () => {
    const body = toCreateMediaLogBody(identity, {
      ...values,
      notes: '',
    })

    expect(body.notes).toBeNull()
  })

  it('convierte las notas compuestas solo por espacios en null', () => {
    const body = toCreateMediaLogBody(identity, {
      ...values,
      notes: '   ',
    })

    expect(body.notes).toBeNull()
  })

  it('recorta los extremos y conserva los espacios del interior', () => {
    const body = toCreateMediaLogBody(identity, {
      ...values,
      notes: '  Ver con  amigos  ',
    })

    expect(body.notes).toBe('Ver con  amigos')
  })
})
