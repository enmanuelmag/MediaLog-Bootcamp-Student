# Guía estudiantil · Sesión 01 · React, Vite y JSX

- **Modalidad:** virtual
- **Duración:** 90 minutos
- **Preparación:** [lectura previa](pre-class-reading.md)

## Objetivo

Crearás un proyecto React con Vite y pnpm, seguirás su punto de entrada y construirás este árbol:

```text
App
├── AppHeader
└── main
    └── MediaCard
```

Al terminar podrás explicar qué declara un componente, cómo se usa dentro de JSX y qué archivo conecta la aplicación con el navegador.

## Conocimientos previos

- Etiquetas HTML básicas.
- Funciones de JavaScript.
- Uso básico de una terminal y un editor.
- Lectura previa completada.

Esta sesión no requiere props, estado, eventos ni TypeScript avanzado.

## Referencias para retomar

El proyecto se llama `MediaLog-Bootcamp`; `package.json` usa `medialog-bootcamp`. Si debes recuperar un bloque, informa qué comprobaste y cuál fue el último cambio guardado. El docente dispone de estas referencias:

| Bloque terminado | Referencia | Qué debería funcionar |
| --- | --- | --- |
| S01-B03 · Scaffold | `session-01-step-01-scaffold` | Template instalado y servidor abierto. |
| S01-B05 · Pantalla estática | `session-01-step-02-static-screen` | Encabezado y tarjeta dentro de `App`. |
| S01-B06 · Encabezado | `session-01-step-03-app-header` | `AppHeader` extraído; tarjeta todavía en `App`. |
| S01-B07 · Tarjeta | `session-01-end` | `App` compone ambos componentes sin props. |

Trabaja sobre tu propia copia. Si no terminaste una extracción, retoma ese cambio antes de comenzar props en la sesión siguiente. Una copia de respaldo permite continuar, pero todavía debes explicar la transformación pendiente. No descartes tus archivos para cambiar de referencia.

## Punto de partida

Comienza en la carpeta donde crearás el proyecto. No debe existir todavía `MediaLog-Bootcamp`.

Comprueba tu entorno:

```bash
node --version
pnpm --version
```

Necesitas:

- Node.js `22.22.0` o superior.
- pnpm `11.17.0`.
- Un editor.
- React DevTools en el navegador.

Si una versión no coincide, muestra al docente el comando y su salida antes de instalar dependencias.

## 1. Crear el proyecto

Ejecuta un comando por vez:

```bash
pnpm create vite@9.2.0 MediaLog-Bootcamp --template react-ts --no-interactive
cd MediaLog-Bootcamp
pnpm pkg set name=medialog-bootcamp packageManager=pnpm@11.17.0
pnpm pkg set devDependencies.typescript=6.0.3 devDependencies.vite=8.2.2
pnpm pkg set 'engines.node=>=22.22.0'
pnpm pkg set dependencies.react=19.2.8 'dependencies["react-dom"]'=19.2.8
pnpm install
pnpm dev
```

Abre en el navegador la URL que muestra Vite.

Comprueba la configuración:

```bash
pnpm pkg get packageManager
pnpm pkg get dependencies.react 'dependencies["react-dom"]'
```

Resultado esperado:

- `packageManager` indica `pnpm@11.17.0`.
- `name` indica `medialog-bootcamp`; Vite usa `8.2.2` y TypeScript `6.0.3`.
- React y React DOM indican `19.2.8`.
- Existe `pnpm-lock.yaml`.
- No existe `package-lock.json`, `yarn.lock` o `bun.lock`.

No cierres la terminal donde se ejecuta `pnpm dev`.

## 2. Reconocer los archivos iniciales

Abre estos archivos en orden:

1. `package.json`.
2. `index.html`.
3. `src/main.tsx`.
4. `src/App.tsx`.

Localiza:

- los scripts `dev` y `build` en `package.json`;
- `<div id="root"></div>` en `index.html`;
- `createRoot`, `StrictMode` y `<App />` en `src/main.tsx`;
- la pantalla demostrativa en `src/App.tsx`.

Completa esta cadena en tus notas:

```text
index.html → __________ → App.tsx
```

### Checkpoint 1

Puedes señalar el archivo que contiene `#root`, el archivo que llama `createRoot` y el componente que describe la pantalla.

## 3. Reemplazar la demostración de Vite

La pantalla generada contiene imágenes, enlaces y un contador de ejemplo. Retira de `src/App.tsx`:

- el import de `useState`;
- los imports de imágenes;
- el import de `App.css`;
- el contador y el contenido demostrativo.

Elimina desde el explorador del editor `src/App.css` y los archivos de `src/assets/` que ya no se importan. Conserva `src/index.css`.

El template de referencia contiene `hero.png`, `react.svg` y `vite.svg` dentro de `src/assets/`. Después de retirar el JSX demostrativo, elimina también `public/icons.svg` y `public/favicon.svg`. En `index.html`, retira la línea del favicon, cambia `lang` a `es` y escribe `MediaLog Bootcamp` dentro de `title`. Conserva `#root` y el script de entrada.

Dentro de `App`, construye primero una sola pantalla con:

```text
Fragment
├── header
│   ├── nombre Medialog
│   ├── título principal
│   └── descripción
└── main
    ├── título Catálogo destacado
    └── article
        ├── poster pendiente
        ├── tipo y año
        ├── título de una película
        └── descripción
```

Usa estas clases para que el estilo compartido coincida:

- `app-header`
- `app-header__eyebrow`
- `page-container`
- `media-card`
- `media-card__poster`
- `media-card__meta`

Copia este bloque en `src/index.css`. Los estilos sostienen el resultado visual; no forman el concepto principal de la sesión.

```css
:root {
  font-family: Inter, system-ui, sans-serif;
  color: #f5f1e8;
  background: #141412;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

.app-header,
.page-container {
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
}

.app-header {
  padding: 64px 0 32px;
  border-bottom: 1px solid #3b3a34;
}

.app-header__eyebrow,
.media-card__meta {
  color: #d2a84a;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-container {
  padding: 32px 0 64px;
}

.media-card {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  padding: 24px;
  border: 1px solid #3b3a34;
  border-radius: 16px;
  background: #1d1d1a;
}

.media-card__poster {
  display: grid;
  min-height: 220px;
  place-items: center;
  border-radius: 10px;
  color: #a9a59a;
  background: #2a2924;
}

@media (max-width: 600px) {
  .media-card {
    grid-template-columns: 1fr;
  }
}
```

### Checkpoint 2

El navegador muestra el encabezado y una tarjeta. Todo el JSX vive todavía dentro de `App` y el archivo no importa `useState`.

## 4. Observar la extracción de AppHeader

El docente extraerá el encabezado hacia:

```text
src/components/app-header.tsx
```

Durante la demostración, identifica:

1. La función `AppHeader`.
2. El `export` del archivo nuevo.
3. El `import` que aparece en `App.tsx`.
4. El elemento `<AppHeader />` que reemplaza al bloque anterior.

Anota con tus palabras:

```text
AppHeader =
<AppHeader /> =
```

Abre React DevTools y localiza `AppHeader` debajo de `App`.

### Checkpoint 3

La pantalla conserva el mismo encabezado, pero React DevTools muestra un componente llamado `AppHeader`.

## 5. Extraer MediaCard con el grupo

Antes de crear el archivo, responde:

- ¿Qué bloque completo representa un medio?
- ¿Qué nombre comunica esa responsabilidad?
- ¿Qué parte debe conservar `App`?

Crea:

```text
src/components/media-card.tsx
```

Mueve el `article` completo. Declara y exporta una función llamada `MediaCard`. Después:

1. Importa `MediaCard` en `App.tsx`.
2. Usa `<MediaCard />` dentro de `main`.
3. Retira el `article` antiguo de `App`.
4. Comprueba que la pantalla no duplique la tarjeta.

El árbol esperado de archivos es:

```text
src/
├── components/
│   ├── app-header.tsx
│   └── media-card.tsx
├── App.tsx
├── index.css
└── main.tsx
```

La estructura de `App` debe quedar así:

```tsx
function App() {
  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <MediaCard />
      </main>
    </>
  )
}
```

### Checkpoint 4

- `App` compone `AppHeader` y `MediaCard`.
- React DevTools muestra ambos componentes.
- `MediaCard` sigue usando datos fijos.
- No existen props, listas ni estado.

## 6. Práctica individual

Realiza estas tres acciones sin modificar `App.tsx`:

1. Cambia la descripción secundaria de `AppHeader`.
2. Cambia título, año y descripción dentro de `MediaCard`.
3. Quita el cierre de una etiqueta, lee el error del editor y corrígelo.

Después escribe el árbol:

```text
App
├── AppHeader
└── main
    └── MediaCard
```

Explica a otra persona:

- qué componente es padre de `MediaCard`;
- por qué `MediaCard` comienza con mayúscula;
- por qué no creamos un componente separado para el título de sección.

## 7. Comprobar el checkpoint final

Conserva `pnpm dev` en la primera terminal. Abre otra terminal dentro de `MediaLog-Bootcamp` y ejecuta:

```bash
pnpm build
```

Comprueba:

- El comando termina con código de salida 0.
- El navegador sigue mostrando el encabezado y una tarjeta.
- React DevTools muestra `App`, `AppHeader` y `MediaCard`.
- Puedes seguir `index.html → main.tsx → App.tsx`.

Estas pruebas tienen límites distintos:

- `pnpm build` comprueba TypeScript y la generación de archivos de producción.
- `pnpm dev` y el navegador comprueban el resultado visual local.
- React DevTools comprueba el árbol de componentes montado.

Todavía no has comprobado props, estado, una API o un despliegue.

## Errores frecuentes

### El componente comienza en minúscula

Las etiquetas del navegador usan minúscula. Los componentes propios comienzan con mayúscula:

```tsx
<MediaCard />
```

### El editor no encuentra el import

Comprueba:

- nombre del archivo en `kebab-case`;
- nombre de la función en `PascalCase`;
- export en el archivo del componente;
- ruta relativa desde `App.tsx`.

### La tarjeta aparece dos veces

Revisa si `App` conserva el `article` antiguo además de `<MediaCard />`. Debe existir una sola representación de la tarjeta.

### La página queda en blanco

Lee el primer error de la terminal o del editor. Busca una etiqueta sin cerrar, un import inválido o un componente sin export antes de cambiar dependencias.

### Quieres añadir props

Conserva la idea para la sesión 02. El checkpoint actual necesita una tarjeta fija para mostrar por qué un componente configurable resuelve un problema real.

## Vocabulario

- **Componente:** función que devuelve una parte de la interfaz.
- **Elemento JSX:** uso de un componente o etiqueta dentro del marcado, como `<MediaCard />`.
- **Composición:** combinación de componentes dentro de otros componentes.
- **Responsabilidad:** parte de la interfaz que puedes reconocer y nombrar.
- **Árbol de componentes:** relación entre componentes padres e hijos.
- **Scaffold:** conjunto inicial de archivos creado por una herramienta.
- **Lockfile:** archivo que registra las versiones resueltas de las dependencias.
- **`StrictMode`:** wrapper que activa comprobaciones adicionales durante desarrollo.

## Evidencia y entrega

Entrega en la plataforma institucional:

1. Un ZIP de `MediaLog-Bootcamp` sin `node_modules/` ni `dist/`.
2. El archivo `pnpm-lock.yaml` dentro del ZIP.
3. Un texto de tres líneas con:
   - el árbol de componentes;
   - la cadena `index.html → main.tsx → App.tsx`;
   - el resultado observado al ejecutar `pnpm build`.

No incluyas contraseñas, tokens, variables de entorno ni carpetas de dependencias.

## Punto de partida de la sesión 02

`MediaCard` representa una sola película porque sus datos viven dentro del componente. La siguiente sesión convertirá esa tarjeta en un componente configurable y renderizará una colección sin duplicar su estructura.
