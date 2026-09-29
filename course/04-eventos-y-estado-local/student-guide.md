# Guía estudiantil · Sesión 04 · Eventos y `useState`

- **Modalidad:** virtual
- **Duración:** 90 minutos
- **Preparación:** [lectura previa](pre-class-reading.md)

## Objetivo

Añadirás la primera interacción del catálogo. Un input controlado conservará la consulta en `App`, y la interfaz calculará qué medios mostrar sin guardar otra colección en estado.

```text
escribes un título
→ SearchInput comunica un string
→ App actualiza query
→ React renderiza otra vez
→ App calcula visibleMedia
→ MediaGrid muestra el resultado
```

## Conocimientos previos

- Componentes y props.
- `MediaItem[]`, `map` y key.
- Composición de `MediaGrid`, `MediaCard`, `MediaTypeBadge` y `EmptyState`.
- Métodos de strings y arreglos de JavaScript.
- Checkpoint completo de la sesión 03.

Esta sesión no usa filtro por tipo, selección, modal, Effects, stores o API.

## Punto de partida

Continúa tu copia de `MediaLog-Bootcamp`: `session-04-start` coincide con `session-03-end`. Guarda tus cambios antes de consultar otra rama. Primero se presenta el bloque conceptual completo; después trabajamos en el editor y cerramos oralmente.

Abre el proyecto final de 03 y ejecuta:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Comprueba:

- Se muestran seis medios.
- Existen películas y series.
- Los fallbacks de poster y descripción funcionan.
- `App` renderiza `<MediaGrid items={mediaItems} />`.
- `MediaGrid` conserva `map` y `media.id` como key.
- Pasar temporalmente `[]` muestra “Catálogo vacío”.
- La consola no presenta warnings de key.

Restaura `items={mediaItems}` después de probar el vacío.

### Checkpoint 1

Puedes seguir `mediaItems → App → MediaGrid → MediaCard`. Ningún dato cambia por una interacción.

## 1. Observar la limitación de una variable local

Sigue la demostración docente con un input no controlado, una variable local y un párrafo que intenta mostrar el texto.

Antes de escribir, predice:

- qué mostrará el campo;
- qué mostrará el párrafo;
- si React ejecutará otro render;
- si la colección cambiará.

El estado temporal no forma parte del checkpoint. Retíralo antes de continuar.

## 2. Declarar query con useState

Abre `src/App.tsx` e importa:

```tsx
import { useState } from "react"
```

Dentro de `App`, antes de cualquier retorno o condición, declara:

```tsx
const [query, setQuery] = useState("")
```

Lee los nombres:

- `query` es el valor disponible durante el render actual.
- `setQuery` solicita otro render con un valor nuevo.
- `""` representa una consulta inicial vacía.

No declares el Hook dentro de un handler, `if`, `map` o loop.

### Checkpoint 2

- `App` compila con `useState`.
- Existe un solo estado.
- El fixture permanece fuera del estado.
- La interfaz todavía muestra el catálogo completo.

Completa la conexión del siguiente paso antes de ejecutar build; una declaración de estado todavía sin consumidor puede aparecer como no usada.

## 3. Controlar el input desde App

Añade una etiqueta y el input dentro de `App`:

```tsx
<label className="search-input">
  Buscar por título
  <input
    type="search"
    value={query}
    onChange={(event) =>
      setQuery(event.currentTarget.value)
    }
  />
</label>
```

Añade de forma temporal:

```tsx
<p>Consulta actual: {query}</p>
```

Escribe y borra texto. El campo y el párrafo deben mostrar el mismo valor.

### Sigue un cambio

Para la letra `b`, completa en tus notas:

```text
evento entrega: ______
setter recibe: ______
siguiente render lee query: ______
value del input recibe: ______
```

El archivo completo de `src/App.tsx` en esta etapa es:

```tsx
import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { MediaGrid } from './components/media-grid'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <label className="search-input">
          Buscar por título
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
        </label>
        <p>Consulta actual: {query}</p>
        <MediaGrid items={mediaItems} />
      </main>
    </>
  )
}

export default App
```

Añade al final de `src/index.css` estos estilos entregados por el docente:

```css
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
```

### Checkpoint 3

- El input permite escribir.
- El párrafo cambia con cada edición.
- Borrar deja `query === ""`.
- `value` y `onChange` forman el circuito controlado.

## 4. Distinguir evento y render

Durante la demostración, observa un log dentro del handler y otro en el cuerpo de `App`.

Registra:

- cuál log representa el evento del navegador;
- cuál representa la ejecución del componente;
- por qué puede aparecer otra ejecución del cuerpo bajo `StrictMode` durante desarrollo;
- qué logs deben retirarse después.

No elimines `<StrictMode>` de `main.tsx`. Retira solo los logs temporales.

## 5. Normalizar la consulta

Debajo de `useState`, calcula:

```tsx
const normalizedQuery = query.trim().toLowerCase()
```

Prueba mentalmente:

| query | normalizedQuery |
| --- | --- |
| `"bear"` | `"bear"` |
| `"BEAR"` | `"bear"` |
| `"  bear  "` | `"bear"` |
| `""` | `""` |

`normalizedQuery` no necesita estado. El render puede calcularla desde `query`.

## 6. Calcular visibleMedia

Añade:

```tsx
const visibleMedia = mediaItems.filter((media) =>
  media.title.toLowerCase().includes(normalizedQuery),
)
```

Cambia la prop del grid:

```tsx
<MediaGrid items={visibleMedia} />
```

No modifiques el fixture ni `MediaGrid`.

### Comprobaciones

1. Escribe `bear`: aparece The Bear.
2. Escribe `BEAR`: aparece el mismo resultado.
3. Escribe espacios antes y después: la coincidencia se conserva.
4. Borra la consulta: aparecen los seis medios.

Una consulta vacía muestra todo porque cualquier título incluye el string vacío. El código conserva una sola fuente de verdad.

App completo después de conectar el filtro:

```tsx
import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { MediaGrid } from './components/media-grid'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()
  const visibleMedia = mediaItems.filter((media) =>
    media.title.toLowerCase().includes(normalizedQuery),
  )

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <label className="search-input">
          Buscar por título
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
        </label>
        <p>Consulta actual: {query}</p>
        <MediaGrid items={visibleMedia} />
      </main>
    </>
  )
}

export default App
```

Si escribes matrix en esta etapa, todavía aparece Catálogo vacío. La práctica distinguirá ese mensaje de Sin resultados.

### Checkpoint 4

- `mediaItems` conserva seis entradas.
- `visibleMedia` cambia según `query`.
- `MediaGrid` recibe la colección calculada.
- No existe `useState` para la lista.
- No existe un Effect.

## 7. Extraer SearchInput

Crea `src/components/search-input.tsx`.

Declara el contrato:

```tsx
type SearchInputProps = {
  value: string
  onQueryChange: (value: string) => void
}
```

El componente debe:

- renderizar una etiqueta visible “Buscar por título”;
- usar `<input type="search" />`;
- recibir el valor mediante `value`;
- ejecutar `onQueryChange` con `event.currentTarget.value`;
- usar la clase `.search-input` en la etiqueta;
- evitar `useState`.

Este es `src/components/search-input.tsx` completo:

```tsx
type SearchInputProps = {
  value: string
  onQueryChange: (value: string) => void
}

export function SearchInput(props: SearchInputProps) {
  const { value, onQueryChange } = props

  return (
    <label className="search-input">
      Buscar por título
      <input
        type="search"
        value={value}
        onChange={(event) => onQueryChange(event.currentTarget.value)}
      />
    </label>
  )
}
```

Exporta `SearchInput`, impórtalo en `App` y reemplaza el input inline:

```tsx
<SearchInput
  value={query}
  onQueryChange={setQuery}
/>
```

Retira el párrafo temporal de diagnóstico.

App completo después de extraer el control:

```tsx
import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { MediaGrid } from './components/media-grid'
import { SearchInput } from './components/search-input'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()
  const visibleMedia = mediaItems.filter((media) =>
    media.title.toLowerCase().includes(normalizedQuery),
  )

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <SearchInput value={query} onQueryChange={setQuery} />
        <MediaGrid items={visibleMedia} />
      </main>
    </>
  )
}

export default App
```

### Checkpoint 5

- Existe un solo input.
- `SearchInput` recibe `value` y `onQueryChange`.
- El evento DOM se lee dentro del hijo.
- `query` permanece en `App`.
- La búsqueda conserva los cuatro casos anteriores.

## 8. Actividad individual: distinguir la causa del vacío

Una consulta inexistente entrega `visibleMedia.length === 0`. Ese dato no basta para elegir el mensaje: una fuente vacía produce la misma longitud.

En `App`, calcula `hasNoResults` usando estas tres condiciones:

1. La fuente original contiene medios.
2. La consulta normalizada no está vacía.
3. La colección visible no contiene coincidencias.

Después renderiza:

- `EmptyState` con título `Sin resultados` cuando se cumplan las tres condiciones;
- `MediaGrid` con `visibleMedia` en los demás casos.

Usa esta descripción:

```text
No encontramos medios que coincidan con tu búsqueda.
```

No pases `query` a `MediaGrid`. `App` conoce la fuente, la consulta y el resultado.

### Matriz de comprobación

| Caso | Acción | Resultado esperado |
| --- | --- | --- |
| Catálogo completo | Borrar la consulta | Seis medios. |
| Coincidencia parcial | Escribir `bear` | The Bear. |
| Mayúsculas | Escribir `BEAR` | The Bear. |
| Espacios | Escribir `  bear  ` | The Bear. |
| Sin coincidencia | Escribir `matrix` | “Sin resultados”. |
| Fuente vacía | Usar temporalmente `[]` y dejar la consulta vacía | “Catálogo vacío”. |

Para probar la fuente vacía, conserva una copia de `src/data/media-items.ts` y sustitúyelo temporalmente por:

```ts
import type { MediaItem } from '../types/media-item'

export const mediaItems: MediaItem[] = []
```

Comprueba consulta vacía y consulta activa: ambas muestran Catálogo vacío. Restaura el archivo original de seis entradas después de la prueba.

### Checkpoint 6

- Consulta vacía muestra el catálogo completo.
- Una búsqueda sin coincidencias muestra “Sin resultados”.
- Una fuente vacía muestra “Catálogo vacío”.
- `EmptyState` conserva props `title` y `description`.
- Existe un solo estado: `query`.

## 9. Ejecutar el build

Conserva `pnpm dev` y abre otra terminal:

```bash
pnpm build
```

Registra el resultado exacto. Si falla, corrige el primer error antes de cambiar otra parte.

### Checkpoint final

- `App` conserva `query` con `useState`.
- `SearchInput` es controlado y no declara estado.
- `visibleMedia` se calcula durante el render.
- `MediaGrid` recibe la colección calculada.
- La matriz manual produce los seis resultados esperados.
- Los logs temporales desaparecieron y `StrictMode` permanece.
- No existen `useEffect`, `useMemo`, debounce o stores.
- `pnpm build` termina con código 0.

## Errores frecuentes

### El input no permite escribir

Comprueba que `value={query}` tenga un `onChange` que ejecute `setQuery` con el texto del input.

### El handler se ejecuta al renderizar

Pasa una función a la prop. No uses `onChange={handleQueryChange()}`.

### useState aparece dentro del handler

Muévelo al nivel superior de `App`, junto con los demás Hooks.

### SearchInput declara otro query

Retira ese estado. `App` ya posee la consulta que usa el filtro.

### App recibe el evento completo

Haz que `SearchInput` lea `event.currentTarget.value` y comunique solo el string.

### visibleMedia vive en estado

Retira el segundo estado. Calcula la colección desde `mediaItems` y `query` durante el render.

### El filtro usa useEffect

Retira el Effect. No existe un sistema externo que sincronizar.

### Toda lista vacía muestra “Sin resultados”

Revisa las tres condiciones. La fuente debe contener elementos y la consulta debe estar activa.

### Eliminaste StrictMode por los logs

Restaura `<StrictMode>`. Los logs temporales se retiran al terminar la comparación.

## Vocabulario

- **Evento:** información que produce el navegador cuando interactúas.
- **Handler:** función que responde al evento.
- **Hook:** función de React que permite usar una capacidad como estado.
- **Estado:** memoria que React conserva entre renders.
- **Snapshot:** valores disponibles durante un render concreto.
- **Setter:** función que solicita otro render con un valor nuevo.
- **Input controlado:** campo cuyo valor visible proviene de estado React.
- **Prop de callback:** función que un componente recibe para comunicar una acción.
- **Estado derivado:** dato calculado desde información disponible.
- **Normalización:** transformación que prepara dos valores para compararlos.
- **Render puro:** cálculo que no muta datos externos.

## Pausar y retomar

Registra el último checkpoint comprobado, archivo guardado, primer paso pendiente y evidencia ausente. Referencias: `session-04-step-01-controlled-query`, `session-04-step-02-derived-search`, `session-04-step-03-search-input` y `session-04-end`. Retoma tu trabajo guardado y explica su flujo antes de continuar; una referencia no sustituye tu práctica.

## Evidencia y entrega

Conserva:

1. Captura del catálogo completo con consulta vacía.
2. Captura de una coincidencia por título.
3. Captura de “Sin resultados”.
4. Resultado de `pnpm build`.
5. Explicación breve de quién posee `query` y por qué `visibleMedia` no usa estado.

No incluyas `node_modules/`, `dist/`, tokens, contraseñas o variables de entorno.

Las capturas demuestran lo observado en tu navegador. El build demuestra que TypeScript y Vite produjeron archivos. Estas evidencias no prueban una API, despliegue o comportamiento de producción.
