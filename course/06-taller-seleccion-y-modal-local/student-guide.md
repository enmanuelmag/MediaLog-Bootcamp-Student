# Guía estudiantil · Sesión 06 · Selección y modal local

Presencial · 180 minutos. [Lectura previa](pre-class-reading.md) · [Rúbrica](workshop-rubric.md).

## Punto de entrada

MediaLog-Bootcamp en session-06-start: conserva 05 y añade detalle visual/CSS, sin selección ni Mantine. Comprueba filtros y seis medios. Sigue toda la presentación antes de abrir el editor. Guarda cambios antes de consultar ramas.

## Coding después de la presentación

### Paso 1 · Comprobar soporte

Si la copia ya contiene estos archivos, no los dupliques. Si continúas desde 05-end, incorpóralos ahora:

**`src/components/media-detail-content.tsx` · archivo completo:**

```tsx
import type { MediaItem } from '../types/media-item'

import { MediaTypeBadge } from './media-type-badge'

type MediaDetailContentProps = {
  media: MediaItem
}

export function MediaDetailContent(props: MediaDetailContentProps) {
  const { media } = props

  return (
    <article className="media-detail-content">
      {media.posterUrl !== null ? (
        <img src={media.posterUrl} alt="" />
      ) : (
        <p>Poster no disponible</p>
      )}
      <MediaTypeBadge mediaType={media.mediaType} />
      <p>{media.releaseDate}</p>
      <p>{media.description ?? 'Sin descripción disponible'}</p>
    </article>
  )
}
```

**`src/index.css` · archivo completo:**

```css
:root {
  font-family: Inter, system-ui, sans-serif;
  color: #f5f1e8;
  background: #141412;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

.app-header,
.page-container {
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
}

.app-header {
  padding: 64px 0 32px;
  border-bottom: 1px solid #3b3a34;
}

.app-header__eyebrow,
.media-card__meta {
  color: #d2a84a;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-container {
  padding: 32px 0 64px;
}

.media-card {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  padding: 24px;
  border: 1px solid #3b3a34;
  border-radius: 16px;
  background: #1d1d1a;
}

.media-card__poster {
  display: grid;
  min-height: 220px;
  place-items: center;
  border-radius: 10px;
  color: #a9a59a;
  background: #2a2924;
}

@media (max-width: 600px) {
  .media-card {
    grid-template-columns: 1fr;
  }
}
.media-list {
  display: grid;
  gap: 24px;
}
.media-card__poster-image {
  width: 100%;
  height: 220px;
  border-radius: 10px;
  object-fit: cover;
}

.empty-state {
  padding: 48px 24px;
  border: 1px dashed #565349;
  border-radius: 16px;
  text-align: center;
  color: #a9a59a;
}

.empty-state h3 {
  margin-top: 0;
  color: #f5f1e8;
}

.media-type-badge {
  display: inline-flex;
  padding: 2px 8px;
  border: 1px solid currentColor;
  border-radius: 999px;
}

.search-input {
  display: grid;
  gap: 8px;
  margin-bottom: 24px;
}

.search-input input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #565349;
  border-radius: 10px;
  background: #20201b;
  color: #f5f1e8;
  font: inherit;
}

.search-input input:focus-visible {
  outline: 2px solid #d9be74;
  outline-offset: 2px;
}

.media-type-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.media-type-filter button {
  padding: 10px 16px;
  border: 1px solid #565349;
  border-radius: 10px;
  background: #20201b;
  color: #f5f1e8;
  font: inherit;
  cursor: pointer;
}

.media-type-filter button[aria-pressed='true'] {
  border-color: #d9be74;
  background: #d9be74;
  color: #141412;
}

.media-type-filter button:focus-visible {
  outline: 2px solid #d9be74;
  outline-offset: 2px;
}

.filter-summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
}

.filter-summary p {
  margin: 0;
}

.filter-summary button {
  padding: 10px 16px;
  border: 1px solid #565349;
  border-radius: 10px;
  background: #20201b;
  color: #f5f1e8;
  font: inherit;
  cursor: pointer;
}

.filter-summary button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.filter-summary button:focus-visible {
  outline: 2px solid #d9be74;
  outline-offset: 2px;
}

.media-detail-content img {
  display: block;
  width: 160px;
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
  border-radius: 10px;
}

.detail-button {
  padding: 10px 16px;
  border: 1px solid #565349;
  border-radius: 10px;
  background: #20201b;
  color: #f5f1e8;
  font: inherit;
  cursor: pointer;
}

.detail-button:focus-visible {
  outline: 2px solid #d9be74;
  outline-offset: 2px;
}

.selection-preview {
  margin-bottom: 24px;
}
```


### Paso 2 · Instalar y configurar Mantine

```bash
pnpm add --save-exact @mantine/core@9.4.1 @mantine/hooks@9.4.1
pnpm add --save-exact -D postcss@8.5.26 postcss-preset-mantine@1.18.0 postcss-simple-vars@7.0.1
```

**`postcss.config.cjs` · archivo completo:**

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
}
```

**`src/main.tsx` · archivo completo:**

```tsx
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>,
)
```


Conserva export default de App. defaultColorScheme dark mantiene el aspecto inicial del toolkit; no creas theme. Ejecuta pnpm build y pnpm lint. Referencia session-06-step-01-mantine.

### Paso 3 · Comprobar selección sin modal

Sustituye App completo. El diagnóstico y los dos botones son temporales:

**`src/App.tsx` · archivo completo:**

```tsx
import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { EmptyState } from './components/empty-state'
import { MediaGrid } from './components/media-grid'
import {
  MediaTypeFilter,
  type MediaTypeFilterValue,
} from './components/media-type-filter'
import { SearchInput } from './components/search-input'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')
  const [mediaTypeFilter, setMediaTypeFilter] =
    useState<MediaTypeFilterValue>('all')

  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null)

  const selectedMedia =
    mediaItems.find((media) => media.id === selectedMediaId) ?? null
  const isDetailOpened = selectedMedia !== null
  const previewMedia = mediaItems[0] ?? null

  function handleSelectMedia(mediaId: number) {
    setSelectedMediaId(mediaId)
  }

  function handleCloseDetail() {
    setSelectedMediaId(null)
  }

  const normalizedQuery = query.trim().toLowerCase()
  const visibleMedia = mediaItems.filter((media) => {
    const matchesQuery = media.title.toLowerCase().includes(normalizedQuery)
    const matchesType =
      mediaTypeFilter === 'all' || media.mediaType === mediaTypeFilter

    return matchesQuery && matchesType
  })

  const hasActiveFilters =
    normalizedQuery.length > 0 || mediaTypeFilter !== 'all'

  const hasNoResults =
    mediaItems.length > 0 &&
    hasActiveFilters &&
    visibleMedia.length === 0

  const resultCount = visibleMedia.length

  function handleClearFilters() {
    setQuery('')
    setMediaTypeFilter('all')
  }

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <SearchInput value={query} onQueryChange={setQuery} />
        <MediaTypeFilter
          value={mediaTypeFilter}
          onFilterChange={setMediaTypeFilter}
        />
        <div className="filter-summary">
          <p>Mostrando {resultCount} de {mediaItems.length}</p>
          <button
            type="button"
            onClick={handleClearFilters}
            disabled={!hasActiveFilters}
          >
            Limpiar filtros
          </button>
        </div>
        {previewMedia !== null ? (
          <div className="selection-preview">
            <button
              className="detail-button"
              type="button"
              onClick={() => handleSelectMedia(previewMedia.id)}
            >
              Probar detalle
            </button>
          </div>
        ) : null}
        <p>
          Selección: {selectedMedia?.title ?? 'Ninguna'} · Apertura: {String(isDetailOpened)}
        </p>
        <button className="detail-button" type="button" onClick={handleCloseDetail}>
          Limpiar selección
        </button>
        {hasNoResults ? (
          <EmptyState
            title="Sin resultados"
            description="No encontramos medios que coincidan con tus filtros."
          />
        ) : (
          <MediaGrid items={visibleMedia} />
        )}
      </main>
    </>
  )
}

export default App
```


Probar detalle muestra Arrival y true; Limpiar selección muestra Ninguna y false. Explica id recordado frente a objeto/apertura derivados. Referencia session-06-step-02-selection.

### Paso 4 · Conectar el modal temporal

**`src/App.tsx` · archivo completo:**

```tsx
import { Modal } from '@mantine/core'
import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { EmptyState } from './components/empty-state'
import { MediaDetailContent } from './components/media-detail-content'
import { MediaGrid } from './components/media-grid'
import {
  MediaTypeFilter,
  type MediaTypeFilterValue,
} from './components/media-type-filter'
import { SearchInput } from './components/search-input'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')
  const [mediaTypeFilter, setMediaTypeFilter] =
    useState<MediaTypeFilterValue>('all')

  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null)

  const selectedMedia =
    mediaItems.find((media) => media.id === selectedMediaId) ?? null
  const isDetailOpened = selectedMedia !== null
  const previewMedia = mediaItems[0] ?? null

  function handleSelectMedia(mediaId: number) {
    setSelectedMediaId(mediaId)
  }

  function handleCloseDetail() {
    setSelectedMediaId(null)
  }

  const normalizedQuery = query.trim().toLowerCase()
  const visibleMedia = mediaItems.filter((media) => {
    const matchesQuery = media.title.toLowerCase().includes(normalizedQuery)
    const matchesType =
      mediaTypeFilter === 'all' || media.mediaType === mediaTypeFilter

    return matchesQuery && matchesType
  })

  const hasActiveFilters =
    normalizedQuery.length > 0 || mediaTypeFilter !== 'all'

  const hasNoResults =
    mediaItems.length > 0 &&
    hasActiveFilters &&
    visibleMedia.length === 0

  const resultCount = visibleMedia.length

  function handleClearFilters() {
    setQuery('')
    setMediaTypeFilter('all')
  }

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <SearchInput value={query} onQueryChange={setQuery} />
        <MediaTypeFilter
          value={mediaTypeFilter}
          onFilterChange={setMediaTypeFilter}
        />
        <div className="filter-summary">
          <p>Mostrando {resultCount} de {mediaItems.length}</p>
          <button
            type="button"
            onClick={handleClearFilters}
            disabled={!hasActiveFilters}
          >
            Limpiar filtros
          </button>
        </div>
        {previewMedia !== null ? (
          <div className="selection-preview">
            <button
              className="detail-button"
              type="button"
              onClick={() => handleSelectMedia(previewMedia.id)}
            >
              Probar detalle
            </button>
          </div>
        ) : null}
        {hasNoResults ? (
          <EmptyState
            title="Sin resultados"
            description="No encontramos medios que coincidan con tus filtros."
          />
        ) : (
          <MediaGrid items={visibleMedia} />
        )}
      </main>
      <Modal
        opened={isDetailOpened}
        onClose={handleCloseDetail}
        title={selectedMedia?.title ?? 'Detalle'}
        closeButtonProps={{ 'aria-label': 'Cerrar detalle' }}
        centered
      >
        {selectedMedia !== null ? (
          <MediaDetailContent media={selectedMedia} />
        ) : null}
      </Modal>
    </>
  )
}

export default App
```


Se retira el diagnóstico y se conserva el trigger. Prueba cierre superior, Escape, overlay, foco contenido y retorno al trigger. Referencia session-06-step-03-modal-preview, equivalente a session-06-workshop-start.

### Paso 5 · Leer contratos antes del descanso

App define handleSelectMedia; Grid y Card recibirán onSelect con firma (mediaId: number) => void. Pasar una referencia no la ejecuta; una closure permite ejecutar con data.id durante el click. No escribas la llamada directamente como valor de onClick.

## Descanso · 30 minutos

## Taller · 60 minutos

Comienza desde session-06-workshop-start. El modal funciona desde App y las tarjetas todavía no lo abren. La [rúbrica](workshop-rubric.md) contiene encargo, restricciones, matriz y puntuación.

1. Añade la firma requerida a Card sin botón todavía.
2. Añade onSelect a Grid y reenvíala a Card junto a data y key.
3. Conecta handleSelectMedia desde App. Completa los tres archivos antes de build; la edición parcial puede marcar props faltantes.
4. Desestructura onSelect en Card y añade Ver detalle con type="button", clase detail-button y handler que envía data.id.
5. Prueba identidades diferentes y retira previewMedia y Probar detalle.
6. Conserva filtros, contador, limpieza, vacíos y búsqueda desde mediaItems completo.
7. Recorre contenido nulo, poster ausente, tres cierres y foco.
8. Ejecuta pnpm build y pnpm lint y entrega evidencia separada.

Referencias para recuperar después del intento: session-06-step-04-callback-contracts (aún sin botón), session-06-step-05-card-selection (trigger aún presente), session-06-end (final). La solución docente no se incluye en esta guía.

No guardes el objeto ni otro booleano en estado. No pases setters a hijos ni añadas Effects, memo, stores, useDisclosure, API o Router.

## Reto opcional

Después de completar la base, aplica el nombre accesible específico de cada tarjeta y demuéstralo en el árbol de accesibilidad. Reutiliza el concepto explicado antes del descanso. Hasta +10 según la rúbrica.

## Revisión y cierre · 15 minutos

Entrega código, demostración de hasta 90 segundos, resultado de build y explicación del recorrido. React DevTools, navegador y build son evidencias distintas; registra cualquier comprobación ausente.

Si termina el tiempo, guarda bloque, archivo/cambio, primer paso pendiente y evidencia ausente. La siguiente sesión recibe este checkpoint completo; no retires filtros ni modal para continuar.
