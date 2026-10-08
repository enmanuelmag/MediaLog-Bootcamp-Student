# MediaLog Bootcamp

Frontend progresivo del curso. Paquete `medialog-bootcamp`; Node >=22.22.0 y pnpm 11.17.0. `main` conserva el inicio sin aplicación. Las referencias implementadas llegan a la sesión 11 y se distribuyen gradualmente por el docente.

## Sesión 11 · Formularios, Zod y modal global

Presentación continua → coding guiado → práctica → cierre oral. Partimos del detalle público terminado en la sesión 10.

| Orden | Referencia | Resultado |
| --- | --- | --- |
| Inicio | `session-11-start` | Idéntico a `session-10-end`: búsqueda y detalle público. |
| 1 | `session-11-step-01-modal-store` | Un modal compartido y un botón temporal para abrirlo. |
| 2 | `session-11-step-02-modal-entrypoints` | Abrir el mismo modal desde una tarjeta o el detalle. |
| 3 | `session-11-step-03-form-schema` | Reglas Zod y botón temporal para probar datos válidos e inválidos. |
| 4 | `session-11-step-04-form-fields` | Estado, prioridad y notas con Mantine Form; mostrar valores válidos. |
| 5 | `session-11-step-05-body-preview` | Preparar y mostrar el body; limpiar la vista previa al editar. |
| 6 | `session-11-step-06-adapter-tests` | Cinco pruebas puras de la transformación de datos. |
| Cierre | `session-11-end` | Código de step-06 y materiales públicos de la sesión. |

Guarda tu trabajo antes de cambiar de rama. Las referencias de solución permanecen locales hasta que el docente las distribuya; publicar todas las ramas también publicaría la solución del taller.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm lint
pnpm build
pnpm preview
```

Antes de `pnpm dev`, si no existe `.env.local`, copia `.env.example`. Su variable pública es `VITE_API_URL=https://bootcamp-medialog.cardor.dev`; no requiere credenciales. No sobrescribas una configuración existente sin revisarla.

Desde `/search` o `/media/:mediaType/:externalId`, pulsa **Agregar a mi biblioteca**. Zustand conserva el tipo y el ID del medio elegido; un único modal recibe esos datos. Mantine Form gestiona los campos y sus errores. Zod comprueba los valores antes de preparar el body.

El adapter combina el tipo y el ID con el formulario, añade `source: 'catalog'` y convierte las notas vacías en `null`. **Preparar body** muestra el resultado local: todavía no guarda un registro ni envía una petición de creación. La búsqueda heredada sí utiliza POST. Editar un campo limpia la vista previa; cerrar y abrir de nuevo inicia un formulario limpio.

### Material de la sesión 11

- [Guía estudiantil Markdown](course/11-formularios-zod-y-modal-global/student-guide.md)
- [Guía estudiantil HTML](course/11-formularios-zod-y-modal-global/student-guide.html)
- [Lectura previa Markdown](course/11-formularios-zod-y-modal-global/pre-class-reading.md)
- [Lectura previa HTML](course/11-formularios-zod-y-modal-global/pre-class-reading.html)
- [Control de lectura](course/11-formularios-zod-y-modal-global/reading-check.md)
- [Presentación PDF](course/11-formularios-zod-y-modal-global/presentation.pdf)

Las guías docentes y claves permanecen en el repositorio privado del curso. Los materiales de 01–10 se conservan en `course/`, incluido el [taller y rúbrica de la sesión 10](course/10-taller-detalle-publico-y-effects/workshop-rubric.md). Su punto de partida sigue siendo `session-10-workshop-start`. La sesión 12 todavía no tiene checkpoint ejecutable.

La suite pura verifica adapters, no red ni DOM. El build verifica tipos y empaquetado, no despliegue. Las pruebas de navegador con respuestas controladas no demuestran disponibilidad del servidor público. El ritmo de aula sigue pendiente de medición con estudiantes.
