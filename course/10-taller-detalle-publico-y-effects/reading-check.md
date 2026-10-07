# Control de lectura · Sesión 10

Marca una sola opción por pregunta.

### 1. ¿Qué opción evita que una query ejecute todavía su `queryFn`?

- A. `enabled`
- B. `staleTime`
- C. `select`
- D. `retry`

### 2. Si una query está deshabilitada y no tiene datos en caché, ¿qué estados puede mostrar?

- A. `status: "success"` y `fetchStatus: "fetching"`
- B. `status: "pending"` y `fetchStatus: "idle"`
- C. `status: "error"` y `fetchStatus: "paused"`
- D. `status: "idle"` y `fetchStatus: "pending"`

### 3. ¿Qué acción sincroniza React con algo que está fuera de su interfaz?

- A. Calcular un modelo desde un DTO durante el render
- B. Construir una query key desde props
- C. Actualizar `document.title` para la pantalla actual
- D. Elegir una etiqueta con un condicional

### 4. ¿Qué debe hacer el cleanup de un Effect?

- A. Para transformar los datos recibidos
- B. Para deshacer o restaurar la sincronización anterior
- C. Para ejecutar el Effect solo una vez
- D. Para evitar declarar dependencias

### 5. En desarrollo, ¿qué secuencia adicional puede ejecutar Strict Mode en un Effect?

- A. `setup → cleanup → setup`
- B. dos eventos click por interacción
- C. dos requests aunque la query esté deshabilitada
- D. el cleanup solo al cerrar el navegador
