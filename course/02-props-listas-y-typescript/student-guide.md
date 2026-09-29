# Guía estudiantil · Sesión 02 · Props, listas y TypeScript

- **Modalidad:** virtual
- **Duración:** 90 minutos
- **Preparación:** [lectura previa](pre-class-reading.md)

## Objetivo

Convertirás la tarjeta fija de la sesión 01 en un componente que recibe un medio mediante props. Después transformarás un fixture tipado en seis tarjetas con `map` y una key estable.

Al terminar podrás explicar este flujo:

```text
fixture → App → map → data prop → MediaCard → JSX
```

## Conocimientos previos

- Checkpoint de la sesión 01.
- Componentes y elementos JSX.
- Objetos y arreglos de JavaScript.
- Funciones con parámetros.
- Lectura previa completada.

Esta sesión no usa estado, eventos, una API o componentes de colección.

## Punto de partida

Continúa tu copia desde 01 (`session-02-start` como referencia). Guarda tus cambios antes de consultar otra rama. La clase presenta todos los conceptos primero; después trabajamos en el editor hasta el cierre.

Abre `MediaLog-Bootcamp`, instala las dependencias registradas y ejecuta el proyecto:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Comprueba:

- El navegador muestra el encabezado y una tarjeta.
- React DevTools muestra `App`, `AppHeader` y `MediaCard`.
- `src/components/media-card.tsx` contiene los datos fijos de una película.
- `MediaCard` no recibe props.

Si el proyecto no llega a este estado, muestra al docente el primer error antes de modificar dependencias o archivos de configuración.

### Checkpoint 1

Puedes señalar dónde viven el título, el tipo, la fecha y la descripción que aparecen en la tarjeta.

## 1. Reconocer el problema

Observa qué ocurre si `App` usa dos veces el componente:

```tsx
<MediaCard />
<MediaCard />
```

Ambas tarjetas presentan el mismo contenido porque los datos viven dentro de `MediaCard`. Retira el segundo uso después de la demostración.

La transformación de hoy asignará estas responsabilidades:

```text
App        elige cada medio
MediaCard  recibe un medio y lo presenta
```

## 2. Definir el contrato del medio

Antes de crear el contrato, añade `"strictNullChecks": true,` dentro de `compilerOptions` en `tsconfig.app.json`, junto a las opciones de linting. El scaffold de 01 no lo activa: esta opción distingue `null` y `undefined` de un string. Conserva el resto de opciones. Prueba temporalmente `description: undefined` en el fixture, lee el error y restaura el valor; el checkpoint debe compilar.

Crea:

```text
src/types/media-item.ts
```

Añade:

```ts
export type MediaType = 'movie' | 'series'

export type MediaItem = {
  id: number
  title: string
  description: string | null
  mediaType: MediaType
  releaseDate: string
  posterUrl: string | null
}
```

Lee el contrato:

- `id` identifica cada objeto del fixture.
- `title` y `releaseDate` contienen texto.
- `mediaType` admite solo `movie` o `series`.
- `description` y `posterUrl` deben declararse, pero pueden contener `null`.

No reemplaces `string | null` por una prop opcional. El fixture declara la ausencia con `null`.

### Comprobación del tipo

Escribe temporalmente un valor inválido en un objeto durante la demostración:

```ts
mediaType: 'anime'
```

Lee el error del editor y restaura un valor permitido. No uses `any`, `as` o `!` para ocultarlo.

### Checkpoint 2

Puedes explicar por qué `movie` cumple `MediaType` y `anime` no lo cumple.

## 3. Crear el fixture

Copia a `public/posters/` los cinco SVG de prueba entregados por el docente. Las rutas `/posters/*.svg` se sirven desde esa carpeta. No hace falta dibujar imágenes ni descargar posters.

Crea:

```text
src/data/media-items.ts
```

Importa el tipo:

```ts
import type { MediaItem } from '../types/media-item'
```

Declara el arreglo:

```ts
export const mediaItems: MediaItem[] = [
  {
    id: 1,
    title: 'Arrival',
    description:
      'Una lingüista intenta comunicarse con visitantes extraterrestres.',
    mediaType: 'movie',
    releaseDate: '2016-11-11',
    posterUrl: '/posters/arrival.svg',
  },
  {
    id: 2,
    title: 'Severance',
    description:
      'Un grupo de empleados separa sus recuerdos laborales y personales.',
    mediaType: 'series',
    releaseDate: '2022-02-18',
    posterUrl: '/posters/severance.svg',
  },
  {
    id: 3,
    title: 'Aftersun',
    description:
      'Una hija reconstruye los recuerdos de unas vacaciones con su padre.',
    mediaType: 'movie',
    releaseDate: '2022-10-21',
    posterUrl: null,
  },
  {
    id: 4,
    title: 'The Bear',
    description: null,
    mediaType: 'series',
    releaseDate: '2022-06-23',
    posterUrl: '/posters/the-bear.svg',
  },
  {
    id: 5,
    title: 'Past Lives',
    description:
      'Dos amigos de la infancia se reencuentran años después en Nueva York.',
    mediaType: 'movie',
    releaseDate: '2023-06-02',
    posterUrl: '/posters/past-lives.svg',
  },
]
```

El arreglo comienza con cinco objetos. Completarás el sexto durante la práctica individual.

### Checkpoint 3

- Existen cinco entradas.
- Cada una declara las seis propiedades.
- Aftersun usa `posterUrl: null`.
- The Bear usa `description: null`.
- El editor no muestra errores de tipos.

## 4. Convertir MediaCard en un componente configurable

Abre:

```text
src/components/media-card.tsx
```

Importa el tipo y declara el contrato local de props:

```tsx
import type { MediaItem } from '../types/media-item'

type MediaCardProps = {
  data: MediaItem
}
```

Cambia la firma del componente:

```tsx
export function MediaCard(props: MediaCardProps) {
  const { data } = props
```

Este es el componente completo antes de resolver los casos nulos. La ruta del poster es texto temporal, no una imagen:

```tsx
import type { MediaItem } from '../types/media-item'

type MediaCardProps = {
  data: MediaItem
}

export function MediaCard(props: MediaCardProps) {
  const { data } = props

  return (
    <article className="media-card">
      <div className="media-card__poster">{data.posterUrl}</div>
      <div>
        <p className="media-card__meta">{data.mediaType} · {data.releaseDate}</p>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>
    </article>
  )
}
```

Conéctalo desde `src/App.tsx` con este archivo completo:

```tsx
import { AppHeader } from './components/app-header'
import { MediaCard } from './components/media-card'
import { mediaItems } from './data/media-items'

function App() {
  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>

        <MediaCard data={mediaItems[0]} />
      </main>
    </>
  )
}

export default App
```

Cambia temporalmente `[0]` por `[1]`, comprueba Severance y restaura `[0]`. Sustituye cada dato fijo por la propiedad correspondiente:

```text
Película o Serie  ← data.mediaType
fecha             ← data.releaseDate
título            ← data.title
descripción       ← data.description
poster            ← data.posterUrl
```

El componente no debe conservar `Arrival`, `2016` ni otra información de un medio concreto.

### Checkpoint 4

`MediaCard` recibe una prop `data` y todo el contenido de dominio procede de ese objeto.

Usamos `data` porque el nombre `MediaCard` ya indica qué presenta el componente. El padre puede llamar `media` a su variable y pasarla como `data={media}`; dentro de la tarjeta lees `data.title`, `data.posterUrl` y las demás propiedades.

## 5. Transformar el fixture en tarjetas

Abre `src/App.tsx` e importa:

```tsx
import { mediaItems } from './data/media-items'
```

Reemplaza el uso único de `MediaCard` por:

```tsx
<div className="media-list">
  {mediaItems.map((media) => (
    <MediaCard data={media} />
  ))}
</div>
```

Abre la consola del navegador. React debe advertir que cada elemento de la lista necesita una key única.

Añade la identidad estable del fixture al elemento que devuelve `map`:

```tsx
<MediaCard key={media.id} data={media} />
```

Comprueba que el warning desaparezca.

No uses:

```tsx
key={index}
key={Math.random()}
```

El fixture ya proporciona `media.id`. React usa `key`; `MediaCard` no la recibe dentro de `MediaCardProps`.

Añade ahora `.media-list` del CSS mostrado en el paso 6. App conserva AppHeader y el título; únicamente reemplazas la tarjeta única por el recorrido.

### Checkpoint 5

- El navegador muestra cinco tarjetas.
- `map` devuelve un `<MediaCard />` por cada objeto.
- La key está en el elemento directo del recorrido.
- La consola no muestra el warning de key.

## 6. Representar los casos del fixture

Completa `MediaCard` con la etiqueta de tipo:

```tsx
const mediaTypeLabel = data.mediaType === 'movie' ? 'Película' : 'Serie'
```

Usa esa constante en el metadato:

```tsx
<p className="media-card__meta">
  {mediaTypeLabel} · {data.releaseDate}
</p>
```

Representa el poster o su ausencia:

```tsx
{data.posterUrl ? (
  <img
    className="media-card__poster-image"
    src={data.posterUrl}
    alt={`Poster de ${data.title}`}
  />
) : (
  <div className="media-card__poster">Poster no disponible</div>
)}
```

Representa la descripción:

```tsx
<p>{data.description ?? 'Sin descripción disponible'}</p>
```

El componente completo queda así:

```tsx
import type { MediaItem } from '../types/media-item'

type MediaCardProps = {
  data: MediaItem
}

export function MediaCard(props: MediaCardProps) {
  const { data } = props
  const mediaTypeLabel = data.mediaType === 'movie' ? 'Película' : 'Serie'

  return (
    <article className="media-card">
      {data.posterUrl ? (
        <img
          className="media-card__poster-image"
          src={data.posterUrl}
          alt={`Poster de ${data.title}`}
        />
      ) : (
        <div className="media-card__poster">Poster no disponible</div>
      )}

      <div>
        <p className="media-card__meta">
          {mediaTypeLabel} · {data.releaseDate}
        </p>
        <h3>{data.title}</h3>
        <p>{data.description ?? 'Sin descripción disponible'}</p>
      </div>
    </article>
  )
}
```

Estos son los estilos de la sesión. `.media-list` ya se añadió en el paso 5: ahora incorpora solo `.media-card__poster-image`, sin duplicar reglas:

```css
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
```

### Checkpoint 6

Comprueba en el navegador:

- Arrival muestra “Película”.
- Severance muestra “Serie”.
- Aftersun muestra “Poster no disponible”.
- The Bear muestra “Sin descripción disponible”.

Una URL no nula que no cargue indica un problema de red o del recurso. El fallback de esta sesión responde al valor `null`.

## 7. Práctica individual

Añade esta sexta entrada al final del fixture:

```ts
{
  id: 6,
  title: 'Blue Eye Samurai',
  description:
    'Una guerrera persigue una venganza en el Japón del periodo Edo.',
  mediaType: '',
  releaseDate: '2023-11-03',
  posterUrl:
    '/posters/blue-eye-samurai.svg',
},
```

Completa `mediaType` con el valor permitido que corresponde a una serie. No modifiques `MediaCard` ni añadas otro `<MediaCard />` en `App`.

Después:

1. Cuenta las tarjetas visibles.
2. Cambia temporalmente el tipo por `anime`.
3. Lee el error de TypeScript.
4. Restaura el valor válido.
5. Comprueba que la sexta tarjeta vuelva a mostrarse sin errores.

### Checkpoint 7

- El fixture contiene seis objetos.
- El navegador muestra seis tarjetas.
- La sexta tarjeta apareció al cambiar los datos, sin duplicar la estructura.
- No quedan errores de TypeScript.

## 8. Comprobar el checkpoint final

Conserva `pnpm dev` en una terminal. Abre otra dentro de `MediaLog-Bootcamp` y ejecuta:

```bash
pnpm build
```

Comprueba:

- El comando termina con código de salida 0.
- El navegador muestra seis tarjetas.
- Se ven películas y series.
- Funcionan los dos fallbacks.
- La consola no muestra warnings de key.
- React DevTools muestra seis instancias de `MediaCard`.

Explica a otra persona:

```text
mediaItems contiene los datos
App recorre el arreglo
map crea una MediaCard por objeto
data entrega el objeto al componente
MediaCard convierte sus propiedades en JSX
```

Las evidencias tienen límites distintos:

- El editor y `pnpm build` comprueban el código contra los tipos configurados.
- La consola comprueba los warnings del árbol montado durante desarrollo.
- El navegador comprueba el resultado visual local.
- Ninguna de estas comprobaciones valida una API, un despliegue o producción.

## Errores frecuentes

### TypeScript no encuentra `MediaItem`

Comprueba:

- que exista `src/types/media-item.ts`;
- que el archivo exporte `MediaItem`;
- que uses `import type` con la ruta relativa correcta.

### Un objeto no cumple el tipo

Lee el primer error. Comprueba si falta una propiedad, si `mediaType` contiene un valor no permitido o si escribiste `undefined` donde el contrato admite `null`.

No cambies el tipo a `any` para ocultar el problema.

### `MediaCard` sigue mostrando Arrival en todas las tarjetas

Busca strings y fechas fijas dentro del componente. El título, descripción, tipo, fecha y poster deben proceder de `data`.

### No aparece ninguna tarjeta

Comprueba:

- el import de `mediaItems`;
- que `map` esté dentro de llaves JSX;
- que la arrow function use paréntesis para devolver `<MediaCard />`;
- el primer error de la terminal o consola.

### Aparece el warning de key

La key debe estar aquí:

```tsx
<MediaCard key={media.id} data={media} />
```

No la coloques dentro del JSX que retorna `MediaCard`.

### Intentas leer `key` dentro de MediaCard

React consume `key`; no forma parte de `MediaCardProps`. El componente puede leer el identificador desde `data.id` si necesita mostrarlo.

### El poster nulo deja la página en blanco

Comprueba que el condicional cubra ambas ramas y que cada etiqueta cierre. No uses `data.posterUrl!`.

### Ves cinco tarjetas

Confirma que el sexto objeto está dentro de los corchetes del arreglo y que `mediaType` usa `series`.

## Vocabulario

- **Prop:** dato que un padre entrega a un hijo mediante JSX.
- **Contrato de props:** tipo que describe las entradas de un componente.
- **Fixture:** datos controlados usados para construir y comprobar la interfaz.
- **Alias de tipo:** nombre creado con `type`.
- **Unión literal:** conjunto cerrado de valores permitidos.
- **`null`:** ausencia explícita de un valor.
- **Arreglo tipado:** colección cuyos elementos cumplen un tipo.
- **`map`:** transformación que produce un resultado por cada elemento.
- **`key`:** identidad estable que React usa entre elementos hermanos.
- **Renderizado condicional:** elección del JSX según un dato.
- **Runtime:** momento en que el programa se ejecuta.

## Evidencia y entrega

Entrega en la plataforma institucional:

1. Un ZIP de `MediaLog-Bootcamp` sin `node_modules/` ni `dist/`.
2. `package.json`, `pnpm-lock.yaml`, `src/`, `public/` y los archivos de configuración dentro del ZIP.
3. Un texto breve con:
   - `fixture → App → data prop → MediaCard → JSX`;
   - el resultado observado al ejecutar `pnpm build`;
   - la confirmación de que la consola no muestra warnings de key.

No incluyas tokens, contraseñas, variables de entorno ni carpetas de dependencias.

## Si necesitas continuar después

Anota el último checkpoint comprobado, el archivo guardado y el primer paso pendiente. Las ramas son `session-02-step-01-typed-fixture`, `session-02-step-02-card-props`, `session-02-step-03-keyed-list`, `session-02-step-04-null-fallbacks` y `session-02-end`. Antes de continuar, ejecuta tu estado y explica qué funciona; consultar una rama no sustituye tu práctica.

## Punto de partida de la sesión 03

`App` todavía contiene el wrapper visual, `map` y `key`. `MediaCard` todavía decide el texto de película o serie dentro de su marcado. La siguiente sesión reorganizará esas responsabilidades y añadirá el caso de una colección vacía sin cambiar el fixture que terminaste hoy.
