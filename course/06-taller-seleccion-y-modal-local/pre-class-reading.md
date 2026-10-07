# Lectura previa · Sesión 06 · Selección y estado compartido

## Propósito

Llegar a la sesión con un criterio para guardar una selección sin duplicar objetos y reconocer por qué un estado compartido pertenece al ancestro común de los componentes que lo usan.

- **Tiempo estimado:** 20 minutos
- **Stack de la cohorte:** React `19.2.8`, TypeScript `6.0.3`, Mantine `9.4.1` y pnpm `11.17.0`
- **Fecha de verificación de fuentes:** 30 de agosto de 2026

## Conocimientos previos

- Componentes, props y callbacks.
- `useState` y valores derivados durante el render.
- `map`, `filter`, `find` y keys estables.
- Checkpoint completo de la sesión 05.
- Flujo `App → MediaGrid → MediaCard`.

No necesitas conocer Mantine, Zustand, Context API, HTTP, Effects ni estado remoto.

## Fuente principal · Guardar la identidad seleccionada

**React · [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)**

Lee únicamente:

1. `Avoid duplication in state`.
2. El resumen de la página, solo el punto sobre patrones de selección.

Detén la lectura antes de `Avoid deeply nested state` y no completes los retos.

Concéntrate en el ejemplo que cambia:

```text
selectedItem como objeto
→ selectedId como identidad
→ selectedItem calculado con find
```

Busca respuestas para estas preguntas:

- ¿Qué información se duplica al guardar el objeto seleccionado?
- ¿Qué dato esencial permanece después de retirar esa duplicación?
- ¿Cómo se recupera el objeto completo?
- ¿Por qué el resultado vuelve a calcularse después de actualizar la lista o la selección?

La sesión aplicará la misma idea a un `MediaItem` local.

## Fuente secundaria · Compartir estado desde el ancestro común

**React · [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)**

Lee estas secciones:

1. Introducción y `You will learn`.
2. Los tres pasos enumerados dentro de `Lifting state up by example`.
3. `A single source of truth for each state`.

No completes los retos.

Identifica:

- qué componente debe poseer un estado que coordina dos ramas;
- qué información baja mediante props;
- cómo permiten los handlers que un hijo solicite un cambio;
- qué significa tener una fuente de verdad para cada estado.

## Recorrido sugerido

1. Dedica 10 minutos al ejemplo de selección por id.
2. Dibuja `items`, `selectedId` y `selectedItem`.
3. Dedica 8 minutos a los tres pasos para elevar estado.
4. Dibuja un padre con dos hijos y coloca el estado en el padre.
5. Usa los últimos 2 minutos para revisar el vocabulario y anotar una duda.

No modifiques todavía el proyecto. La sesión construirá el recorrido sobre el checkpoint de filtros.

## Vocabulario previo

- **Selección:** identidad que representa el elemento elegido.
- **Duplicación:** misma información almacenada en más de un lugar.
- **Identidad:** valor estable que permite localizar un elemento.
- **Estado derivado:** valor calculado desde props o estado disponible.
- **Ancestro común:** componente más cercano que contiene las ramas que necesitan coordinarse.
- **Callback:** función que un componente puede ejecutar para comunicar una acción.
- **Fuente de verdad:** componente que conserva la versión autoritativa de un estado.
