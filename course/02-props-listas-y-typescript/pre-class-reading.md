# Lectura previa · Sesión 02 · Props, listas y TypeScript

## Propósito

Llegar a la sesión con una definición de prop y reconocer tres formas de TypeScript que usaremos para describir los datos de una película o serie. Durante la clase convertirás la tarjeta fija de la sesión 01 en un componente que representa seis medios distintos.

- **Tiempo estimado:** 22 minutos
- **Stack de la cohorte:** React `19.2.8`, TypeScript `6.0.3` y pnpm `11.17.0`
- **Fecha de verificación de fuentes:** 29 de agosto de 2026

## Conocimientos previos

- Proyecto de la sesión 01 terminado.
- Diferencia entre declarar `MediaCard` y usar `<MediaCard />`.
- Objetos y arreglos de JavaScript.
- Acceso a una propiedad con `objeto.propiedad`.
- Funciones con parámetros.

No necesitas conocer estado, eventos, APIs ni tipos avanzados.

## Fuente principal · Pasar props a un componente

**React · [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)**

Lee estas secciones:

1. `Passing props to a component`.
2. `Step 1: Pass props to the child component`.
3. `Step 2: Read props inside the child component`.
4. `How props change over time`.
5. `Recap`.

Omite `Specifying a default value for a prop`, `Forwarding props with the JSX spread syntax` y `Passing JSX as children`. Esos recursos no forman parte de esta sesión.

Busca respuestas para estas preguntas:

- ¿Dónde escribe el componente padre una prop?
- ¿Cómo lee el componente hijo las props recibidas?
- ¿Qué significa que las props sean de solo lectura?
- ¿Quién debe entregar un dato nuevo cuando la interfaz necesita representar otro valor?

La documentación corresponde a React 19. El proyecto del curso fija React `19.2.8`.

## Fuente secundaria · Tipos cotidianos de TypeScript

**TypeScript · [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)**

Lee únicamente:

1. `Arrays`.
2. `Object Types`.
3. `Union Types` hasta terminar `Defining a Union Type`.
4. `Type Aliases`.
5. `Literal Types` hasta el primer ejemplo de strings literales.
6. `null and undefined` hasta terminar `strictNullChecks on`.

Detén la lectura antes de `Non-null Assertion Operator`. La sesión no usa `!`, assertions, enums o genéricos.

Identifica:

- cómo se escribe un arreglo de elementos de tipo `MediaItem`;
- cómo un alias nombra la forma de un objeto;
- cómo una unión limita un valor a varias posibilidades;
- por qué `string | null` exige reconocer el caso nulo.

El checkpoint usa TypeScript `6.0.3` con comprobaciones estrictas. La documentación del Handbook se verificó contra ese uso el 29 de agosto de 2026.

## Recorrido sugerido

1. Dedica 11 minutos a la fuente de React.
2. Escribe un ejemplo corto con un padre que entregue `title` y un hijo que lo lea.
3. Dedica 9 minutos a las secciones indicadas de TypeScript.
4. Usa los últimos 2 minutos para revisar el vocabulario y anotar una duda.

No modifiques todavía `MediaCard`. La clase comenzará desde el mismo componente fijo para hacer visible la transformación.

## Vocabulario previo

- **Prop:** dato que un componente padre entrega a un hijo mediante JSX.
- **Destructuring:** sintaxis que extrae propiedades de un objeto por nombre.
- **Contrato:** conjunto de propiedades y tipos que debe cumplir un dato.
- **Alias de tipo:** nombre creado con `type` para referirse a una forma de datos.
- **Unión:** tipo formado por varias posibilidades válidas.
- **Literal:** valor concreto usado como tipo, como `"movie"`.
- **`null`:** valor que representa una ausencia explícita.
- **Arreglo tipado:** arreglo cuyos elementos deben cumplir un tipo determinado.
