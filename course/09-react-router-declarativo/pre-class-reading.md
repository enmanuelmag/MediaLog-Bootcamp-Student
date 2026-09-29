# Lectura previa · Sesión 09

## Antes de empezar

- **Tiempo estimado:** 20 minutos.
- **Objetivo:** reconocer cómo React Router relaciona una URL con una página y cómo una ruta padre comparte estructura mediante `Outlet`.

## Conocimientos previos

Necesitas reconocer componentes, props, estado local, DTO, adapter y query key. También debes poder localizar `mediaType` y `externalId` dentro del modelo visual construido en la sesión 08.

No instales Router ni copies ejemplos completos. La clase fijará la versión, el lugar del provider y el árbol de rutas.

## Fuente 1 · Elegir un modo

Lee [Picking a Mode](https://reactrouter.com/start/modes) en la documentación oficial de React Router.

- **Organización:** Remix Software / React Router.
- **Versión:** React Router 8.3.1.
- **Verificada:** 31 de agosto de 2026.
- **Secciones:** introducción, **Declarative**, **Data** y **Framework**.
- **Motivo:** permite reconocer qué añade cada modo y por qué este proyecto puede conservar TanStack Query como propietario de los datos remotos.

Mientras lees, identifica:

- qué ofrece el modo declarativo;
- qué capacidades adicionales aparecen en Data Mode;
- qué añade Framework Mode sobre Data Mode;
- qué modo permite usar componentes como `BrowserRouter`, `Routes` y `Route`;
- por qué elegir un modo no obliga a reemplazar la librería que ya administra el caché remoto.

El curso usará **Declarative Mode**. No usará loaders, actions, route modules ni Framework Mode.

## Fuente 2 · Declarar rutas

Lee [Routing](https://reactrouter.com/start/declarative/routing) en la documentación oficial.

- **Organización:** Remix Software / React Router.
- **Versión:** React Router 8.3.1.
- **Verificada:** 31 de agosto de 2026.
- **Secciones:** **Configuring Routes**, **Nested Routes**, **Layout Routes**, **Index Routes**, **Route Prefixes**, **Dynamic Segments** y **Linking**.
- **Motivo:** presenta el árbol que construiremos y el vocabulario de rutas padre, hijas, layouts, segmentos dinámicos y enlaces.

Mientras lees, localiza:

- dónde se declaran `Routes` y `Route`;
- qué componente renderiza el contenido de una ruta hija;
- cómo una layout route comparte interfaz sin añadir un segmento;
- qué significa `:externalId` dentro de un path;
- qué componente crea navegación declarativa.

Relaciona la lectura con este destino:

```text
/media/movie/123
```

En clase, `movie` llegará como `mediaType` y `123` como `externalId`. Ambos valores provienen de la URL y deben validarse antes de construir un input del dominio.

## Vocabulario que debes reconocer

- **SPA:** aplicación que cambia pantallas dentro del navegador sin descargar un documento HTML nuevo en cada navegación.
- **Ruta:** relación entre un patrón de URL y un elemento.
- **Segmento dinámico:** parte de un path que comienza con `:` y captura texto.
- **Ruta hija:** ruta declarada dentro de otra ruta.
- **Layout route:** ruta que comparte estructura con sus hijas.
- **`Outlet`:** lugar donde se renderiza la ruta hija coincidente.
- **`Link`:** componente para navegación iniciada por la persona.
- **Route params:** strings posiblemente ausentes capturados desde la URL.

## Lleva a clase

- El checkpoint funcional de la sesión 08.
- `.env.local` con la URL entregada por el docente; no publiques su contenido.
- DevTools del navegador disponibles.
- Una URL escrita en papel con esta forma: `/media/<tipo>/<identificador>`.

No instales `react-router` antes de la clase. El grupo comprobará los requisitos y aplicará una versión exacta.
