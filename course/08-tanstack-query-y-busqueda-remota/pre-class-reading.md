# Lectura previa · Sesión 08

## Antes de empezar

- **Tiempo estimado:** 20 minutos.
- **Objetivo:** reconocer cómo una query key separa datos en caché y por qué una consulta diferida necesita distinguir `pending` de una petición real.

## Conocimientos previos

Necesitas reconocer `Promise`, DTO, fetcher y adapter desde la sesión 07, además de eventos, estado local y formularios controlados de las sesiones anteriores. No necesitas conocer TanStack Query.

No necesitas implementar código. Lee los fragmentos indicados y relaciona cada idea con `searchMedia({ query, mediaType })` de la sesión 07.

## Fuente 1 · Query keys

Lee la guía oficial [Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys), desde la introducción hasta la sección **If your query function depends on a variable, include it in your query key**.

- **Organización:** TanStack.
- **Versión:** TanStack Query v5 para React.
- **Verificada:** 31 de agosto de 2026.
- **Motivo:** presenta la identidad de caché y la obligación de incluir las variables que usa la query function.

Mientras lees, identifica:

- por qué la key superior es un arreglo;
- qué propiedad debe cumplir para identificar datos;
- qué ocurre cuando la query function depende de una variable;
- por qué el orden de elementos del arreglo sí importa;
- cómo un objeto serializable puede formar parte de la key.

Trasládalo a estos dos casos:

```text
Dune + movie
Dune + series
```

Aunque el texto sea igual, el tipo cambia el recurso solicitado. Por eso no deben compartir una sola entrada de caché.

## Fuente 2 · Consultas diferidas

Lee la guía oficial [Disabling/Pausing Queries](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries), desde **Disabling/Pausing Queries** hasta el final de **isLoading (Previously: isInitialLoading)**. La sección posterior sobre `skipToken` queda fuera de esta lectura.

- **Organización:** TanStack.
- **Versión:** TanStack Query v5 para React.
- **Verificada:** 31 de agosto de 2026.
- **Motivo:** diferencia una consulta pendiente de una petición activa y muestra el caso de un formulario diferido.

Mientras lees, diferencia:

- `status: pending`;
- `fetchStatus: idle`;
- `isLoading`;
- una query deshabilitada permanentemente;
- una lazy query que espera una condición visible.

En la sesión se usará una lazy query: la aplicación esperará una búsqueda enviada y válida. No se llamará `refetch()` para pasar parámetros.

## Vocabulario que debes reconocer

- **Query key:** identidad serializable de una entrada de caché.
- **Query function:** función que devuelve la Promise asociada a la key.
- **Lazy query:** consulta que espera una condición antes de ejecutar la primera petición.
- **`status`:** estado de disponibilidad de datos.
- **`fetchStatus`:** estado de ejecución de la query function.
- **`isLoading`:** primera petición activa de una lazy query.

## Lleva a clase

- El checkpoint funcional de la sesión 07.
- `.env.local` con la URL entregada por el docente; no publiques su contenido.
- DevTools del navegador disponibles.
- Una frase propia que complete: “La query key debe cambiar cuando…”.

No instales TanStack Query antes de la clase. Las versiones y el lugar del provider se decidirán con el grupo.
