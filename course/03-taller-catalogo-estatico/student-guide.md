# Guía estudiantil · Sesión 03 · Composición y catálogo estático

- **Modalidad:** presencial
- **Duración:** 180 minutos, incluido un descanso de 30 minutos
- **Preparación:** [lectura previa](pre-class-reading.md)
- **Taller:** [encargo y rúbrica](workshop-rubric.md)

## Objetivo

Reorganizarás el catálogo de la sesión 02 para que cada componente tenga una responsabilidad reconocible. Antes del descanso construirás `MediaGrid`. Después completarás un taller calificable con `EmptyState` y `MediaTypeBadge`.

```text
App
├── AppHeader
└── main
    └── MediaGrid
        ├── EmptyState
        └── MediaCard
            └── MediaTypeBadge
```

## Conocimientos previos

- Componentes y props.
- `MediaItem[]` y `MediaType`.
- `map` y `media.id` como key.
- Renderizado condicional básico.
- Checkpoint completo de la sesión 02.

La sesión no usa estado, eventos, Effects, stores o dependencias nuevas.

## Punto de partida

Continúa en tu copia de `MediaLog-Bootcamp`. La referencia `session-03-start` hereda `session-02-end` y añade solo CSS preparado y material estudiantil. Guarda tus cambios antes de consultar otra rama. Abre la copia inicial y ejecuta:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Comprueba:

- Se muestran seis tarjetas.
- Existen películas y series.
- Aftersun muestra “Poster no disponible”.
- The Bear muestra “Sin descripción disponible”.
- La consola no presenta warnings de key.
- `App.tsx` contiene `.media-list`, `map` y `media.id` como key.
- `MediaCard` contiene la decisión entre “Película” y “Serie”.

Si el proyecto no llega a este estado, muestra al docente el primer error. No cambies versiones o dependencias.

### Checkpoint 1

Puedes seguir `mediaItems → App → map → MediaCard → JSX`.

## Antes del descanso · 75 minutos

Primero se presenta todo el bloque conceptual sin abrir el editor. Después de la única transición al coding, seguimos con el proyecto y cerramos oralmente. El retorno temprano se explica antes del descanso; después lo aplicas en el taller.

## 1. Marcar la responsabilidad de la colección

Abre `src/App.tsx` y localiza:

1. El import de `mediaItems`.
2. El wrapper `.media-list`.
3. El recorrido con `map`.
4. `media.id` como key.
5. La prop `data`.

`App` debe conservar la elección de `mediaItems`. El wrapper y el recorrido pasarán a un componente que presenta una colección recibida.

```text
Antes                     Después

App                       App
└── map                    └── MediaGrid
    └── MediaCard              └── MediaCard
```

No extraigas `main` o el título de la sección. Esas piezas siguen ayudando a leer la página dentro de `App`.

## 2. Crear MediaGrid

Crea `src/components/media-grid.tsx` e importa:

```tsx
import type { MediaItem } from '../types/media-item'
import { MediaCard } from './media-card'
```

Declara el contrato y el componente:

```tsx
type MediaGridProps = {
  items: MediaItem[]
}

export function MediaGrid(props: MediaGridProps) {
  const { items } = props
  return (
    <div className="media-list">
      {items.map((media) => (
        <MediaCard key={media.id} data={media} />
      ))}
    </div>
  )
}
```

El wrapper conserva la clase `.media-list`; la refactorización no necesita renombrar estilos.

### Checkpoint 2

- `MediaGrid` recibe `items`.
- El archivo no importa `mediaItems`.
- `map` y key viven dentro de `MediaGrid`.
- La key permanece en `<MediaCard />`.

## 3. Conectar App con MediaGrid

Importa:

```tsx
import { MediaGrid } from './components/media-grid'
```

Reemplaza el wrapper y el recorrido antiguos por:

```tsx
<MediaGrid items={mediaItems} />
```

Comprueba que exista un solo `map`. Elimina imports que ya no se usen, pero conserva el import de `mediaItems` en `App`.

### Checkpoint 3

- Se muestran seis tarjetas.
- Los dos tipos y los dos fallbacks continúan funcionando.
- La consola no muestra warnings de key.
- `App` elige la colección.
- `MediaGrid` la recorre.

## 4. Hacer visible el trabajo pendiente

Cambia temporalmente:

```tsx
<MediaGrid items={[]} />
```

El proyecto no falla, pero el área de catálogo queda vacía y no explica la causa.

Responde en tus notas:

- ¿Qué componente conoce `items.length`?
- ¿Qué debería mostrar cuando la longitud sea cero?
- ¿Qué componente podría presentar ese mensaje sin conocer el arreglo?

Restaura `items={mediaItems}`.

### Checkpoint previo al taller

`MediaGrid` representa los seis medios y conserva la key. Una colección vacía todavía no muestra un mensaje.

Si no alcanzaste este checkpoint, solicita `session-03-workshop-start` antes del descanso.

## 5. Leer el encargo y la rúbrica

Abre [workshop-rubric.md](workshop-rubric.md). Revisa trabajo obligatorio, restricciones, casos de aceptación, evidencia, criterios y actividad opcional.

Formula tus preguntas antes del descanso. El docente no implementará los componentes del taller.

## Descanso · 30 minutos

El taller comienza después del descanso desde el checkpoint indicado.

## Taller calificable · 60 minutos

## 6. Crear EmptyState

Crea `src/components/empty-state.tsx`.

El componente recibe:

```text
title: string
description: string
```

Presenta ambos textos con la clase `.empty-state`. No recibe `items` ni usa `children`.

Integra el componente en `MediaGrid`. Cuando `items.length === 0`, usa un retorno temprano con:

- Título: `Catálogo vacío`.
- Descripción: `No hay películas o series disponibles.`

Cuando la colección contiene elementos, `MediaGrid` conserva el recorrido actual.

### Checkpoint 4

Prueba temporalmente `items={[]}`:

- Aparecen título y descripción.
- No aparece `0`.
- No se renderizan tarjetas.
- No existen errores de TypeScript.

Restaura `items={mediaItems}` después de comprobarlo.

## 7. Crear MediaTypeBadge

Crea `src/components/media-type-badge.tsx`.

El componente recibe `mediaType: MediaType` y debe:

- mostrar “Película” para `movie`;
- mostrar “Serie” para `series`;
- usar la clase `.media-type-badge`;
- evitar recibir el objeto `MediaItem` completo.

Abre `MediaCard` y reemplaza la etiqueta inline por `<MediaTypeBadge />`. Conserva fecha, título, poster y descripción.

### Checkpoint 5

- Arrival o Past Lives muestra “Película”.
- Severance o The Bear muestra “Serie”.
- `MediaCard` ya no calcula la etiqueta.
- Los fallbacks siguen funcionando.

## 8. Comparar el árbol

Revisa con otra persona:

```text
App
├── AppHeader
└── main
    └── MediaGrid
        ├── EmptyState
        └── MediaCard
            └── MediaTypeBadge
```

Cada persona explica:

- por qué `MediaGrid` recibe `items`;
- por qué `EmptyState` no recibe `items`;
- por qué `MediaTypeBadge` recibe solo `mediaType`;
- dónde viven `map` y key.

## 9. Ejecutar los casos de aceptación

### Colección completa

Usa `<MediaGrid items={mediaItems} />`. Comprueba seis tarjetas y consola sin warnings de key.

### Colección vacía

Usa temporalmente `<MediaGrid items={[]} />`. Comprueba el mensaje vacío y restaura el fixture.

### Casos del fixture

Comprueba película, serie, poster nulo y descripción nula.

### Build

Conserva `pnpm dev` y abre otra terminal:

```bash
pnpm build
```

Registra el resultado exacto. Si falla, lee el primer error y corrígelo antes de cambiar otra cosa.

### Checkpoint final

- `App` entrega `mediaItems` a `MediaGrid`.
- `MediaGrid` contiene `map`, key y la decisión vacía.
- `EmptyState` presenta título y descripción.
- `MediaCard` usa `MediaTypeBadge`.
- Los seis casos funcionan.
- `pnpm build` termina con código 0.

## Actividad opcional

Después de cumplir todos los requisitos base, muestra el total de medios dentro de `MediaGrid` mediante `items.length`.

Condiciones:

- El total aparece solo con una colección no vacía.
- El valor se calcula durante el render.
- No usa `useState`.
- No reemplaza ningún requisito obligatorio.

## Errores frecuentes

### MediaGrid importa mediaItems

Retira el import. `App` elige la fuente y la entrega mediante `items`.

### Existen dos map

Conserva un solo recorrido dentro de `MediaGrid`. Retira el bloque anterior de `App`.

### El warning de key reaparece

La key debe permanecer en `<MediaCard key={media.id} data={media} />`, elemento directo que devuelve `map`.

### EmptyState recibe items

Limita sus props a `title` y `description`. `MediaGrid` conoce la colección y decide cuándo mostrarlo.

### Aparece un cero en lugar del mensaje

Usa `items.length === 0` con un retorno temprano. No renderices el número mediante `items.length && ...`.

### El badge recibe el objeto completo

El componente solo necesita `mediaType: MediaType`.

### Desapareció un fallback

Recupera el código del seed. Extraer la etiqueta no requiere cambiar poster o descripción.

### Quieres usar estado

Los datos llegan mediante props y no cambian por interacción. Retira `useState`, Effects o stores.

### Una imagen local no carga

Comprueba que `public/posters/` conserve los SVG de 02 y que la ruta corresponda al archivo. El fallback de `posterUrl: null` es un caso distinto.

## Vocabulario

- **Composición:** construcción de una interfaz mediante componentes anidados.
- **Responsabilidad:** tarea o parte visual que pertenece a un componente.
- **Jerarquía:** relación padre-hijo del árbol de componentes.
- **Contrato de props:** forma de los datos que un componente espera.
- **Refactorización:** cambio de organización que conserva comportamiento.
- **Regresión:** comportamiento anterior que deja de funcionar.
- **Estado vacío:** mensaje que representa una fuente sin elementos.
- **Retorno temprano:** salida de una función antes del retorno principal.
- **Valor derivado:** valor calculado desde props o datos existentes.

## Si debes retomar

Anota el último checkpoint comprobado, el archivo guardado y el primer paso pendiente. La entrada del taller es `session-03-workshop-start`; tu entrega conserva tu propio trabajo. Al volver, comprueba ese estado y explica el paso pendiente antes de continuar. No cambies de rama sobre archivos sin guardar.

## Evidencia y entrega

Entrega:

1. ZIP o enlace admitido por la plataforma institucional.
2. Captura del catálogo con seis medios.
3. Captura de “Catálogo vacío”.
4. Árbol final escrito o dibujado.
5. Resultado de `pnpm build`.
6. Explicación breve de quién posee `items`, `map`, key y la decisión vacía.

Incluye `src/`, `public/`, configuración, `package.json` y `pnpm-lock.yaml`.

No incluyas `node_modules/`, `dist/`, tokens, contraseñas o variables de entorno.

Las capturas demuestran lo observado en tu navegador. El build demuestra que TypeScript y Vite produjeron archivos. Ninguna de estas evidencias prueba una API, despliegue o producción.
