import { describe, expect, it } from 'vitest'

import type { MediaCatalogDetailDto } from '../../types/media-api'
import { mediaCatalogDetailToModel } from '../media-catalog-detail-to-model'

const movie: MediaCatalogDetailDto = {
  externalId: 438631,
  mediaType: 'movie',
  title: 'Dune',
  description: 'Una familia llega a Arrakis.',
  coverUrl: 'https://example.test/dune.jpg',
  releaseYear: 2021,
  releaseMonth: null,
  releaseDay: null,
  durationMinutes: 155,
  episodesCount: null,
  seasonsCount: null,
  genres: ['Ciencia ficción', 'Aventura'],
  reviewScore: 8,
}

describe('mediaCatalogDetailToModel', () => {
  it('presenta una película sin inventar campos de serie', () => {
    const model = mediaCatalogDetailToModel(movie)

    expect(model).toMatchObject({
      mediaType: 'movie',
      title: 'Dune',
      description: 'Una familia llega a Arrakis.',
      releaseLabel: '2021',
      durationMinutes: 155,
      episodesCount: null,
      seasonsCount: null,
      reviewScore: 8,
    })
  })

  it('conserva temporadas y episodios de una serie', () => {
    const series: MediaCatalogDetailDto = {
      ...movie,
      mediaType: 'series',
      durationMinutes: null,
      episodesCount: 73,
      seasonsCount: 8,
    }

    expect(mediaCatalogDetailToModel(series)).toMatchObject({
      mediaType: 'series',
      durationMinutes: null,
      episodesCount: 73,
      seasonsCount: 8,
    })
  })

  it('explica que una fecha nula es desconocida', () => {
    const catalog = { ...movie, releaseYear: null }

    expect(mediaCatalogDetailToModel(catalog).releaseLabel).toBe('Fecha desconocida')
  })

  it('expone la portada con el nombre que consume la UI', () => {
    expect(mediaCatalogDetailToModel(movie).posterUrl).toBe(movie.coverUrl)
  })

  it('conserva los nulls y una lista vacía sin inventar datos', () => {
    const catalog: MediaCatalogDetailDto = {
      ...movie,
      description: null,
      coverUrl: null,
      genres: [],
      durationMinutes: null,
      reviewScore: null,
    }

    expect(mediaCatalogDetailToModel(catalog)).toMatchObject({
      description: null,
      posterUrl: null,
      genres: [],
      durationMinutes: null,
      reviewScore: null,
    })
  })

  it('conserva el orden de los géneros sin modificar el catálogo', () => {
    const catalog = structuredClone(movie)
    const before = structuredClone(catalog)
    Object.freeze(catalog.genres)
    Object.freeze(catalog)

    const model = mediaCatalogDetailToModel(catalog)

    expect(model.genres).toEqual(['Ciencia ficción', 'Aventura'])
    expect(catalog).toEqual(before)
    expect(model).not.toBe(catalog)
  })
})
