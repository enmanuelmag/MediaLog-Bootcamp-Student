# Control de lectura · Sesión 02

### Pregunta 1 · Opción múltiple

¿Cómo envía un componente padre la prop `title` a `MediaCard`?

- A. En el nombre del archivo del componente hijo.
- B. La escribe en el JSX: `<MediaCard title="Arrival" />`.
- C. En una hoja de estilos global.
- D. En el comando que inicia Vite.

### Pregunta 2 · Verdadero o falso

Un componente hijo no debe modificar las props que recibe.

- Verdadero
- Falso

### Pregunta 3 · Opción múltiple

¿Cómo se escribe en TypeScript un arreglo de elementos `MediaItem`?

- A. `MediaItem[]`
- B. `[MediaItem]`
- C. `MediaItem{}`
- D. `array(MediaItem)`

### Pregunta 4 · Opción múltiple

¿Qué valores permite este tipo?

```ts
type MediaType = 'movie' | 'series'
```

- A. Cualquier string.
- B. Solo `movie`.
- C. Solo `movie` o `series`.
- D. Un arreglo que contenga `movie` y `series`.

### Pregunta 5 · Opción múltiple

Con `strictNullChecks`, ¿qué valor puede tener `description: string | null`?

- A. Un string o `null`.
- B. La propiedad puede omitirse sin declararla.
- C. TypeScript convertirá `null` en un string.
- D. La propiedad acepta cualquier tipo de valor.
