# MediaLog Bootcamp

Paquete `medialog-bootcamp`. Node >=22.22.0, pnpm 11.17.0.

## Sesión 06 · Selección y modal local

Primero presentación continua; después coding, descanso, taller y cierre oral.

| Orden | Rama | Resultado |
| --- | --- | --- |
| 1 | `session-06-start` | Filtros de 05 y soporte del detalle, sin selección. |
| 2 | `session-06-step-01-mantine` | Provider, estilos y configuración. |
| 3 | `session-06-step-02-selection` | Selección por id y diagnóstico temporal. |
| 4 | `session-06-step-03-modal-preview` | Modal desde Probar detalle. |
| Taller | `session-06-workshop-start` | Misma demostración; tarjetas sin callback ni botón. |
| 5 | `session-06-step-04-callback-contracts` | Contratos conectados entre App, Grid y Card. |
| 6 | `session-06-step-05-card-selection` | Cada tarjeta abre su medio; trigger temporal todavía visible. |
| 7 | `session-06-end` | Modal desde tarjetas, sin trigger temporal. |

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm lint
```

Guarda tus cambios antes de cambiar de rama. Las referencias resueltas permanecen locales para consulta docente; su publicación requiere preparar la distribución del taller.

[Lectura previa](course/06-taller-seleccion-y-modal-local/pre-class-reading.md) · [Guía estudiantil](course/06-taller-seleccion-y-modal-local/student-guide.md) · [Rúbrica](course/06-taller-seleccion-y-modal-local/workshop-rubric.md).

Filtros, contador y limpieza se conservan. El detalle deriva del id seleccionado. Escape, botón de cierre y clic fuera cierran el modal; el foco vuelve al disparador. Se verificó en navegador, sin prueba con lector de pantalla ni React DevTools. El extra de etiqueta accesible específica permanece fuera del cierre base.

La sesión 07 todavía no está implementada. El ritmo de aula está pendiente de medición.
