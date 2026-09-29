# Guía estudiantil · Sesión 08 · TanStack Query y búsqueda remota

- **Semana:** 4.
- **Modalidad:** virtual.
- **Duración:** 90 minutos.
- **Lectura previa:** [pre-class-reading.md](pre-class-reading.md).
- **Checkpoint de la sesión:** [session-draft.md](session-draft.md).

## Meta

Al terminar, tu aplicación buscará películas o series en la API mediante TanStack Query. Escribir en el formulario no ejecutará requests; enviar una búsqueda válida creará una identidad de caché y mostrará estados inicial, carga, error, vacío o éxito.

## Una imagen mental antes del código

Piensa en una mesa de estudio dentro de una biblioteca. La API es la biblioteca remota y la caché es la mesa donde conservas temporalmente lo que ya pediste. La **query key** es la signatura completa del material: `Dune + movie` y `Dune + series` no describen el mismo resultado. La **query function** explica cómo pedirlo. `staleTime` indica durante cuánto tiempo la copia se considera suficientemente reciente.

“Stale” no quiere decir “dato falso” y la caché no es almacenamiento permanente. Solo indica que TanStack Query puede necesitar volver a consultar el origen.

## Punto de partida

Necesitas el checkpoint completo de la sesión 07:

- `.env.local` contiene la URL entregada por el docente.
- `src/api/media.ts` exporta `searchMedia()`.
- `src/types/media-api.ts` exporta `SearchMediaInput` y `MediaSearchItemDto`.
- `src/types/media-item.ts` exporta `MediaType`.
- El explorador local y el modal todavía funcionan.
- `pnpm test` y `pnpm build` terminaban correctamente.

No pegues una URL, token o credencial en los archivos de la guía ni en Git.

## Resultado esperado

```text
formulario
  borrador de título y tipo
       ↓ submit
SearchMediaInput confirmado
       ↓
query key + searchMedia()
       ↓
MediaSearchItemDto[] en caché
       ↓ adapter puro
MediaSearchCardModel[]
       ↓
lista visual sin detalle ni navegación
```

## 1. Instala versiones reproducibles

Desde la raíz del proyecto semilla:

```bash
pnpm add @tanstack/react-query@5.102.8
pnpm add @tanstack/react-query-devtools@5.102.8
```

Dentro del proyecto, usa pnpm para estas dependencias; no uses npm o yarn ni instales React Query como paquete global.

## 2. Crea un Query Client estable

Abre `src/main.tsx`. Conserva Mantine, `StrictMode`, los estilos y cualquier tema existente. Agrega Query con esta estructura:

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MantineProvider } from "@mantine/core"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import App from "./App"

import "@mantine/core/styles.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <App />
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
```

El client está fuera del componente y no se crea en cada render.

Comprueba que la aplicación todavía monta:

```bash
pnpm build
```

### Checkpoint 1

- El build termina con código 0.
- Devtools aparece cuando ejecutas la aplicación.
- Todavía no hay una búsqueda remota ejecutada.

## 3. Define la familia de query keys

Crea `src/hooks/media-keys.ts`:

```ts
import type { SearchMediaInput } from "../types/media-api"

export const mediaKeys = {
  all: ["media"] as const,
  searches: () => [...mediaKeys.all, "search"] as const,
  search: (search: SearchMediaInput) =>
    [
      ...mediaKeys.searches(),
      {
        query: search.query.trim(),
        mediaType: search.mediaType,
      },
    ] as const,
}
```

Lee dos resultados posibles:

```text
["media", "search", { query: "Dune", mediaType: "movie" }]
["media", "search", { query: "Dune", mediaType: "series" }]
```

Son entradas distintas porque la función remota depende del texto y del tipo.

No agregues `Date.now()`, un objeto no serializable o valores que no cambien el recurso.

## 4. Crea el hook de búsqueda

Crea `src/hooks/features/use-media.ts`:

Este archivo reúne los hooks de Media, uno por caso de uso. Hoy defines `useMediaSearch`; la pantalla lo llama con sus parámetros y representa la respuesta. Así mantienes una forma consistente de configurar la consulta y puedes reutilizarla sin copiar su lógica en cada componente.

Separar el hook permite probarlo con un entorno propio de Query; también sería posible probar la lógica a través del componente. En esta sesión comprobarás la integración con Devtools y Network, sin instalar herramientas nuevas para probar hooks.

```ts
import { useQuery } from "@tanstack/react-query"

import { searchMedia } from "../../api/media"
import type { SearchMediaInput } from "../../types/media-api"
import { mediaKeys } from "../media-keys"

export function useMediaSearch(search: SearchMediaInput | null) {
  const normalizedSearch: SearchMediaInput = {
    query: search?.query.trim() ?? "",
    mediaType: search?.mediaType ?? "movie",
  }

  return useQuery({
    queryKey: mediaKeys.search(normalizedSearch),
    queryFn: () => searchMedia(normalizedSearch),
    enabled: normalizedSearch.query.length >= 2,
  })
}
```

Antes del primer submit, el texto normalizado está vacío y `enabled` es false. La query no ejecuta `searchMedia()`.

No agregues un Effect. No llames `refetch()` desde el formulario.

### Checkpoint 2

Puedes explicar:

- qué variables usa `queryFn`;
- dónde aparecen esas variables en la key;
- qué condición habilita la consulta;
- por qué `movie` es solo un valor seguro para construir la key deshabilitada inicial.

## 5. Crea el contrato visual

El DTO remoto no es un `MediaItem` local. Crea `src/types/media-search-card-model.ts`:

```ts
import type { MediaType } from "./media-item"

export type MediaSearchCardModel = {
  key: string
  externalId: string
  mediaType: MediaType
  title: string
  releaseLabel: string
  posterUrl: string | null
  isLogged: boolean
}
```

Este modelo conserva la identidad pública para las sesiones siguientes, pero todavía no navega ni abre detalles.

## 6. Traduce el DTO con un adapter puro

Crea `src/adapters/media-search-item-to-card-model.ts`:

```ts
import type { MediaSearchItemDto } from "../types/media-api"
import type { MediaSearchCardModel } from "../types/media-search-card-model"

export function toMediaSearchCardModel(
  dto: MediaSearchItemDto,
): MediaSearchCardModel {
  return {
    key: `${dto.mediaType}:${dto.externalId}`,
    externalId: dto.externalId,
    mediaType: dto.mediaType,
    title: dto.title,
    releaseLabel:
      dto.releaseYear > 0 ? String(dto.releaseYear) : "Fecha desconocida",
    posterUrl: dto.coverUrl,
    isLogged: dto.isLogged,
  }
}
```

Comprueba la transformación:

| DTO | Modelo visual |
| --- | --- |
| `coverUrl` | `posterUrl` |
| `releaseYear: 2021` | `releaseLabel: "2021"` |
| `releaseYear: 0` | `releaseLabel: "Fecha desconocida"` |
| `mediaType + externalId` | `key` estable para React |

No uses `as MediaItem`. Un assertion no renombra campos ni agrega los que faltan.

### Transición visual desde el catálogo local

En 06 usamos Mantine para el modal; en 07 conservamos esa interfaz. Ahora la nueva búsqueda incorpora controles, distribución y feedback del toolkit. El provider y los estilos ya están instalados: no se repite su configuración ni se rediseña el catálogo anterior.

Una primitive es una pieza básica de composición: `Container` limita el ancho, `Stack` distribuye verticalmente y `Group` agrupa horizontalmente. `TextInput`, `Select` y `Button` presentan controles; React conserva borrador y submit, y Query conserva el estado remoto. El elemento HTML `<form>` mantiene la semántica y el envío. `Card` y `Badge` presentan los resultados; `Loader` y `Alert` comunican carga y error. Desde esta sesión, las pantallas nuevas priorizan Mantine cuando ofrece una pieza apropiada, conservando HTML semántico y componentes propios con una responsabilidad útil.

| Necesidad | Herramienta |
| --- | --- |
| Semántica del documento | HTML, como `<form>` y encabezados. |
| Diseño propio de un componente | CSS y `className`, aplicado a su raíz. |
| Estilizar una parte interna de Mantine | `classNames`, mapa de selectores de su Styles API a clases CSS. |
| Distribución habitual | `Container`, `Stack` y `Group`, según los ejemplos de esta guía. |

Por ejemplo, `className="search-field"` identifica la raíz de un `TextInput`; `classNames={{ input: "search-field-input" }}` aplica una clase al input interno. Son alternativas para una necesidad de estilo, no archivos CSS nuevos que debas añadir al checkpoint. HTML/CSS siguen siendo útiles para semántica y personalización.

El `MediaTypeBadge` anterior se conserva con el catálogo local. La nueva lista usa `Badge` para mostrar tipo y pertenencia a biblioteca. No añadimos una migración del wrapper al ejercicio de Query: si luego se reutiliza ese componente de dominio, su implementación visual puede cambiar conservando su contrato.

El fallback manual es material preparado para leer y usar si falla el agente. No requiere otra actividad de maquetación ni resuelve consultas, estados remotos o navegación.

Referencia docente: [Mantine Styles API](https://mantine.dev/styles/styles-api/), consultada el 5 de septiembre de 2026.

## 7. Limita el trabajo del agente

Las decisiones anteriores son humanas: contrato visual, adapter, identidad y alcance. Ahora puedes delegar solamente el componente repetitivo de lista.

Sigue la rutina de la sesión 07:

1. Usa Context7 solo si necesitas confirmar una API de librería y está disponible.
2. Revisa las skills y `skills-lock.json`.
3. Ejecuta AutoSkills solo si falta una skill pertinente.
4. Delimita la tarea con Agent Harness Kit.
5. Lee el código y ejecuta evidencia antes de aceptarlo.

Prompt listo para copiar:

```text
Objetivo: implementar únicamente el componente presentacional de resultados remotos.

Archivo permitido:
- src/components/media-search-results.tsx

Contrato ya decidido:
- exporta MediaSearchResults
- recibe props { items: MediaSearchCardModel[] }
- renderiza una tarjeta por item
- usa item.key como React key
- muestra title, releaseLabel y un label para movie o series
- muestra la portada cuando posterUrl no es null
- muestra un fallback textual accesible cuando posterUrl es null
- puede mostrar un badge si isLogged es true

Cambios prohibidos:
- no modificar ningún otro archivo
- no añadir fetch, useQuery, query keys, Effects ni estado
- no añadir selección, onSelect, botones de detalle, modal o navegación
- no cambiar tipos, dependencias ni estilos globales
- no usar externalId aislado como key

Salida esperada:
- un componente tipado que solo presenta items
- imports compatibles con los componentes Mantine ya instalados
- pnpm build ejecutado al finalizar

Condición de parada:
- detente después de informar el archivo modificado, el resultado de pnpm build y cualquier limitación; no intentes corregir otros archivos.
```

Revisa el alcance:

```bash
git diff -- src/components/media-search-results.tsx
git status --short
```

Después lee todo el archivo. Localiza props, `map`, key, fallback y ausencia de hooks.

### Fallback manual

Si no puedes usar el agente, crea `src/components/media-search-results.tsx` manualmente:

```tsx
import {
  Badge,
  Box,
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core"

import type { MediaSearchCardModel } from "../types/media-search-card-model"

type MediaSearchResultsProps = {
  items: MediaSearchCardModel[]
}

export function MediaSearchResults({
  items,
}: MediaSearchResultsProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
      {items.map((item) => (
        <Card key={item.key} padding="lg" radius="md" withBorder>
          <Card.Section>
            {item.posterUrl === null ? (
              <Box
                aria-label={`Sin portada para ${item.title}`}
                bg="gray.1"
                h={240}
              >
                <Text ta="center" pt="xl">
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
                {item.mediaType === "movie" ? "Película" : "Serie"}
              </Badge>
              <Text c="dimmed" size="sm">
                {item.releaseLabel}
              </Text>
              {item.isLogged ? <Badge color="green">En biblioteca</Badge> : null}
            </Group>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  )
}
```

El fallback es una implementación completa, no una segunda tarea adicional.

## 8. Separa borrador y búsqueda enviada

Abre `src/App.tsx`. La nueva pantalla remota reemplaza los imports activos del fixture y modal, pero no borra esos archivos.

Agrega los imports principales:

```tsx
import { useState, type FormEvent } from "react"
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
} from "@mantine/core"

import { toMediaSearchCardModel } from "./adapters/media-search-item-to-card-model"
import { MediaSearchResults } from "./components/media-search-results"
import { useMediaSearch } from "./hooks/features/use-media"
import type { SearchMediaInput } from "./types/media-api"
import type { MediaType } from "./types/media-item"
```

Dentro de `App` crea estado local:

```tsx
const [draftQuery, setDraftQuery] = useState("")
const [draftMediaType, setDraftMediaType] =
  useState<MediaType>("movie")
const [submittedSearch, setSubmittedSearch] =
  useState<SearchMediaInput | null>(null)

const mediaSearch = useMediaSearch(submittedSearch)

const items = (mediaSearch.data ?? []).map(toMediaSearchCardModel)
```

`items` se deriva en cada render. No crees `setItems`.

Agrega el submit:

```tsx
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
```

### Checkpoint 3

Con Network abierto:

1. Escribe `Dune`.
2. Cambia el tipo.
3. Confirma que todavía no hay request.
4. Envía el formulario.
5. Identifica el request y su key.

Si aparece un request antes del submit, el hook está recibiendo el borrador en vez de `submittedSearch`.

## 9. Representa los cinco estados

Dentro de `App`, antes del `return`, agrega una función local:

```tsx
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
        : "No se pudo completar la búsqueda."

    return <Alert color="red">{message}</Alert>
  }

  if (items.length === 0) {
    return <Text>No encontramos resultados para esta búsqueda.</Text>
  }

  return <MediaSearchResults items={items} />
}
```

Usa `isLoading`, no `isPending`. Antes del submit, la query puede no tener datos y estar pending, pero no está ejecutando una petición.

## 10. Compón la pantalla

El `return` de `App` puede quedar así:

```tsx
return (
  <Container py="xl" size="lg">
    <Stack gap="xl">
      <div>
        <Title order={1}>Explorar catálogo</Title>
        <Text c="dimmed">
          Busca una película o serie en el catálogo remoto.
        </Text>
      </div>

      <form onSubmit={handleSubmit}>
        <Group align="end" grow>
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
              { label: "Película", value: "movie" },
              { label: "Serie", value: "series" },
            ]}
            label="Tipo"
            onChange={(value) => {
              if (value === "movie" || value === "series") {
                setDraftMediaType(value)
              }
            }}
            value={draftMediaType}
          />

          <Button
            disabled={draftQuery.trim().length < 2}
            type="submit"
          >
            Buscar
          </Button>
        </Group>
      </form>

      {mediaSearch.isFetching && !mediaSearch.isLoading ? (
        <Text c="dimmed" size="sm">
          Actualizando resultados…
        </Text>
      ) : null}

      {renderSearchContent()}
    </Stack>
  </Container>
)
```

Si tu checkpoint usa componentes de layout equivalentes, conserva su estilo. No cambies la responsabilidad de cada estado.

### Checkpoint 4

La pantalla debe poder mostrar:

- **Inicial:** antes del submit.
- **Carga:** primera petición activa.
- **Error:** request rechazado o response no exitosa.
- **Vacío:** response exitosa con arreglo vacío.
- **Éxito:** una o más tarjetas.

Las tarjetas no tienen botón, callback, modal ni enlace.

## 11. Observa la caché

Abre Query Devtools y Network:

1. Limpia Network.
2. Busca `Dune` con `movie`.
3. Anota la key y el request.
4. Busca `Dune` con `series`.
5. Confirma otra key y otro request.
6. Regresa a `Dune` con `movie` antes de cinco minutos.
7. Compara la entrada de Devtools con los requests de Network.

En el checkpoint preparado, la primera entrada todavía está fresh. Volver a ella debe reutilizar datos sin confundir película y serie.

No concluyas que “Query nunca vuelve a solicitar”. El resultado depende de frescura, montaje, conectividad y configuración.

## 12. Ejecuta la comprobación final

```bash
pnpm build
```

Registra el código de salida. Si falla, lee el primer error propio del proyecto; no ocultes el problema con casts.

Después revisa:

```bash
git status --short
git diff --check
```

### Evidencia y límite

- `pnpm build`: tipos y generación del bundle.
- Network: requests realmente observados durante esta ejecución.
- Query Devtools: keys, estados y datos presentes en ese Query Client.
- Lectura del diff: alcance de los archivos cambiados.

Estas comprobaciones no demuestran rutas, query de detalle, autenticación, disponibilidad futura del backend ni producción.

## Checklist de salida

- [ ] Instalé Query y Devtools `5.102.8` con pnpm.
- [ ] `QueryClient` se crea fuera de los componentes.
- [ ] La key incluye texto normalizado y tipo.
- [ ] El hook usa `searchMedia()`.
- [ ] La query espera una búsqueda válida.
- [ ] Escribir no solicita datos.
- [ ] El submit cambia `submittedSearch`.
- [ ] Query conserva el DTO.
- [ ] El adapter produce el modelo visual.
- [ ] No copié resultados a estado local.
- [ ] La carga usa `isLoading`.
- [ ] Puedo observar inicio, carga, error, vacío y éxito.
- [ ] Revisé el archivo producido por el agente.
- [ ] Las tarjetas no adelantan detalle o navegación.
- [ ] El build final terminó correctamente.

## Vocabulario

- **Estado remoto:** datos cuyo origen y ciclo de vida dependen de otro sistema.
- **Query:** descripción declarativa de un recurso remoto.
- **Query key:** arreglo serializable que identifica una entrada de caché.
- **Query function:** función que obtiene el recurso asociado a la key.
- **Query Client:** objeto que coordina consultas y caché.
- **Lazy query:** consulta que espera una condición antes de la primera petición.
- **Fresh:** dato que todavía no se considera vencido según `staleTime`.
- **Borrador:** valores que todavía estás editando.
- **Submit:** confirmación que cambia los parámetros enviados.
- **Modelo visual:** forma mínima que necesita un componente para presentar datos.

## Fuera de alcance

No agregues todavía:

- Router, páginas, enlaces o parámetros de URL.
- Query de detalle, selección o modal remoto.
- Zustand, Zod, Firebase, mutaciones o invalidaciones.
- `useEffect`, Suspense, `skipToken` o sincronización con la URL.
- Testing Library, jsdom, MSW o tests del Query Client.

## Siguiente dependencia

La búsqueda remota ya preserva `mediaType + externalId`, pero una tarjeta todavía no tiene una dirección compartible. En la sesión 09, React Router introducirá páginas y URLs. Esa sesión mostrará una página de detalle provisional a partir de parámetros; la petición de detalle llegará en la sesión 10.


## Ruta ejecutable y referencia autosuficiente

Esta es la secuencia real de ramas del proyecto progresivo:

`session-08-start` → `session-08-step-01-query-provider` → `session-08-step-02-query-identity` → `session-08-step-03-submitted-search` → `session-08-step-04-results-adapter` → `session-08-end`

La rama `session-08-end` es el checkpoint completo. Cada rama intermedia compila y permite retomar la demostración desde una transformación concreta. Los archivos que no aparecen aquí se conservan sin cambios desde la sesión anterior.

Ejecuta la instalación de esta sesión exactamente así:

```bash
pnpm add --save-exact @tanstack/react-query@5.102.8 @tanstack/react-query-devtools@5.102.8
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
    "react-dom": "19.2.8"
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
        <App />
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
```

### `src/hooks/media-keys.ts` · archivo completo

```ts
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
```

### `src/hooks/features/use-media.ts` · archivo completo

```ts
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
```

### `src/types/media-search-card-model.ts` · archivo completo

```ts
import type { MediaType } from './media-item'

export type MediaSearchCardModel = {
  key: string
  externalId: string
  mediaType: MediaType
  title: string
  releaseLabel: string
  posterUrl: string | null
  isLogged: boolean
}
```

### `src/adapters/media-search-item-to-card-model.ts` · archivo completo

```ts
import type { MediaSearchItemDto } from '../types/media-api'
import type { MediaSearchCardModel } from '../types/media-search-card-model'

export function toMediaSearchCardModel(
  dto: MediaSearchItemDto,
): MediaSearchCardModel {
  return {
    key: `${dto.mediaType}:${dto.externalId}`,
    externalId: dto.externalId,
    mediaType: dto.mediaType,
    title: dto.title,
    releaseLabel:
      dto.releaseYear > 0 ? String(dto.releaseYear) : 'Fecha desconocida',
    posterUrl: dto.coverUrl,
    isLogged: dto.isLogged,
  }
}
```

### `src/components/media-search-results.tsx` · archivo completo

```tsx
import {
  Badge,
  Box,
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core'

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
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  )
}
```

### `src/App.tsx` · archivo completo

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

import { toMediaSearchCardModel } from './adapters/media-search-item-to-card-model'
import { AppHeader } from './components/app-header'
import { MediaSearchResults } from './components/media-search-results'
import { useMediaSearch } from './hooks/features/use-media'
import type { SearchMediaInput } from './types/media-api'
import type { MediaType } from './types/media-item'

function App() {
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
    <>
      <AppHeader />

      <Container component="main" py="xl" size="md">
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
    </>
  )
}

export default App
```

### Comprobación del checkpoint

```bash
pnpm test
pnpm build
pnpm lint
```

Lee la salida completa. Un código de salida 0 comprueba tests, tipos, generación y lint del estado local; no demuestra por sí solo que el backend publicado esté disponible ni que la navegación se haya probado en un navegador.
