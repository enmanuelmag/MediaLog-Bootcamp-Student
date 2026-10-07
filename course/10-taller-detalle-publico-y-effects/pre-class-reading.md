# Lectura previa · Sesión 10 · Consultas dependientes y Effects

- **Tiempo estimado:** 20 minutos
- **Propósito:** reconocer cuándo una query debe esperar un input y cuándo React necesita sincronizarse con un sistema externo.

No necesitas memorizar una API. Lee con una pregunta en mente: ¿quién debe ser propietario de cada cambio?

## Fuente 1 · TanStack Query

Lee [Disabling/Pausing Queries](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries) desde el inicio hasta la explicación de `isLoading`.

Mientras lees, identifica:

- qué hace `enabled: false`;
- qué ocurre si una query deshabilitada no tiene datos en caché;
- la diferencia entre `status` y `fetchStatus`;
- por qué `isLoading` permite detectar la primera carga real;
- por qué una dependencia disponible después no obliga a convertir la query en una llamada imperativa.

### Situación para observar

Una página recibe identidad desde una URL. Mientras la identidad sea inválida, la query debe existir en el mismo lugar del componente, pero no debe ejecutar una request.

```text
input válido      → query habilitada → puede solicitar datos
input inexistente → query declarada  → no solicita datos
```

No copies el ejemplo de la documentación. Explica qué problema resuelve `enabled`.

## Fuente 2 · React

Lee [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) en estas secciones:

1. **What are Effects and how are they different from events?**
2. **Step 3: Add cleanup if needed**
3. **How to handle the Effect firing twice in development?**

Mientras lees, identifica:

- qué convierte una operación en sincronización con un sistema externo;
- por qué un evento de usuario y un Effect no representan el mismo momento;
- cuándo React ejecuta cleanup;
- qué intenta revelar el ciclo adicional de desarrollo;
- por qué retirar Strict Mode no corrige un Effect incompleto.

### Situación para observar

`document.title` vive fuera del árbol de React. Una pantalla puede asignar un título al montarse y restaurar el anterior al desmontarse.

```text
setup   → recordar título anterior → asignar título del medio
cleanup → restaurar título anterior
```

## Conexión con el proyecto

La sesión 09 dejó esta cadena:

```text
Link → URL → params → GetMediaDetailInput | null
```

La sesión 10 completará:

```text
input nullable → query de detalle → DTO → modelo visual → contenido
                                                    └→ document.title
```

TanStack Query administrará los datos remotos. El Effect administrará únicamente la sincronización con el título del documento.
