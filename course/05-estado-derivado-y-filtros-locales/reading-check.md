# Control de lectura · Sesión 05

### Pregunta 1 · Opción múltiple

¿Cómo debe obtenerse `visibleMedia` si depende de `mediaItems`, `query` y el tipo elegido?

- A. Guardándolo en otro estado y sincronizándolo con un Effect.
- B. Calculándolo durante cada render.
- C. En una variable global mutable.
- D. Dentro de cada `MediaCard`.

### Pregunta 2 · Verdadero o falso

`query` y `mediaTypeFilter` pueden ser estados separados porque cada control cambia por su cuenta.

- Verdadero
- Falso

### Pregunta 3 · Opción múltiple

¿Cómo recibe un componente controlado su valor actual?

- A. El componente hijo lo recibe mediante props.
- B. El navegador lo guarda siempre fuera de React.
- C. Cada instancia lo copia desde el padre a su propio estado.
- D. Solo puede cambiar mediante un Effect.

### Pregunta 4 · Verdadero o falso

Cada dato de estado debe tener un componente que guarde su valor principal.

- Verdadero
- Falso

### Pregunta 5 · Opción múltiple

¿Qué valor se puede calcular directamente desde `visibleMedia`?

- A. `resultCount`, usando `visibleMedia.length`.
- B. El valor escrito por la persona antes de que ocurra el evento.
- C. Una respuesta futura de una API todavía no solicitada.
- D. La opción que la persona elegirá después.
