# Control de lectura · Sesión 08

### Pregunta 1 · Opción múltiple

La query ejecuta `searchMedia({ query, mediaType })`. ¿Qué key incluye todos los datos que cambian la búsqueda?

A. `["media"]`

B. `["media", "search", { query, mediaType }]`

C. `[query]`

D. `["media", Date.now()]`

### Pregunta 2 · Verdadero o falso

Una búsqueda de películas y otra de series pueden usar la misma key si ambas buscan `Dune`.

- Verdadero
- Falso

### Pregunta 3 · Opción múltiple

El formulario aún no se envió y la query está deshabilitada y sin datos. ¿Qué estados puede mostrar?

A. `status: pending` y `fetchStatus: idle`

B. `status: success` y `fetchStatus: fetching`

C. `status: error` y `fetchStatus: paused`

D. `status: success` y `fetchStatus: idle` con datos obligatorios

### Pregunta 4 · Opción múltiple

¿Qué valor indica que la primera petición de una lazy query está en curso?

A. `isPending` aislado

B. `isSuccess`

C. `isLoading`

D. `isStale`

### Pregunta 5 · Verdadero o falso

Cuando cambia la búsqueda enviada, sus valores deben formar parte de la query key para que TanStack Query use los nuevos parámetros.

- Verdadero
- Falso
