# Lectura previa · Sesión 05 · Estado derivado y filtros locales

## Propósito

Llegar a la sesión con un criterio inicial para decidir qué debe conservar React y qué puede calcularse durante el render. Usarás ese criterio para añadir un filtro por tipo sin duplicar la colección visible.

- **Tiempo estimado:** 20 minutos
- **Stack de la cohorte:** React `19.2.8`, TypeScript `6.0.3` y pnpm `11.17.0`
- **Fecha de verificación de fuentes:** 30 de agosto de 2026

## Conocimientos previos

- Props y callbacks.
- `useState` en el nivel superior de un componente.
- Input controlado con `value` y `onChange`.
- `map`, `filter`, `includes` y operadores booleanos.
- Checkpoint completo de la sesión 04.

No necesitas conocer Effects, memoización, Mantine, stores ni estado remoto.

## Fuente principal · Elegir la estructura del estado

**React · [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)**

Lee estas secciones:

1. `Principles for structuring state`.
2. `Group related state`.
3. `Avoid redundant state`.

Detén la lectura antes de `Avoid duplication in state`.

Busca respuestas para estas preguntas:

- ¿Qué significa que dos variables de estado siempre cambien juntas?
- ¿Cuándo un valor resulta redundante?
- ¿Qué problemas aparecen cuando dos valores de estado se contradicen?
- ¿Por qué conviene calcular durante el render lo que ya puede obtenerse desde props o estado?

La sesión conservará `query` y `mediaTypeFilter` porque cambian de forma independiente. La colección y el contador se obtendrán desde esos valores.

## Fuente secundaria · Control y fuente de verdad

**React · [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)**

Lee únicamente:

1. `Controlled and uncontrolled components`.
2. `A single source of truth for each state`.

Identifica:

- qué información importante recibe por props un componente controlado;
- cómo comunica el hijo una intención de cambio;
- qué significa elegir una fuente de verdad para cada estado;
- por qué una aplicación puede contener distintas fuentes de verdad para estados diferentes.

No completes los retos de la página.

## Recorrido sugerido

1. Dedica 12 minutos a las tres secciones sobre estructura del estado.
2. Dibuja dos columnas: `React recuerda` y `JavaScript calcula`.
3. Coloca `query` en la primera y `visibleMedia` en la segunda.
4. Dedica 6 minutos a las secciones sobre componentes controlados.
5. Usa los últimos 2 minutos para revisar el vocabulario y anotar una duda.

No modifiques todavía el proyecto. La clase construirá el segundo control de forma guiada.

## Vocabulario previo

- **Estado mínimo:** valores que la interfaz necesita recordar y no puede obtener desde otras entradas.
- **Estado redundante:** dato almacenado que puede calcularse desde props o estado existente.
- **Estado derivado:** resultado calculado durante el render.
- **Fuente de verdad:** componente que conserva la versión autoritativa de un estado.
- **Componente controlado:** componente cuyo valor relevante proviene de props.
- **Prop de callback:** función con la que un hijo comunica una acción al padre.
- **Predicado:** condición que decide si un elemento permanece en un filtro.
