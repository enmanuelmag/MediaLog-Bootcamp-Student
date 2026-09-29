# Guía estudiantil · Sesión 07 · HTTP, DTOs, agentes y primer test

## Meta

La interfaz mantiene el checkpoint 06: modal de Mantine y catálogo con HTML/CSS propios. Hoy no se migran controles ni tarjetas; la adopción más amplia acompaña la búsqueda remota de 08.

Crear una frontera HTTP tipada para buscar y consultar detalles de Medialog. Al terminar tendrás dos fetchers, un helper común, un adapter puro y dos tests. La interfaz local seguirá funcionando y todavía no mostrará las responses remotas.

## Una imagen mental antes del código

Imagina un restaurante. Tu navegador hace de cliente, el **request** es la comanda, el servidor es la cocina y la **response** es lo que la cocina devuelve junto con un estado. Un DTO es el formato acordado de la comanda: si el campo se llama `mediaType`, ambos lados deben respetar ese nombre. Una `Promise` se parece al número de turno: representa un resultado que llegará después.

La comparación tiene un límite: `fetch` transporta datos. Además, un status `404` o `500` sí es una response HTTP; perder la conexión antes de recibirla es un error de red distinto.

## Antes de comenzar

Tu proyecto debe corresponder al checkpoint de la sesión 06:

- Búsqueda y filtro local funcionan.
- El contador, la limpieza y los vacíos siguen visibles.
- Cada tarjeta abre el modal del medio seleccionado.
- `MediaGrid` recibe `items={visibleMedia}`.
- `MediaType` y `MediaItem` viven en `src/types/media-item.ts`.
- Mantine está configurado.

Comprueba:

1. Buscar `bear` muestra `The Bear`.
2. Filtrar por película y serie cambia la colección.
3. Abrir y cerrar un detalle local funciona.
4. Buscar `Dune` no encuentra resultados porque no pertenece al fixture.

Si el checkpoint no funciona, registra la diferencia antes de añadir HTTP.

## Mapa de responsabilidades

```text
src/types/media-api.ts
  describe la parte del contrato que usa el frontend

src/adapters/media-input-to-params.ts
  traduce identidad tipada a query string

src/api/media.ts
  decide endpoint, método, body y tipo de retorno

src/api/http.ts
  ejecuta fetch, comprueba status y lee JSON

TanStack Query
  comienza en la sesión 08
```

No guardes responses en `useState`, Zustand o `localStorage`. No uses `useEffect` para ejecutar los fetchers.

## Contrato de la sesión

### Búsqueda

```text
POST /api/v2/media/search
Content-Type: application/json

{
  "query": "Dune",
  "mediaType": "movie"
}
```

| Type | Campos |
| --- | --- |
| `SearchMediaInput` | `query: string`, `mediaType: MediaType` |
| `MediaSearchItemDto` | `externalId`, `title`, `releaseYear`, `coverUrl`, `mediaType`, `isLogged` |

### Detalle

```text
GET /api/v2/media/detail?externalId=438631&mediaType=movie
```

| Type | Responsabilidad |
| --- | --- |
| `GetMediaDetailInput` | `externalId: string`, `mediaType: MediaType` |
| `MediaCatalogDetailDto` | Datos públicos del catálogo |
| `UserMediaDataDto` | Registro personal nullable |
| `MediaDetailDto` | `catalog`, `entry`, `isLogged` |

Conserva las formas del transporte. `MediaSearchItemDto` no es `MediaItem`: usa identidad externa, `coverUrl`, `releaseYear` y no contiene `description`.

## Rutina con herramientas asistidas

Sigue este orden:

```text
consultar documentación en Context7
→ revisar skills disponibles
→ usar AutoSkills solo si falta una skill pertinente
→ ejecutar la tarea con límites del harness
→ abrir los archivos y leer el cambio
→ ejecutar evidencia y explicar su frontera
```

Responsabilidades:

- Context7 recupera documentación vigente.
- Una skill conserva instrucciones para una tarea.
- AutoSkills propone skills a partir del repositorio.
- Agent Harness Kit organiza límites, roles y evidencia.
- Tú decides el contrato, lees el código y ejecutas las comprobaciones.

Una salida generada no cuenta como evidencia ejecutada.

## Paso 1 · Instalar e inicializar Agent Harness Kit

El CLI y el proyecto tienen alcances distintos:

```text
CLI global: permite ejecutar ahk desde la terminal
Harness local: materializa configuración, instrucciones, roles y skills en este proyecto
```

Comprueba el runtime e instala la versión fijada. `npm` se usa solo para este CLI global; las dependencias de Medialog continúan con pnpm:

```bash
node --version
npm --version
npm install --global @cardor/agent-harness-kit@2.11.0
command -v ahk
ahk --version
```

Node debe cumplir `>=22.22.0` y `ahk --version` debe mostrar `2.11.0`. En PowerShell usa `Get-Command ahk`. Si la terminal no encuentra el binario, registra la salida de `npm prefix -g`, confirma qué Node está activo, vuelve a abrir la terminal y repite las comprobaciones. No uses `sudo` ni instales AHK dentro del proyecto.

Desde la raíz de Medialog ejecuta:

```bash
ahk init
```

Usa estas respuestas:

| Pregunta | Respuesta |
| --- | --- |
| Project name | `medialog-bootcamp` |
| Short description | `React frontend for exploring movies and series` |
| AI provider y modelos | Los indicados por el docente |
| Docs folder path | `docs` |
| Storage scope | `Local` |
| Add your first task now? | `No` |

Abre la configuración, las instrucciones del provider, la carpeta de agentes, `health.sh` y las skills `ahk-ask` y `ahk-test`. Explica con tus palabras qué límite aporta cada pieza.

El `health.sh` inicial todavía no conoce los checks de Medialog. Reemplázalo por:

```bash
#!/usr/bin/env bash
set -euo pipefail

pnpm build
```

Comprueba:

```bash
ahk doctor
ahk health
```

`ahk doctor` revisa la configuración y la materialización. `ahk health` ejecuta el build escrito en `health.sh`; no prueba la API ni el navegador.

## Paso 2 · Consultar y explorar sin editar

Define primero:

```text
Librería: Vitest
Versión: 4.1.11
Concepto: test, expect y ejecución finita con vitest run
```

En Context7, resuelve el identificador de Vitest y consulta ese concepto. Si el servicio no responde, usa la documentación oficial indicada por el docente y registra el fallback.

Revisa las skills disponibles. Abre `ahk-ask` y confirma que su tarea es de solo lectura.

AutoSkills se previsualiza con:

```bash
pnpm dlx autoskills@0.3.6 --dry-run
```

No ejecutes la instalación sin aprobación docente. Antes de instalar una propuesta tendrías que revisar procedencia, archivos y `SKILL.md`. AutoSkills no se añade a las dependencias del frontend.

Usa el prompt de exploración:

```text
Usa la skill ahk-ask para responder esta pregunta de solo lectura:

En este proyecto React con TypeScript, localiza dónde se definen y exportan MediaType y MediaItem, cómo se organizan los types y adapters existentes y qué imports relativos debería usar un nuevo archivo src/types/media-api.ts.

No crees tareas, no modifiques archivos y no propongas todavía la implementación. Devuelve únicamente:
1. archivos relevantes;
2. convenciones encontradas;
3. riesgos de duplicar MediaType o cambiar sus values;
4. evidencia textual de que el archivo canónico es src/types/media-item.ts.

Si encuentras más de una definición de MediaType o una ruta distinta, detente y reporta la contradicción.
```

Comprobación:

- Abre cada archivo citado.
- Confirma `src/types/media-item.ts`.
- Confirma que `MediaType` admite solo `"movie" | "series"`.
- Confirma que la interacción no produjo un diff.

La exploración no demuestra que el código compile; el build ejecutado por `ahk health` sí comprueba el checkpoint inicial contra TypeScript y Vite.

## Paso 3 · Cerrar la tabla de fields

Antes de pedir código, copia esta tabla y marca cada fila como revisada:

| Type | Campo | Tipo |
| --- | --- | --- |
| `SearchMediaInput` | `query` | `string` |
| `SearchMediaInput` | `mediaType` | `MediaType` |
| `MediaSearchItemDto` | `externalId` | `string` |
| `MediaSearchItemDto` | `title` | `string` |
| `MediaSearchItemDto` | `releaseYear` | `number` |
| `MediaSearchItemDto` | `coverUrl` | `string | null` |
| `MediaSearchItemDto` | `mediaType` | `MediaType` |
| `MediaSearchItemDto` | `isLogged` | `boolean` |
| `GetMediaDetailInput` | `externalId` | `string` |
| `GetMediaDetailInput` | `mediaType` | `MediaType` |
| `MediaDetailDto` | `catalog` | `MediaCatalogDetailDto | null` |
| `MediaDetailDto` | `entry` | `UserMediaDataDto | null` |
| `MediaDetailDto` | `isLogged` | `boolean` |

El contrato docente completa los campos de catálogo, status, prioridad y entrada personal. No cambies nombres ni nulabilidad para que el código parezca más parecido al fixture.

## Paso 4 · Delegar types y adapter

El docente entrega el prompt completo. Antes de ejecutarlo, confirma que solo permite:

```text
src/types/media-api.ts
src/adapters/media-input-to-params.ts
```

El adapter debe producir el equivalente a:

```ts
export function toMediaDetailSearchParams(
  input: GetMediaDetailInput,
): URLSearchParams {
  return new URLSearchParams({
    externalId: input.externalId,
    mediaType: input.mediaType,
  })
}
```

Después de la generación:

1. Abre `media-api.ts`.
2. Confirma que importa `MediaType` desde `./media-item`.
3. Elige tres campos y contrástalos con la tabla.
4. Explica por qué `catalog` y `entry` son nullable.
5. Confirma que ningún DTO extiende o usa `MediaItem`.
6. Abre el adapter y confirma que no llama `fetch`.
7. Revisa el listado de archivos cambiados.

Ejecuta:

```bash
pnpm build
```

Registra comando, exit status y error exacto si falla. Un build verde no valida el JSON del backend.

## Paso 5 · Implementar searchMedia con el docente

Crea `src/api/media.ts`. La firma es:

```ts
export async function searchMedia(
  input: SearchMediaInput,
): Promise<MediaSearchItemDto[]>
```

La implementación debe:

1. Leer `import.meta.env.VITE_API_URL`.
2. Construir `/api/v2/media/search`.
3. Usar método `POST`.
4. Enviar `Content-Type: application/json`.
5. Serializar `input` con `JSON.stringify`.
6. Consultar `response.ok`.
7. Lanzar `Error` con el status cuando la response no es exitosa.
8. Leer el JSON y devolverlo con el tipo esperado.

Referencia del request:

```ts
const response = await fetch(`${API_URL}/api/v2/media/search`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(input),
})
```

Detente y explica:

- qué valor recibe `input`;
- qué representa `Promise<MediaSearchItemDto[]>`;
- por qué `404` exige revisar `response.ok`;
- por qué el cast final no valida runtime.

No extraigas todavía un helper.

## Paso 6 · Completar getMediaDetail

Importa el adapter y los types. La firma es:

```ts
export async function getMediaDetail(
  input: GetMediaDetailInput,
): Promise<MediaDetailDto>
```

Completa:

1. Construcción de `URLSearchParams` mediante el adapter.
2. URL con `/api/v2/media/detail?`.
3. Request GET sin body.
4. Comprobación de `response.ok`.
5. Error con status.
6. Lectura del JSON.

Ejecuta `pnpm build`. Los dos fetchers deben compilar antes de abstraer.

Después marca la repetición:

```text
fetch
response.ok
response.status
response.json()
```

Método, ruta, body y parámetros no forman parte de esa repetición común.

## Paso 7 · Extraer requestJson

Usa el prompt de refactor entregado por el docente. Solo puede:

- crear `src/api/http.ts`;
- modificar `src/api/media.ts`.

`requestJson<T>()` debe conservar esta forma:

```ts
export async function requestJson<T>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, init)

  if (!response.ok) {
    throw new Error(`La API respondió con status ${response.status}`)
  }

  return (await response.json()) as T
}
```

Después del cambio, sigue ambos recorridos:

```text
searchMedia
→ decide POST, headers y body
→ requestJson<MediaSearchItemDto[]>

getMediaDetail
→ decide parámetros y URL
→ requestJson<MediaDetailDto>
```

Comprueba:

- Las firmas públicas no cambiaron.
- El helper no conoce endpoints.
- `T` expresa el tipo esperado y no valida JSON.
- Solo cambiaron los dos archivos permitidos.

Ejecuta `pnpm build` y registra el resultado.

## Paso 8 · Definir la matriz del primer test

Instala Vitest y crea un script que termine después de ejecutar la suite:

```bash
pnpm add -D vitest@4.1.11
pnpm pkg set scripts.test="vitest run"
```

Abre `package.json`. Confirma que Vitest aparece en `devDependencies` y que `test` ejecuta `vitest run`.

Escribe la matriz antes de generar el archivo:

| Caso | Input | Resultado esperado |
| --- | --- | --- |
| Película | `438631`, `movie` | Conserva ambos values |
| Serie | `1399`, `series` | Conserva ambos values |

El test no necesita backend, navegador ni mocks. Su unidad es el adapter puro.

Invoca `ahk-test` con el prompt entregado por el docente. La skill solo puede crear:

```text
src/adapters/__tests__/media-input-to-params.test.ts
```

No permitas cambios en producción, configuración o dependencias.

Después:

1. Abre el archivo completo.
2. Ubica input, llamada al adapter y expectativas.
3. Confirma que no existen snapshots, mocks, `.only`, `.skip` o `.todo`.
4. Ejecuta:

```bash
pnpm exec vitest run src/adapters/__tests__/media-input-to-params.test.ts
```

Registra exit status. Vitest demuestra los dos comportamientos del adapter. No demuestra `fetch` ni backend.

Actualiza `health.sh` para incluir la suite ahora que Vitest y el script existen:

```bash
#!/usr/bin/env bash
set -euo pipefail

pnpm test
pnpm build
```

## Paso 9 · Comprobar Network con código temporal

Usa el `ApiProbe` preparado por el docente. Debe ejecutar desde un handler:

```text
searchMedia({ query: "Dune", mediaType: "movie" })
→ obtener el primer resultado
→ getMediaDetail({ externalId, mediaType })
```

No agregues `useState` ni `useEffect`.

Abre Network antes del click y completa:

| Request | Método observado | URL observada | Payload observado | Status observado |
| --- | --- | --- | --- | --- |
| Búsqueda | | | | |
| Detalle | | | | |

Revisa además la forma del body de cada response.

Después elimina:

- `ApiProbe`;
- su import;
- su render;
- logs temporales.

Busca el nombre del componente para confirmar que no quedó una referencia.

## Paso 10 · Regresión y evidencia final

Ejecuta:

```bash
pnpm exec vitest run src/adapters/__tests__/media-input-to-params.test.ts
ahk health
```

Prueba en navegador:

- búsqueda y filtro local;
- contador y limpieza;
- apertura y cierre del modal local;
- ausencia de `ApiProbe`.

Completa:

| Evidencia | Resultado | Qué demuestra | Qué no demuestra |
| --- | --- | --- | --- |
| `ahk doctor` | | | |
| Vitest | | | |
| `ahk health` | | | |
| Network | | | |
| Regresión local | | | |

## Checkpoint final

- [ ] El explorador local permanece funcional.
- [ ] `MediaType` solo se define en `media-item.ts`.
- [ ] `media-api.ts` conserva nombres, tipos y nulabilidad.
- [ ] El adapter solo construye parámetros.
- [ ] `searchMedia()` conserva el POST y body JSON.
- [ ] `getMediaDetail()` conserva el GET y query string.
- [ ] `requestJson<T>()` contiene solo la mecánica compartida.
- [ ] Los dos tests pasan.
- [ ] `ahk doctor` reconoce configuración y skills.
- [ ] `ahk health` ejecuta test y build.
- [ ] Network mostró los dos requests.
- [ ] `ApiProbe` fue retirado.
- [ ] El build pasa.
- [ ] Puedes explicar qué decidiste, delegaste, leíste y verificaste.

## Comandos de la sesión

```bash
npm install --global @cardor/agent-harness-kit@2.11.0
command -v ahk
ahk --version
ahk init
ahk doctor
ahk health
pnpm dlx autoskills@0.3.6 --dry-run
pnpm add -D vitest@4.1.11
pnpm pkg set scripts.test="vitest run"
pnpm exec vitest run src/adapters/__tests__/media-input-to-params.test.ts
pnpm test
pnpm build
```

Usa npm únicamente para la instalación global de AHK. Dentro del proyecto, usa pnpm y conserva `pnpm-lock.yaml`; no crees `package-lock.json`. No ejecutes AutoSkills sin `--dry-run` salvo aprobación docente después de revisar una propuesta concreta.

## Vocabulario

- **Endpoint:** método y ruta de una operación HTTP.
- **Request:** solicitud del cliente.
- **Response:** respuesta con status, headers y body.
- **Promise:** representación de un resultado futuro.
- **DTO:** forma que cruza la frontera HTTP.
- **Adapter:** transformación entre representaciones.
- **Fetcher:** función que solicita un endpoint concreto.
- **Runtime:** ejecución real de JavaScript.
- **Harness:** estructura de límites, tareas y evidencia.
- **Skill:** instrucciones reutilizables para una tarea.
- **Frontera de evidencia:** límite de lo que una comprobación permite afirmar.

## Fuera de alcance

No añadas:

- TanStack Query o query keys.
- Resultados remotos dentro de componentes.
- `useEffect` para fetching.
- `MediaSearchCardModel`.
- Router o filtros URL.
- Autenticación.
- Zod para validar el JSON.
- `HttpError`, retry, timeout o cancelación.
- React Testing Library, jsdom o MSW.
- Cambios de backend.

La siguiente sesión usará `searchMedia()` con TanStack Query y representará estados inicial, carga, error, vacío, éxito y caché.


## Ruta ejecutable y referencia autosuficiente

Esta es la secuencia real de ramas del proyecto progresivo:

`session-07-start` → `session-07-step-01-contracts` → `session-07-step-02-fetchers` → `session-07-step-03-request-json` → `session-07-step-04-first-test` → `session-07-end`

La rama `session-07-end` es el checkpoint completo. Cada rama intermedia compila y permite retomar la demostración desde una transformación concreta. Los archivos que no aparecen aquí se conservan sin cambios desde la sesión anterior.

Ejecuta la instalación de esta sesión exactamente así:

```bash
pnpm add --save-dev --save-exact vitest@4.1.11
```

El lockfile lo genera pnpm. No lo escribas a mano. A continuación están **completos** todos los archivos que el docente o el estudiante debe crear o reemplazar durante la sesión; no hace falta abrir el repositorio de referencia en otra ventana.

### `.env.example` · archivo completo

```dotenv
VITE_API_URL=https://bootcamp-medialog.cardor.dev
```

La variable contiene solo la base, sin slash final y sin `/api`. Cada función de `src/api/media.ts` agrega la ruta de su endpoint.

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

### `src/types/media-api.ts` · archivo completo

```ts
import type { MediaType } from './media-item'

export type SearchMediaInput = {
  query: string
  mediaType: MediaType
}

export type MediaSearchItemDto = {
  externalId: string
  title: string
  releaseYear: number
  coverUrl: string | null
  mediaType: MediaType
  isLogged: boolean
}

export type GetMediaDetailInput = {
  externalId: string
  mediaType: MediaType
}

export type MediaCatalogDetailDto = {
  externalId: number
  mediaType: MediaType
  title: string
  description: string | null
  coverUrl: string | null
  releaseYear: number | null
  releaseMonth: number | null
  releaseDay: number | null
  durationMinutes: number | null
  episodesCount: number | null
  seasonsCount: number | null
  genres: string[]
  reviewScore: number | null
}

export const MEDIA_STATUS_VALUES = [
  'pending',
  'acquired',
  'watching',
  'seen',
  'dropped',
  'paused',
] as const

export type MediaStatus = (typeof MEDIA_STATUS_VALUES)[number]

export const MEDIA_PRIORITY_VALUES = ['low', 'medium', 'high'] as const

export type MediaPriority = (typeof MEDIA_PRIORITY_VALUES)[number]

export type UserMediaDataDto = {
  id: string
  title: string
  status: MediaStatus
  priority: MediaPriority
  notes: string | null
}

export type MediaDetailDto = {
  catalog: MediaCatalogDetailDto | null
  entry: UserMediaDataDto | null
  isLogged: boolean
}
```

### `src/adapters/media-input-to-params.ts` · archivo completo

```ts
import type { GetMediaDetailInput } from '../types/media-api'

export function toMediaDetailSearchParams(
  input: GetMediaDetailInput,
): URLSearchParams {
  return new URLSearchParams({
    externalId: input.externalId,
    mediaType: input.mediaType,
  })
}
```

### `src/api/http.ts` · archivo completo

```ts
const API_URL = import.meta.env.VITE_API_URL

export async function requestJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(`La API respondió con status ${response.status}`)
  }

  return (await response.json()) as T
}
```

### `src/api/media.ts` · archivo completo

```ts
import { toMediaDetailSearchParams } from '../adapters/media-input-to-params'
import type {
  GetMediaDetailInput,
  MediaDetailDto,
  MediaSearchItemDto,
  SearchMediaInput,
} from '../types/media-api'
import { requestJson } from './http'

export async function searchMedia(
  input: SearchMediaInput,
): Promise<MediaSearchItemDto[]> {
  return requestJson<MediaSearchItemDto[]>('/api/v2/media/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

}

export async function getMediaDetail(
  input: GetMediaDetailInput,
): Promise<MediaDetailDto> {
  const params = toMediaDetailSearchParams(input)
  return requestJson<MediaDetailDto>(
    `/api/v2/media/detail?${params.toString()}`,
  )
}
```

### `src/adapters/__tests__/media-input-to-params.test.ts` · archivo completo

```ts
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
```

### Comprobación del checkpoint

```bash
pnpm test
pnpm build
pnpm lint
```

Lee la salida completa. Un código de salida 0 comprueba tests, tipos, generación y lint del estado local; no demuestra por sí solo que el backend publicado esté disponible ni que la navegación se haya probado en un navegador.
