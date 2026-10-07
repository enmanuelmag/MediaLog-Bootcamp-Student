# Guía estudiantil · Sesión 10 · Taller de detalle público y Effects

## Objetivo

Conectarás la identidad de una URL con una query de detalle, transformarás su DTO en un modelo visual y sincronizarás el título de la pestaña mediante un Effect con cleanup.

- **Duración:** 180 minutos
- **Rúbrica:** [workshop-rubric.md](workshop-rubric.md)

## Ruta de trabajo

Primero sigue la presentación completa (18 minutos). Después empieza el coding guiado (57 minutos), descanso (30), taller (60) y revisión (15): 180 minutos. No hay cambios de código antes de terminar las diapositivas.

En `MediaLog-Bootcamp`, `session-10-start` coincide con `session-09-end`. El respaldo previo al taller es `session-10-workshop-start`: tiene piezas de demostración, no la integración evaluada. `session-10-end` es la referencia resuelta que el docente distribuirá al cerrar. `main` conserva el inicio del curso.

Con el trabajo guardado, en tu copia ejecuta:

```bash
git switch session-10-start
pnpm install --frozen-lockfile
pnpm dev
```

Si falta `.env.local`, copia `.env.example`. Debe usar `VITE_API_URL=https://bootcamp-medialog.cardor.dev`. No sobrescribas una configuración existente sin revisarla.

## Punto de partida

Tu seed conserva el checkpoint de la sesión 09:

- `/search` presenta resultados remotos.
- Cada resultado enlaza a `/media/:mediaType/:externalId`.
- `MediaDetailPage` obtiene params y los valida con `toMediaDetailInput()`.
- El adapter devuelve `GetMediaDetailInput | null`.
- La página muestra la identidad de forma provisional.
- `getMediaDetail()` y los DTO ya existen.
- TanStack Query, Devtools y `mediaKeys` ya están configurados.
- `StrictMode` permanece activo.

Comprueba antes de continuar:

1. Puedes abrir una tarjeta y ver su URL de detalle.
2. Recargar conserva la misma URL.
3. `movie` y `series` producen un input válido.
4. Un tipo desconocido produce el estado provisional inválido.
5. Atrás regresa a búsqueda.

Registra cualquier diferencia antes de añadir la query.

## Una analogía para orientarte

Piensa en una biblioteca: la URL identifica la ficha, Query administra el pedido y las respuestas guardadas, y el adapter prepara los datos para quien lee. El título de la pestaña es el letrero de una sala: al entrar lo cambiamos; al salir devolvemos el anterior. Ese último gesto es el cleanup. El adapter no comprueba un JSON desconocido por sí solo ni inventa información ausente.

## Mapa de responsabilidades

```text
URL y params       → React Router
request y caché    → TanStack Query
DTO hacia modelo   → adapter puro
contenido          → componente presentacional
document.title     → Effect con cleanup
```

No uses `useEffect` para fetching, copiar params, calcular el modelo o responder a un click.

## Después de la presentación · Coding guiado · 57 minutos

### Paso 1 · Añadir la key de detalle

Extiende el objeto `mediaKeys` existente:

```ts
details: () => [...mediaKeys.all, "detail"] as const,
detail: (input: GetMediaDetailInput | null) =>
  [...mediaKeys.details(), input] as const,
```

La respuesta cambia con dos valores:

- `mediaType`;
- `externalId`.

Ambos deben formar parte del input incluido en la key.

Checkpoint: dos identidades diferentes aparecen como entradas diferentes en React Query Devtools.

### Paso 2 · Crear una query dependiente

Añade `useMediaDetail` al archivo existente `src/hooks/features/use-media.ts`.

Conserva `useMediaSearch` y combina los imports existentes. La página usará `import { useMediaDetail } from "../hooks/features/use-media"`; las keys continúan en `src/hooks/media-keys.ts`.

Entrada del hook:

```ts
GetMediaDetailInput | null
```

Usa el mismo `input` nullable que entrega la URL y controla la ejecución con:

```ts
enabled: input !== null
```

La forma esperada es:

```ts
export function useMediaDetail(input: GetMediaDetailInput | null) {
  return useQuery({
    queryKey: mediaKeys.detail(input),
    queryFn: () => {
      if (input === null) {
        throw new Error("Falta la identidad del medio")
      }

      return getMediaDetail(input)
    },
    enabled: input !== null,
  })
}
```

`enabled` evita la petición cuando `input` es `null`. El `if` permite que TypeScript confirme que el fetcher recibe una identidad válida; esa rama no debe ejecutarse mientras la query esté deshabilitada.

Usa por ahora una identidad fija válida para observar la consulta. La integración con params ocurre en el taller.

Recuerda:

| Situación | Interpretación |
| --- | --- |
| `status: pending`, `fetchStatus: idle` | todavía no hay datos ni request activa |
| `isLoading: true` | primera carga activa |

Checkpoint: `null` no dispara `getMediaDetail`; un input válido sí puede hacerlo.

La query también expone `refetch()` para repetir manualmente la request de la identidad actual. No lo uses como mecanismo normal de carga: la actividad extra lo reservará para un botón de reintento después de un error o una respuesta sin catálogo.

### Paso 3 · Definir el modelo visual

Crea `src/types/media-detail-model.ts`:

```ts
import type { MediaType } from "./media-item"

export type MediaDetailModel = Readonly<{
  mediaType: MediaType
  title: string
  description: string | null
  posterUrl: string | null
  releaseLabel: string
  genres: string[]
  durationMinutes: number | null
  episodesCount: number | null
  seasonsCount: number | null
  reviewScore: number | null
}>
```

Este contrato describe la interfaz, no la respuesta HTTP. Por eso usa `posterUrl` aunque el DTO use `coverUrl`.

### Paso 4 · Escribir el adapter

Crea `src/adapters/media-catalog-detail-to-model.ts` y transforma `MediaCatalogDetailDto` en `MediaDetailModel`.

Define primero esta matriz:

| Caso | Resultado que debes preservar |
| --- | --- |
| Película | duración y nulls de serie |
| Serie | temporadas y episodios |
| Año nulo | `Fecha desconocida` |
| Portada | `coverUrl` pasa a `posterUrl` |
| Opcionales | arrays y nulls sin datos inventados |

Reglas:

- no uses casts;
- no conviertas el id numérico del catálogo en identidad de ruta;
- no inventes géneros, score, poster o descripción;
- no mutar arrays;
- calcula el modelo durante el render, no lo guardes en estado.

Checkpoint: puedes explicar qué campo renombras, cuál calculas y cuáles conservas.

### Qué protege esta frontera

El DTO describe la respuesta de la API. El modelo describe lo que necesita la UI. El adapter concentra la traducción entre ambas formas; así el componente no tiene que conocer nombres de transporte ni repetir decisiones de formato. Esto aplica encapsulamiento: una frontera reúne los detalles de una transformación y sus consumidores usan un contrato definido.

| Antes: campo del DTO `catalog` | Después: campo del modelo | Uso visual |
| --- | --- | --- |
| `coverUrl` con una URL o `null` | `posterUrl` con el mismo valor | Portada o fallback. |
| `releaseYear: 2021` | `releaseLabel: "2021"` | Texto de fecha. |
| `releaseYear: null` | `releaseLabel: "Fecha desconocida"` | Texto sin inventar una fecha. |
| `title` | `title`, sin transformación | Título visible. |

No todos los campos cambian: el adapter conserva lo que ya sirve y transforma únicamente las diferencias. Devuelve un objeto nuevo sin modificar el DTO almacenado en Query. No realiza un request ni copia la salida a estado.

Ejemplo hipotético: si la API renombra `coverUrl` a `poster`, habrá que actualizar el DTO —y el schema de esa frontera, si existe— y leer `catalog.poster` dentro del adapter. El modelo puede conservar `posterUrl`, por lo que el componente no necesita cambiar. Los tests del adapter deben reflejar el nuevo contrato. Si la API deja de entregar una portada o cambia su significado, la UI también puede necesitar una decisión; el adapter no fabrica información ausente.

### Paso 5 · Construir contenido aislado

Crea temporalmente un `demoMediaDetail` a partir de un catálogo tipado. Reemplaza `src/components/media-detail-content.tsx`, que existe desde 06 con un contrato antiguo y ya no tiene consumidor en 09, por la versión que recibe `model: MediaDetailModel`. Úsalos para implementar:

```tsx
<MediaDetailContent model={demoMediaDetail} />
```

`MediaDetailContent` debe presentar:

- título y tipo;
- descripción o fallback;
- fecha;
- géneros;
- duración para película;
- temporadas y episodios para serie;
- poster y score solo cuando existan.

No debe importar Router, Query, API o DTO. Solo recibe `MediaDetailModel`.

Checkpoint: puedes renderizar el componente con un objeto fijo, sin Router ni Query. Mantén `MantineProvider`, que suministra los estilos y el tema de sus componentes.

### Paso 6 · Crear el estado visual compartido

Crea `src/components/page-state.tsx`:

```tsx
import { Alert, Button, Loader, Stack, Text } from "@mantine/core"

export type PageStateVariant =
  | "loading"
  | "error"
  | "invalid"
  | "unavailable"

type PageStateProps = Readonly<{
  variant: PageStateVariant
  title?: string
  description?: string
  onRetry?: () => void
}>

const PAGE_STATE_COPY: Record<
  PageStateVariant,
  Readonly<{ title: string; description: string; color: string }>
> = {
  loading: {
    title: "Cargando contenido",
    description: "Espera mientras recuperamos la información.",
    color: "blue",
  },
  error: {
    title: "No pudimos cargar el contenido",
    description: "Intenta nuevamente.",
    color: "red",
  },
  invalid: {
    title: "Dirección no válida",
    description: "Revisa el enlace o vuelve a la página anterior.",
    color: "yellow",
  },
  unavailable: {
    title: "Contenido no disponible",
    description: "No encontramos información para mostrar.",
    color: "gray",
  },
}

export function PageState(props: PageStateProps) {
  const { variant, title, description, onRetry } = props
  const copy = PAGE_STATE_COPY[variant]
  const resolvedTitle = title ?? copy.title
  const resolvedDescription = description ?? copy.description
  const canRetry =
    (variant === "error" || variant === "unavailable") &&
    onRetry !== undefined

  if (variant === "loading") {
    return (
      <Stack align="center" gap="sm" py="xl" role="status">
        <Loader aria-label={resolvedTitle} color={copy.color} />
        <Text fw={600}>{resolvedTitle}</Text>
        <Text c="dimmed" ta="center">
          {resolvedDescription}
        </Text>
      </Stack>
    )
  }

  return (
    <Alert color={copy.color} title={resolvedTitle}>
      <Stack gap="sm">
        <Text>{resolvedDescription}</Text>
        {canRetry ? (
          <Button type="button" onClick={onRetry} variant="light">
            Reintentar
          </Button>
        ) : null}
      </Stack>
    </Alert>
  )
}
```

`variant` elige el copy y la presentación predeterminados. `title` y `description` permiten adaptar el mensaje sin crear otro componente. `onRetry` solo muestra el botón en `error` o `unavailable`; la página conserva la query y entrega el callback.

Renderiza temporalmente las cuatro variantes. Comprueba que `loading` e `invalid` no muestran el botón aunque reciban `onRetry`. Después retira esa demostración temporal.

Checkpoint: el componente importa Mantine, pero no Router, TanStack Query, API ni tipos del dominio.

### Paso 7 · Sincronizar el título

Crea `src/components/media-document-title.tsx`.

Primero prueba temporalmente una versión sin cleanup. Abre el detalle y vuelve a búsqueda. Observa que el título queda residual.

Después corrige:

```tsx
import { useEffect } from "react"

type MediaDocumentTitleProps = Readonly<{
  title: string
}>

export function MediaDocumentTitle(props: MediaDocumentTitleProps) {
  const { title } = props

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${title} | Medialog`

    return () => {
      document.title = previousTitle
    }
  }, [title])

  return null
}
```

El setup recuerda y asigna. El cleanup restaura.

Para observar Strict Mode, puedes añadir logs temporales, limpiar la consola y recargar. En desarrollo es válido observar:

```text
setup → cleanup → setup
```

No retires Strict Mode. Retira los logs antes de entregar.

### Paso 8 · Usar un agente solo para las pruebas

Primero escribe tú el adapter y la matriz. Después puedes invocar `ahk-test`:

```text
Usa la skill ahk-test para crear y ejecutar pruebas Vitest puras de
mediaCatalogDetailToModel con esta matriz:
1. Una película conserva durationMinutes y mantiene episodesCount y
   seasonsCount en null.
2. Una serie conserva seasonsCount y episodesCount.
3. releaseYear null produce "Fecha desconocida".
4. coverUrl se expone como posterUrl.
5. Los arrays y valores null se conservan sin inventar fallbacks.

Alcance único: src/adapters/__tests__/media-catalog-detail-to-model.test.ts.
Producción, rutas, hooks, componentes, dependencias y configuración permanecen
en solo lectura. Usa fixtures mínimos tipados, sin detalles internos ni
snapshots. Ejecuta pnpm exec vitest run sobre ese archivo y entrega matriz,
archivos, exit status y frontera de evidencia.
```

Tu responsabilidad no termina cuando el agente responde:

1. Lee el archivo completo.
2. Revisa el diff.
3. Confirma que ningún otro archivo cambió.
4. Ejecuta:

```bash
pnpm exec vitest run src/adapters/__tests__/media-catalog-detail-to-model.test.ts
```

5. Explica qué no prueba esa suite: Router, Query, DOM, Effect, Strict Mode y build.

## Descanso · 30 minutos

Después del descanso integrarás las piezas ya construidas. No necesitas aprender una API nueva.

## Taller calificable · 60 minutos

Lee la [rúbrica completa](workshop-rubric.md) antes de editar.

### Encargo

Reemplaza el detalle provisional por un flujo completo que use la identidad de la URL, distinga sus estados y restaure el título al salir.

### Parte 1 · Conectar el input real

Retira el input fijo y conserva este orden:

```tsx
const params = useParams()
const detailInput = toMediaDetailInput(params)
const detailQuery = useMediaDetail(detailInput)

if (detailInput === null) {
  return <PageState variant="invalid" />
}
```

El hook debe ejecutarse antes del retorno condicional. `enabled` evita la request inválida.

Checkpoint:

- no hay hook dentro de un condicional;
- `unknown/123` no solicita detalle;
- película y serie generan keys diferentes;
- no copias params a estado.

### Parte 2 · Componer los estados

Importa `PageState` desde `../components/page-state`. Después de URL inválida, representa:

1. primera carga activa;
2. error remoto;
3. respuesta exitosa con `catalog: null`;
4. respuesta exitosa con catálogo.

Usa `isLoading` para la primera carga. No uses `isPending` por sí solo: una query deshabilitada puede estar pending sin hacer fetching.

```tsx
if (detailInput === null) {
  return <PageState variant="invalid" />
}

if (detailQuery.isLoading) {
  return <PageState variant="loading" />
}

if (detailQuery.isError) {
  return <PageState variant="error" />
}

if (detailQuery.data === undefined) {
  return (
    <PageState
      variant="unavailable"
      title="Esperando conexión"
      description="Aún no hay una respuesta. Revisa tu conexión."
    />
  )
}

if (detailQuery.data.catalog === null) {
  return <PageState variant="unavailable" />
}
```

La guarda `data === undefined` distingue «todavía sin respuesta» de «respuesta con catálogo nulo». `isLoading` false no garantiza por sí solo datos: una primera petición puede estar pausada por falta de conexión. No lo soluciones con `!` o un cast. Esta distinción se explica antes del descanso.

Cuando existe catálogo:

```ts
const model = mediaCatalogDetailToModel(detailQuery.data.catalog)
```

No uses `useState` ni `useEffect` para conservar ese modelo.

Checkpoint: puedes producir por separado URL inválida, error remoto y catálogo ausente.

### Parte 3 · Montar contenido y título

En la rama exitosa:

```tsx
return (
  <>
    <MediaDocumentTitle title={model.title} />
    <MediaDetailContent model={model} />
  </>
)
```

Retira:

- el archivo `src/data/demo-media-detail.ts` y su import de `demoMediaDetail`;
- input fijo, botones de demostración, contador de reintentos y estados simultáneos;
- render provisional de params;
- logs;
- casts o non-null assertions añadidos para avanzar.

`MediaDocumentTitle` no se monta en carga, error, URL inválida o catálogo ausente.

### Parte 4 · Matriz manual

Registra resultado esperado y observado:

| Caso | Resultado observado |
| --- | --- |
| Película desde búsqueda | ______________________________ |
| Serie desde búsqueda | ______________________________ |
| Recarga directa | ______________________________ |
| Pestaña nueva | ______________________________ |
| Atrás y Adelante | ______________________________ |
| Tipo inválido sin request | ______________________________ |
| Catálogo nulo, distinto de error | ______________________________ |

Verifica también el título durante entrada y salida.

### Parte 5 · Prueba, build y limpieza

Ejecuta:

```bash
pnpm exec vitest run src/adapters/__tests__/media-catalog-detail-to-model.test.ts
pnpm lint
pnpm build
```

Revisa referencias temporales:

```bash
rg "demoMediaDetail|console\.log|as GetMediaDetailInput|useEffect" src
```

`useEffect` debe aparecer solo donde se sincroniza `document.title`. Lee cada resultado antes de cambiar código.

## Casos de aceptación

1. Una URL inválida no inicia una request.
2. La query key distingue tipo e id.
3. La página diferencia carga, error, catálogo ausente y éxito.
4. Película y serie presentan los campos correspondientes.
5. El contenido recibe un modelo visual, no un DTO.
6. Entrar actualiza el título y salir restaura el anterior.
7. Strict Mode sigue activo y no quedan logs temporales.
8. Recarga, pestaña nueva, Atrás y Adelante funcionan en la comprobación local.
9. La prueba dirigida y el build terminan con código 0.
10. Puedes explicar qué demuestra y qué no demuestra cada evidencia.

## Actividad opcional

Solo después de completar la base, conecta el botón **Reintentar** en los estados `error` y `unavailable`:

```tsx
<PageState
  variant="error"
  onRetry={() => void detailQuery.refetch()}
/>

<PageState
  variant="unavailable"
  onRetry={() => void detailQuery.refetch()}
/>
```

Ambos callbacks repiten la query actual. No guardes otra identidad, no cambies la key y no uses ese botón como mecanismo normal de carga.

## Evidencia requerida

Entrega:

- código del checkpoint final;
- salida completa de la prueba dirigida;
- salida completa de `pnpm build`;
- matriz manual completada;
- diff del archivo creado por el agente, si lo usaste;
- explicación breve de propietarios y límites de evidencia.

El test del adapter no demuestra Router o Effect. El build no demuestra conducta del navegador. La matriz local no demuestra despliegue.

## Puente hacia la sesión 11

La siguiente sesión abrirá un modal global de creación desde búsqueda y detalle. No lo adelantes: hoy no añadas botón de creación, Zustand, formulario, Zod, autenticación o mutaciones.
