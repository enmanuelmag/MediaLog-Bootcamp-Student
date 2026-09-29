# Guía estudiantil · Sesión 09 · React Router declarativo

## Objetivo

Construirás navegación pública sobre la búsqueda remota de la sesión 08. Al terminar, una tarjeta producirá una URL de detalle provisional, el árbol compartirá un layout y los parámetros se convertirán en un input válido o `null`.

## Una imagen mental antes del código

Piensa en una URL como una dirección y en React Router como el mapa que decide qué pantalla abrir. En `/media/movie/438631`, `media` es una parte fija y `movie` y `438631` son datos de esa dirección. `Outlet` es el espacio reservado en una estructura compartida donde aparece la página hija.

La forma de la dirección no valida su significado. `/media/anime/438631` encaja en el patrón, pero `anime` no pertenece a `MediaType`; por eso el adapter devuelve `null`.

## Lo que ya debe funcionar

Abre el checkpoint completo de la sesión 08 y confirma:

- una búsqueda enviada ejecuta `useMediaSearch()`;
- la interfaz muestra carga, error, vacío o resultados;
- cada resultado conserva `mediaType` y `externalId`;
- no existe modal remoto ni navegación desde la tarjeta;
- `GetMediaDetailInput` existe en `src/types/media-api.ts`;
- `pnpm test` y `pnpm build` terminan con código 0.

Detente si el checkpoint no cumple esas condiciones. No reconstruyas la sesión 08 mientras añades Router.

## Resultado final

```text
main.tsx
└── QueryClientProvider
    └── MantineProvider
        └── BrowserRouter
            └── App
                └── PublicLayout
                    ├── AppHeader
                    └── Outlet
                        ├── SearchPage
                        ├── MediaDetailPage
                        └── NotFoundPage
```

Rutas del checkpoint:

| URL | Página |
| --- | --- |
| `/` | Redirige a `/search` |
| `/search` | Búsqueda remota |
| `/media/:mediaType/:externalId` | Detalle provisional |
| Cualquier otra | Página no encontrada |

## 1. Comprueba el entorno

Ejecuta:

```bash
node --version
pnpm --version
pnpm test
pnpm build
```

Registra los códigos de salida. La sesión usa Node `>=22.22.0`, pnpm y React `19.2.8`.

## 2. Instala React Router

Ejecuta la versión fijada:

```bash
pnpm add react-router@8.3.1
```

No instales `react-router-dom`. Este curso importa las APIs desde `react-router` y usa Declarative Mode.

## 3. Coloca `BrowserRouter`

Abre `src/main.tsx` y añade:

```tsx
import { BrowserRouter } from "react-router"
```

Conserva los providers existentes. Envuelve `App`:

```tsx
<QueryClientProvider client={queryClient}>
  <MantineProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

Comprueba la pantalla antes de continuar. No muevas `QueryClient` dentro de un componente.

**Checkpoint:** la búsqueda anterior sigue visible bajo `BrowserRouter`.

## 4. Extrae `SearchPage`

Crea:

```text
src/pages/search-page.tsx
```

Mueve allí el contenido actual de `App`:

- imports de React y Mantine de la pantalla;
- estados `draftQuery`, `draftMediaType` y `submittedSearch`;
- llamada a `useMediaSearch()`;
- adaptación a `MediaSearchCardModel[]`;
- handler del submit;
- representación de estados remotos;
- JSX del contenedor.

La función debe llamarse:

```tsx
export function SearchPage() {
  // contenido que antes vivía en App
}
```

No cambies query keys, fetchers, textos, condiciones ni estados mientras mueves el código.

Reduce temporalmente `src/App.tsx`:

```tsx
import { SearchPage } from "./pages/search-page"

export default function App() {
  return <SearchPage />
}
```

Prueba una búsqueda válida.

**Checkpoint:** la extracción no cambió el comportamiento de la sesión 08.

## 5. Crea el layout público

Crea `src/layouts/public-layout.tsx`:

```tsx
import { Outlet } from "react-router"

import { AppHeader } from "../components/app-header"

export function PublicLayout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}
```

`PublicLayout` comparte el encabezado. `Outlet` marca la región donde aparecerá la página hija.

Completa estas frases:

```text
PublicLayout es responsable de:
Outlet es responsable de:
```

No importes `SearchPage` dentro del layout. El árbol de rutas elegirá la hija.

## 6. Prepara páginas de ruta

Crea `src/pages/not-found-page.tsx`:

```tsx
import { Anchor, Container, Stack, Text, Title } from "@mantine/core"
import { Link } from "react-router"

export function NotFoundPage() {
  return (
    <Container py="xl" size="sm">
      <Stack>
        <Title order={1}>Página no encontrada</Title>
        <Text>La URL no coincide con una página pública.</Text>
        <Anchor component={Link} to="/search">
          Volver a la búsqueda
        </Anchor>
      </Stack>
    </Container>
  )
}
```

Crea una primera versión de `src/pages/media-detail-page.tsx`:

```tsx
export function MediaDetailPage() {
  return <h1>Detalle provisional</h1>
}
```

Esta versión permite cerrar el árbol antes de trabajar con parámetros.

## 7. Declara las rutas

Reemplaza `src/App.tsx`:

```tsx
import { Navigate, Route, Routes } from "react-router"

import { PublicLayout } from "./layouts/public-layout"
import { MediaDetailPage } from "./pages/media-detail-page"
import { NotFoundPage } from "./pages/not-found-page"
import { SearchPage } from "./pages/search-page"

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Navigate replace to="/search" />} />
        <Route path="search" element={<SearchPage />} />
        <Route
          path="media/:mediaType/:externalId"
          element={<MediaDetailPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
```

Visita:

```text
/
/search
/media/movie/123
/media/movie
/ruta-inexistente
```

Registra qué elemento aparece en cada caso.

`index` representa la hija que coincide con la URL de la ruta padre. `replace` evita conservar `/` como una entrada redundante antes de `/search`.

**Checkpoint:** la URL selecciona búsqueda, detalle provisional o Not found.

## 8. Define el contrato de validación

`useParams()` entregará strings posiblemente ausentes. Antes de programar, completa la matriz:

| Parámetros | Resultado esperado |
| --- | --- |
| `{ mediaType: "movie", externalId: "123" }` | Input movie con `123` |
| `{ mediaType: "series", externalId: "456" }` | Input series con `456` |
| `{ mediaType: "anime", externalId: "123" }` | `null` |
| `{ mediaType: "movie" }` | `null` |
| `{ externalId: "123" }` | `null` |

Explica a tu pareja:

```text
No puedo usar "as MediaType" porque...
```

## 9. Crea el adapter puro

Crea `src/adapters/media-detail-route-params-to-input.ts`:

```ts
import type { GetMediaDetailInput } from "../types/media-api"

export type MediaDetailRouteParams = Readonly<{
  externalId?: string
  mediaType?: string
}>

export function toMediaDetailInput(
  params: MediaDetailRouteParams,
): GetMediaDetailInput | null {
  if (params.mediaType !== "movie" && params.mediaType !== "series") {
    return null
  }

  if (params.externalId === undefined) {
    return null
  }

  return {
    externalId: params.externalId,
    mediaType: params.mediaType,
  }
}
```

El adapter valida en runtime y reutiliza `GetMediaDetailInput`. No declara otra unión `MediaType`.

## 10. Lee los parámetros en la página

Completa `src/pages/media-detail-page.tsx`:

```tsx
import { Anchor, Container, Stack, Text, Title } from "@mantine/core"
import { Link, useParams } from "react-router"

import { toMediaDetailInput } from "../adapters/media-detail-route-params-to-input"

export function MediaDetailPage() {
  const detailInput = toMediaDetailInput(useParams())

  if (detailInput === null) {
    return (
      <Container py="xl" size="sm">
        <Stack>
          <Title order={1}>URL de detalle no válida</Title>
          <Text>Revisa el tipo y el identificador del medio.</Text>
          <Anchor component={Link} to="/search">
            Volver a la búsqueda
          </Anchor>
        </Stack>
      </Container>
    )
  }

  return (
    <Container py="xl" size="sm">
      <Stack>
        <Title order={1}>Detalle provisional</Title>
        <Text>Tipo: {detailInput.mediaType}</Text>
        <Text>Identificador: {detailInput.externalId}</Text>
        <Anchor component={Link} to="/search">
          Volver a la búsqueda
        </Anchor>
      </Stack>
    </Container>
  )
}
```

Prueba:

| URL | Resultado esperado |
| --- | --- |
| `/media/movie/123` | Input movie visible |
| `/media/series/456` | Input series visible |
| `/media/anime/123` | URL de detalle no válida |
| `/media/movie` | Página no encontrada |

El tercer caso coincide con la ruta, pero falla la validación. El cuarto no coincide porque falta un segmento.

No llames `getMediaDetail()` ni crees `useMediaDetail()`.

## 11. Enlaza los resultados

Abre `src/components/media-search-results.tsx`.

Añade `Button` a los imports de Mantine e importa `Link`:

```tsx
import { Link } from "react-router"
```

Dentro de cada tarjeta agrega:

```tsx
<Button
  component={Link}
  to={`/media/${item.mediaType}/${item.externalId}`}
  variant="light"
>
  Ver detalle
</Button>
```

No añadas estado, `onSelect`, modal, `window.location` ni `useNavigate`.

Comprueba:

1. Ejecuta una búsqueda.
2. Abre un resultado con click normal.
3. Usa Atrás.
4. Usa Adelante.
5. Abre `Ver detalle` en otra pestaña.
6. Copia la URL y compara sus valores con el item.

**Checkpoint:** una tarjeta produce una URL de detalle que conserva `mediaType + externalId`.

## 12. Delega solo los tests

Ya definiste y escribiste el comportamiento. Puedes pedir a un agente que redacte el archivo repetitivo de tests.

Sigue la rutina conocida:

1. Consulta documentación con Context7 solo si está disponible y necesitas confirmar Vitest.
2. Revisa las skills disponibles y `skills-lock.json`.
3. Usa AutoSkills en `--dry-run` solo si falta una skill pertinente.
4. Limita el archivo con Agent Harness Kit.
5. Lee el resultado completo y ejecuta la evidencia.

Prompt listo para copiar:

```text
Usa la skill ahk-test para crear y ejecutar los tests unitarios del adapter puro toMediaDetailInput.

Matriz acordada:
- la implementación vive en src/adapters/media-detail-route-params-to-input.ts
- movie con externalId devuelve el mismo GetMediaDetailInput
- series con externalId devuelve el mismo GetMediaDetailInput
- mediaType distinto de movie o series devuelve null
- externalId ausente devuelve null
- mediaType ausente devuelve null

Alcance:
- crear únicamente src/adapters/__tests__/media-detail-route-params-to-input.test.ts
- no modificar el adapter ni ningún otro archivo
- no cambiar package.json, scripts, dependencias o configuración
- no añadir React Testing Library, jsdom, mocks de Router ni tests de componentes
- no crear helpers o snapshots

Ejecuta pnpm test. Si un import o contrato no coincide, detente antes de escribir. Entrega matriz, archivo modificado, resultado con exit status y frontera de evidencia.
```

Revisa el alcance:

```bash
git diff -- src/adapters/__tests__/media-detail-route-params-to-input.test.ts
git status --short
```

Lee cada test y relaciónalo con una fila de la matriz. Después ejecuta:

```bash
pnpm test
```

Un archivo generado que no leíste y no ejecutaste no cuenta como evidencia.

### Fallback manual

Si el agente no está disponible, crea el test manualmente con Vitest. Cubre exactamente las cinco filas de la matriz. No añadas DOM, Router simulado o snapshots.

## 13. Ejecuta la comprobación final

Ejecuta:

```bash
pnpm test
pnpm build
```

Si el docente inicia preview, visita una URL de detalle y recarga:

```bash
pnpm preview
```

Esta comprobación observa el servidor local. No demuestra que un hosting de producción reenvíe una solicitud directa hacia `index.html`.

## Evidencia de entrega

Entrega en el medio indicado:

- captura o demostración de `/search` con un resultado;
- captura o demostración de una URL válida de detalle provisional;
- captura o demostración de `/media/anime/123` rechazada;
- salida de `pnpm test` con código 0;
- salida de `pnpm build` con código 0;
- una frase que explique la diferencia entre `Outlet` y la ruta `*`.

No entregues `.env.local`, tokens, responses completas del backend ni `node_modules`.

## Frontera de la evidencia

| Evidencia | Demuestra | No demuestra |
| --- | --- | --- |
| Test del adapter | Traducción de cinco combinaciones de params | Router, DOM o historial |
| Navegación manual | Click, URL e historial observados localmente | Ausencia de otros errores |
| `pnpm build` | TypeScript y generación terminan | Backend o hosting disponible |
| Preview local | Comportamiento del servidor local | Fallback de producción |

## Errores que debes poder diagnosticar

- Si aparece el layout pero no la página, revisa `Outlet`.
- Si `/media/movie` muestra Not found, revisa el patrón: falta `externalId`.
- Si `/media/anime/123` muestra un detalle, revisa el adapter.
- Si el encabezado aparece dos veces, deja `AppHeader` solo en `PublicLayout`.
- Si la búsqueda dejó de funcionar, vuelve al checkpoint de extracción anterior al árbol de rutas.
- Si el agente tocó otro archivo, detén la aceptación y revisa el alcance.
- Si una recarga de producción devuelve 404, falta configuración de fallback SPA; no lo resuelvas con un Effect.

## Vocabulario de salida

- **Router:** relaciona ubicación, historial y elementos.
- **Layout route:** comparte estructura con rutas hijas.
- **`Outlet`:** región de la ruta padre donde aparece la hija.
- **Segmento dinámico:** captura texto desde una posición de la URL.
- **Route params:** valores externos leídos desde esos segmentos.
- **`Link`:** destino navegable declarado en JSX.
- **`Navigate`:** redirección declarativa.
- **Wildcard:** coincidencia de respaldo para paths sin otra ruta.
- **Deep link:** URL que apunta directamente a una pantalla interna.

## Checklist final

- [ ] Instalé `react-router@8.3.1` con pnpm.
- [ ] `BrowserRouter` envuelve `App`.
- [ ] `SearchPage` conserva la búsqueda remota.
- [ ] `PublicLayout` contiene un solo `AppHeader` y `Outlet`.
- [ ] `/` redirige con `replace`.
- [ ] Las tarjetas usan `Link`.
- [ ] Los params pasan por `toMediaDetailInput()`.
- [ ] No dupliqué `MediaType` ni usé assertions.
- [ ] No añadí fetching de detalle.
- [ ] Leí los tests generados.
- [ ] `pnpm test` terminó en 0.
- [ ] `pnpm build` terminó en 0.

## Próxima dependencia

La sesión 10 usará el `GetMediaDetailInput | null` de esta página para construir la query remota, representar sus estados y sincronizar `document.title` mediante un Effect con cleanup. No adelantes esa implementación.


## Ruta ejecutable y referencia autosuficiente

Esta es la secuencia real de ramas del proyecto progresivo:

`session-09-start` → `session-09-step-01-browser-router` → `session-09-step-02-search-page` → `session-09-step-03-public-routes` → `session-09-step-04-route-params` → `session-09-end`

La rama `session-09-end` es el checkpoint completo. Cada rama intermedia compila y permite retomar la demostración desde una transformación concreta. Los archivos que no aparecen aquí se conservan sin cambios desde la sesión anterior.

Ejecuta la instalación de esta sesión exactamente así:

```bash
pnpm add --save-exact react-router@8.3.1
```

El lockfile lo genera pnpm. No lo escribas a mano. A continuación están **completos** todos los archivos que el docente o el estudiante debe crear o reemplazar durante la sesión; no hace falta abrir el repositorio de referencia en otra ventana.

### `package.json` · archivo completo

```json
{
  "name": "medialog-bootcamp",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "packageManager": "pnpm@11.17.0",
  "engines": {
    "node": ">=22.22.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "test": "vitest run",
    "preview": "vite preview"
  },
  "dependencies": {
    "@mantine/core": "9.4.1",
    "@mantine/hooks": "9.4.1",
    "@tanstack/react-query": "5.102.8",
    "@tanstack/react-query-devtools": "5.102.8",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-router": "8.3.1"
  },
  "devDependencies": {
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "oxlint": "^1.79.0",
    "postcss": "8.5.26",
    "postcss-preset-mantine": "1.18.0",
    "postcss-simple-vars": "7.0.1",
    "typescript": "6.0.3",
    "vite": "8.2.2",
    "vitest": "4.1.11"
  }
}
```

### `src/main.tsx` · archivo completo

```tsx
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
```

### `src/App.tsx` · archivo completo

```tsx
import { Navigate, Route, Routes } from 'react-router'

import { PublicLayout } from './layouts/public-layout'
import { MediaDetailPage } from './pages/media-detail-page'
import { NotFoundPage } from './pages/not-found-page'
import { SearchPage } from './pages/search-page'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Navigate replace to="/search" />} />
        <Route path="search" element={<SearchPage />} />
        <Route
          path="media/:mediaType/:externalId"
          element={<MediaDetailPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
```

### `src/layouts/public-layout.tsx` · archivo completo

```tsx
import { Outlet } from 'react-router'

import { AppHeader } from '../components/app-header'

export function PublicLayout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}
```

### `src/pages/search-page.tsx` · archivo completo

```tsx
import {
  Alert,
  Button,
  Container,
  Group,
  Loader,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useState, type FormEvent } from 'react'

import { toMediaSearchCardModel } from '../adapters/media-search-item-to-card-model'
import { MediaSearchResults } from '../components/media-search-results'
import { useMediaSearch } from '../hooks/features/use-media'
import type { SearchMediaInput } from '../types/media-api'
import type { MediaType } from '../types/media-item'

export function SearchPage() {
  const [draftQuery, setDraftQuery] = useState('')
  const [draftMediaType, setDraftMediaType] =
    useState<MediaType>('movie')
  const [submittedSearch, setSubmittedSearch] =
    useState<SearchMediaInput | null>(null)

  const mediaSearch = useMediaSearch(submittedSearch)
  const items = (mediaSearch.data ?? []).map(toMediaSearchCardModel)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = draftQuery.trim()

    if (query.length < 2) {
      return
    }

    setSubmittedSearch({
      query,
      mediaType: draftMediaType,
    })
  }

  function renderSearchContent() {
    if (submittedSearch === null) {
      return <Text>Escribe un título y confirma la búsqueda.</Text>
    }

    if (mediaSearch.isLoading) {
      return <Loader aria-label="Buscando títulos" />
    }

    if (mediaSearch.isError) {
      const message =
        mediaSearch.error instanceof Error
          ? mediaSearch.error.message
          : 'No se pudo completar la búsqueda.'

      return <Alert color="red">{message}</Alert>
    }

    if (items.length === 0) {
      return <Text>No encontramos resultados para esta búsqueda.</Text>
    }

    return <MediaSearchResults items={items} />
  }

  return (
      <Container py="xl" size="md">
        <Stack gap="xl">
          <div>
            <Title order={2}>Busca en el catálogo remoto</Title>
            <Text c="dimmed">
              Confirma un título y un tipo para consultar la API.
            </Text>
          </div>

          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                label="Título"
                minLength={2}
                onChange={(event) =>
                  setDraftQuery(event.currentTarget.value)
                }
                placeholder="Dune"
                value={draftQuery}
              />

              <Select
                allowDeselect={false}
                data={[
                  { label: 'Película', value: 'movie' },
                  { label: 'Serie', value: 'series' },
                ]}
                label="Tipo"
                onChange={(value) => {
                  if (value === 'movie' || value === 'series') {
                    setDraftMediaType(value)
                  }
                }}
                value={draftMediaType}
              />

              <Group justify="flex-end">
                <Button
                  disabled={draftQuery.trim().length < 2}
                  type="submit"
                >
                  Buscar
                </Button>
              </Group>
            </Stack>
          </form>

          {mediaSearch.isFetching && !mediaSearch.isLoading ? (
            <Text size="sm">Actualizando resultados…</Text>
          ) : null}

          {renderSearchContent()}
        </Stack>
      </Container>
  )
}
```

### `src/pages/media-detail-page.tsx` · archivo completo

```tsx
import { Anchor, Code, Container, Stack, Text, Title } from '@mantine/core'
import { Link, useParams } from 'react-router'

import { toMediaDetailInput } from '../adapters/media-detail-route-params-to-input'

export function MediaDetailPage() {
  const detailInput = toMediaDetailInput(useParams())

  if (detailInput === null) {
    return (
      <Container py="xl" size="sm">
        <Stack>
          <Title order={1}>URL de detalle no válida</Title>
          <Text>Revisa el tipo y el identificador del medio.</Text>
          <Anchor component={Link} to="/search">
            Volver a la búsqueda
          </Anchor>
        </Stack>
      </Container>
    )
  }

  return (
    <Container py="xl" size="sm">
      <Stack>
        <Title order={1}>Detalle provisional</Title>
        <Text>
          La ruta ya produjo un input válido. La próxima sesión consultará el
          detalle remoto.
        </Text>
        <Code block>
          {JSON.stringify(detailInput, null, 2)}
        </Code>
        <Anchor component={Link} to="/search">
          Volver a la búsqueda
        </Anchor>
      </Stack>
    </Container>
  )
}
```

### `src/pages/not-found-page.tsx` · archivo completo

```tsx
import { Anchor, Container, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <Container py="xl" size="sm">
      <Stack>
        <Title order={1}>Página no encontrada</Title>
        <Text>La URL no coincide con una página pública.</Text>
        <Anchor component={Link} to="/search">
          Volver a la búsqueda
        </Anchor>
      </Stack>
    </Container>
  )
}
```

### `src/adapters/media-detail-route-params-to-input.ts` · archivo completo

```ts
import type { GetMediaDetailInput } from '../types/media-api'

export type MediaDetailRouteParams = Readonly<{
  externalId?: string
  mediaType?: string
}>

export function toMediaDetailInput(
  params: MediaDetailRouteParams,
): GetMediaDetailInput | null {
  if (params.mediaType !== 'movie' && params.mediaType !== 'series') {
    return null
  }

  if (params.externalId === undefined || params.externalId.length === 0) {
    return null
  }

  return {
    externalId: params.externalId,
    mediaType: params.mediaType,
  }
}
```

### `src/components/media-search-results.tsx` · archivo completo

```tsx
import {
  Anchor,
  Badge,
  Box,
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core'
import { Link } from 'react-router'

import type { MediaSearchCardModel } from '../types/media-search-card-model'

type MediaSearchResultsProps = {
  items: MediaSearchCardModel[]
}

export function MediaSearchResults(props: MediaSearchResultsProps) {
  const { items } = props

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
      {items.map((item) => (
        <Card key={item.key} padding="lg" radius="md" withBorder>
          <Card.Section>
            {item.posterUrl === null ? (
              <Box
                aria-label={`Sin portada para ${item.title}`}
                bg="gray.9"
                h={240}
              >
                <Text pt="xl" ta="center">
                  Sin portada
                </Text>
              </Box>
            ) : (
              <Image
                alt={`Portada de ${item.title}`}
                h={240}
                src={item.posterUrl}
              />
            )}
          </Card.Section>

          <Stack gap="xs" mt="md">
            <Text fw={700}>{item.title}</Text>
            <Group gap="xs">
              <Badge variant="light">
                {item.mediaType === 'movie' ? 'Película' : 'Serie'}
              </Badge>
              <Text c="dimmed" size="sm">
                {item.releaseLabel}
              </Text>
              {item.isLogged ? (
                <Badge color="green">En biblioteca</Badge>
              ) : null}
            </Group>
            <Anchor
              component={Link}
              to={`/media/${item.mediaType}/${item.externalId}`}
            >
              Ver detalle
            </Anchor>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  )
}
```

### `src/adapters/__tests__/media-detail-route-params-to-input.test.ts` · archivo completo

```ts
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
```

### Comprobación del checkpoint

```bash
pnpm test
pnpm build
pnpm lint
```

Lee la salida completa. Un código de salida 0 comprueba tests, tipos, generación y lint del estado local; no demuestra por sí solo que el backend publicado esté disponible ni que la navegación se haya probado en un navegador.
