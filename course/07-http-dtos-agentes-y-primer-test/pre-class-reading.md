# Lectura previa · Sesión 07 · HTTP, DTOs, agentes y primer test

## Propósito

Llegar a la sesión con un mapa básico de `fetch`, response HTTP y prueba automatizada. Usarás ese mapa para leer dos contratos de Medialog y comprobar una transformación pura sin integrar todavía datos remotos en la interfaz.

- **Tiempo estimado:** 20 minutos
- **Stack de la cohorte:** React `19.2.8`, TypeScript, Vite, pnpm `11.17.0` y Vitest `4.1.11`
- **Fecha de verificación de fuentes:** 31 de agosto de 2026

## Conocimientos previos

- Funciones, objetos y arreglos en JavaScript.
- Props, callbacks y estado local de React.
- Tipos de objetos y uniones en TypeScript.
- Eventos `click` y handlers.
- Checkpoint completo de la sesión 06.

No necesitas conocer TanStack Query, Router, autenticación, mocks ni pruebas de componentes.

## Fuente principal · fetch y respuestas HTTP

**MDN Web Docs · [`Window.fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch)**

Lee únicamente:

1. El resumen situado antes de `In this article`.
2. `Syntax`.
3. `Return value`.
4. El primer ejemplo de `Examples`, hasta la comprobación de `response.ok`.

Busca respuestas para estas preguntas:

- ¿Qué valor devuelve `fetch()` de inmediato?
- ¿Qué objeto recibe el código cuando existe una response?
- ¿Un status `404` rechaza por sí solo la Promise de `fetch()`?
- ¿Qué propiedades permiten comprobar si el status representa éxito?

No leas todavía autenticación, cancelación, streaming ni CORS. El docente tratará esos temas cuando aparezca un consumidor en el curso.

## Fuente secundaria · Primer test con Vitest

**Vitest `4.1.11` · [Getting Started](https://vitest.dev/guide/)**

Lee únicamente:

1. `Writing Tests`.
2. `Test Scripts`.
3. El ejemplo que usa `expect` para comparar un resultado.

Identifica:

- qué representa un caso escrito con `test` o `it`;
- qué expresa `expect`;
- qué diferencia existe entre escribir un test y ejecutarlo;
- qué script ejecuta una suite finita con `vitest run`.

No instales dependencias durante la lectura. La clase parte de un seed preparado y usa pnpm.

## Recorrido sugerido

1. Dedica 12 minutos a `fetch()`.
2. Dibuja una línea con `request → Promise → response`.
3. Añade una decisión que consulte `response.ok`.
4. Dedica 6 minutos al ejemplo de Vitest.
5. Usa los últimos 2 minutos para revisar el vocabulario y anotar una duda.

No modifiques el proyecto. La clase construirá el contrato y los fetchers de forma guiada.

## Vocabulario previo

- **Endpoint:** método HTTP y ruta que identifican una operación.
- **Request:** solicitud enviada por el cliente.
- **Response:** respuesta con status, headers y body.
- **Promise:** objeto que representa un resultado disponible después.
- **JSON:** formato de texto usado para transportar datos estructurados.
- **DTO:** estructura que cruza la frontera entre cliente y servidor.
- **Caso de prueba:** comportamiento concreto con entrada y resultado esperado.
- **Expectativa:** comparación que debe cumplirse para que un caso pase.
