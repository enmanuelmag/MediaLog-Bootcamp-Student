# Lectura previa · Sesión 11 · Store y validación local

- **Tiempo estimado:** 20 minutos
- **Verificación de fuentes:** 8 de octubre de 2026
- **Versiones del curso:** Zustand `5.0.15`, Mantine Form `9.4.1`, Zod `4.4.3`

## Propósito

Reconocer cómo un store tipado comparte los datos del medio elegido y cómo Mantine conecta un schema síncrono con una sesión de formulario.

## Conocimientos previos

- `useState`, props y callbacks.
- Tipo e ID del medio: `mediaType + externalId`.
- Modal controlado de Mantine.
- Tipos literales y arrays `as const`.

## Fuente 1 · Zustand

Lee [create](https://zustand.docs.pmnd.rs/reference/apis/create.html) en:

- `Types` y `Signature`;
- `Parameters` y `Returns`;
- el primer ejemplo de actualización;
- la nota sobre shallow merge.

Busca estas ideas:

- `create<State>()(...)` produce un hook tipado;
- `set` actualiza el estado;
- un selector elige la porción que consume un componente;
- el store puede exponer valores y acciones.

## Fuente 2 · Mantine Form

Lee [Form schema validation](https://mantine.dev/form/schema-validation/) desde el ejemplo básico de Zod hasta la explicación de validación síncrona y asíncrona.

Busca estas ideas:

- Zod 4 se importa desde `zod/v4`;
- `schemaResolver` se importa desde `@mantine/form`;
- el ejemplo usa `mode: "uncontrolled"`;
- `{ sync: true }` corresponde a un schema síncrono.

## Vocabulario previo

- **Store externo:** estado accesible mediante un hook compartido.
- **Selector:** función que elige un valor o acción del store.
- **Schema:** regla ejecutable para aceptar o rechazar datos.
- **Resolver:** adaptación entre el resultado del schema y los errores del formulario.
- **Modo uncontrolled:** modo donde Mantine conserva los valores actuales sin actualizar `form.values` en cada tecla.
