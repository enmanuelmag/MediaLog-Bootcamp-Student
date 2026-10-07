# Lectura previa · Sesión 04 · Eventos y `useState`

## Propósito

Llegar a la sesión con una explicación inicial de por qué una variable local no basta para conservar una interacción y reconocer las dos partes de un input controlado. Durante la clase usarás esas ideas para buscar películas y series por título.

- **Tiempo estimado:** 20 minutos
- **Stack de la cohorte:** React `19.2.8`, TypeScript `6.0.3` y pnpm `11.17.0`
- **Fecha de verificación de fuentes:** 29 de agosto de 2026

## Conocimientos previos

- Componentes y props.
- Funciones y eventos básicos del navegador.
- Arreglos y métodos de JavaScript.
- Checkpoint completo de la sesión 03.
- Flujo `mediaItems → App → MediaGrid`.

No necesitas conocer Effects, formularios completos, APIs, stores ni estado remoto.

## Fuente principal · Estado como memoria del componente

**React · [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)**

Lee estas secciones:

1. Introducción y `You will learn`.
2. `When a regular variable isn't enough`.
3. `Adding a state variable`.
4. `Meet your first Hook`.
5. `Anatomy of useState`.

Detén la lectura antes de `Giving a component multiple state variables` y no completes los retos.

Busca respuestas para estas preguntas:

- ¿Qué dos problemas presenta una variable local entre renders?
- ¿Qué dos elementos devuelve `useState`?
- ¿Qué hace el setter?
- ¿Dónde se puede declarar un Hook?
- ¿Qué información necesita recordar la interfaz cuando una persona escribe?

La documentación muestra React 19.2. El proyecto del curso fija React `19.2.8`.

## Fuente secundaria · Controlar un input desde React

**React · [`<input>`](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)**

Lee únicamente:

1. `Controlling an input with a state variable`.
2. El primer bloque `Pitfall` que explica qué ocurre al pasar `value` sin actualizarlo en `onChange`.

Detén la lectura antes de `Optimizing re-rendering on every keystroke`.

Identifica:

- la prop que fija el valor visible del input;
- el evento que comunica cada edición;
- la actualización que debe ocurrir durante el handler;
- el valor inicial recomendado para un campo de texto vacío.

La sesión usa un input de búsqueda, pero conserva el mismo circuito `value → onChange → setter` del ejemplo oficial.

## Recorrido sugerido

1. Dedica 12 minutos a las secciones indicadas sobre estado.
2. Dibuja dos cajas: `React recuerda` y `JavaScript calcula`.
3. Coloca `query` en la primera y `mediaItems.length` en la segunda.
4. Dedica 6 minutos a la sección del input controlado.
5. Usa los últimos 2 minutos para revisar el vocabulario y anotar una duda.

No modifiques todavía el proyecto. La clase comenzará desde el catálogo estático para observar cada cambio.

## Vocabulario previo

- **Evento:** información que el navegador produce después de una interacción.
- **Handler:** función que responde a un evento.
- **Hook:** función de React cuyo nombre comienza con `use`.
- **Estado:** memoria que React conserva entre renders para una posición del árbol.
- **Variable de estado:** valor actual que React entrega al componente durante un render.
- **Setter:** función que solicita un render con otro valor de estado.
- **Render:** ejecución con la que React calcula la interfaz de un componente.
- **Input controlado:** campo cuyo valor visible proviene de React.
