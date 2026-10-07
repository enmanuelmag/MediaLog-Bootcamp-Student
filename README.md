# MediaLog Bootcamp

Frontend progresivo del curso. Paquete `medialog-bootcamp`; Node >=22.22.0 y pnpm 11.17.0. `main` conserva el inicio sin aplicación. Las referencias implementadas llegan a la sesión 10 y se distribuyen gradualmente por el docente.

## Sesión 10 · Detalle público y Effects

Presentación continua → coding guiado → descanso → taller → revisión oral. Duración: 75 + 30 + 60 + 15 = 180 minutos.

| Orden | Referencia | Resultado |
| --- | --- | --- |
| Inicio | `session-10-start` | Idéntico a 09-end: URL validada y detalle provisional. |
| 1 | `session-10-step-01-detail-query` | Query nullable y dos identidades fijas. |
| 2 | `session-10-step-02-detail-model` | DTO local traducido a modelo visual. |
| 3 | `session-10-step-03-detail-preview` | Contenido y PageState con props de demostración. |
| 4 | `session-10-step-04-document-title` | Título con cleanup, sin logs. |
| 5 | `session-10-step-05-adapter-tests` | Tests puros del adapter. |
| Taller | `session-10-workshop-start` | Código de step-05 y material público; sin integración resuelta. |
| 6 | `session-10-step-06-route-query` | Params reales, ramas explícitas y modelo como diagnóstico. |
| 7 | `session-10-step-07-detail-composition` | Contenido y título reales; demostración retirada. |
| Cierre | `session-10-end` | Código de step-07 y materiales públicos; sin extra de reintento. |

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

Abre una tarjeta desde `/search`. El cierre presenta `/media/movie/:externalId` o `/media/series/:externalId` con datos de Query. Una URL inválida no solicita detalle. Carga, error y catálogo nulo se distinguen; el título vuelve a su valor anterior al salir. Si aún no hay respuesta por falta de conexión, la página lo indica sin leer datos inexistentes.

[Guía estudiantil](course/10-taller-detalle-publico-y-effects/student-guide.md) · [Lectura previa](course/10-taller-detalle-publico-y-effects/pre-class-reading.md) · [Control de lectura](course/10-taller-detalle-publico-y-effects/reading-check.md) · [Taller y rúbrica](course/10-taller-detalle-publico-y-effects/workshop-rubric.md).

Las guías docentes y claves permanecen en el repositorio privado del curso. Los materiales de 01–09 se conservan en `course/`. La próxima sesión, 11, todavía no tiene checkpoint ejecutable.

La suite pura verifica adapters, no red ni DOM. El build verifica tipos y empaquetado, no despliegue. Las pruebas de navegador con respuestas controladas no demuestran disponibilidad del servidor público. El ritmo de aula sigue pendiente de medición con estudiantes.
