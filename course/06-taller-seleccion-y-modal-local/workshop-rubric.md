# Taller y rúbrica · Sesión 06 · Selección y modal local

- **Modalidad:** presencial
- **Duración del taller:** 60 minutos
- **Puntaje base:** 100 puntos
- **Puntaje extra máximo:** 10 puntos
- **Puntaje bruto máximo:** 110 puntos
- **Nota máxima registrada:** 100 puntos

## Resultado que debes demostrar

Propagarás una función desde `App` hasta cada `MediaCard`, conservarás solo la identidad seleccionada y abrirás un modal con el objeto calculado correspondiente.

## Punto de partida

Comienza desde `session-06-workshop-start` construido antes del descanso:

- El checkpoint completo de filtros sigue funcionando.
- Mantine y PostCSS están configurados.
- `App` contiene `selectedMediaId`, `selectedMedia`, `isDetailOpened` y los handlers.
- Un botón temporal “Probar detalle” abre el modal.
- `MediaGrid` y `MediaCard` todavía no reciben `onSelect`.
- Las tarjetas todavía no contienen “Ver detalle”.

Si no alcanzaste este estado, solicita el checkpoint alternativo. Ese checkpoint no contiene la solución evaluada.

## Escenario

El modal solo puede abrirse desde un botón temporal de `App`. Las personas necesitan consultar cualquier tarjeta visible. Lleva la misma intención de selección hasta cada tarjeta sin mover el estado ni copiar el objeto.

## Trabajo obligatorio

1. Añadir `onSelect: (mediaId: number) => void` a `MediaGrid`.
2. Pasar `handleSelectMedia` desde `App`.
3. Reenviar la referencia a cada `MediaCard`.
4. Añadir la misma firma a `MediaCard`.
5. Crear “Ver detalle” con `type="button"`.
6. Ejecutar `onSelect(data.id)` dentro del click.
7. Retirar `previewMedia` y “Probar detalle”.
8. Conservar el id como único estado de selección.
9. Mantener objeto y apertura como cálculos.
10. Comprobar película, serie, descripción nula y tres mecanismos de cierre.
11. Ejecutar regresión de filtros y `pnpm build`.
12. Explicar el recorrido completo de la acción.

## Restricciones

- Conserva `MediaGrid items={visibleMedia}`.
- Conserva el tipo en `src/types/media-item.ts`.
- No uses Zustand, Context API ni otro store.
- No pases el setter a los hijos.
- No guardes una copia del objeto seleccionado.
- No añadas un booleano de apertura en estado.
- No busques la selección en `visibleMedia`.
- No uses `useEffect`, `useMemo` o `useDisclosure`.
- No añadas API, Router, TanStack Query o persistencia.
- No retires ninguna capacidad de la sesión 05.

## Casos de aceptación

El docente comprobará:

1. `bear` con Series conserva The Bear y permite abrirlo.
2. Cerrar y abrir una película reemplaza el contenido anterior.
3. La entrada con descripción nula muestra el fallback.
4. Control superior, Escape y overlay cierran y limpian la selección.
5. React DevTools muestra estado en `App` y props en Grid y Card.
6. El texto “Probar detalle” y `previewMedia` ya no existen.
7. `pnpm build` termina con código de salida 0.
8. El estudiante explica `App define → props bajan → Card ejecuta → App actualiza → React calcula`.

## Evidencia requerida

Entrega:

- código del checkpoint final;
- demostración de hasta 90 segundos con filtros, dos selecciones y cierre;
- comando `pnpm build` y su resultado;
- explicación breve del propietario del estado y del recorrido de `onSelect`.

El build no demuestra comportamiento de navegador. La grabación no demuestra por sí sola que TypeScript compile. El docente evalúa ambas evidencias por separado.

## Actividad opcional

Después de completar la base, añade un nombre accesible específico a cada botón “Ver detalle” mediante el título del medio y compruébalo en el árbol de accesibilidad. Esta actividad no reemplaza un criterio obligatorio.

## Tabla única de evaluación

| Tipo | Criterio o actividad | Qué se evalúa | Escala de asignación | Máximo | Obtenido |
| --- | --- | --- | --- | ---: | ---: |
| Base | Contratos y recorrido de `onSelect` | `App`, `MediaGrid` y `MediaCard` comparten `(mediaId: number) => void`; Grid reenvía la referencia y Card la ejecuta con su id dentro del click. | Completo: 25 · Parcial: 13 si el contrato llega a las tres capas pero una tarjeta no comunica correctamente su id, o si el recorrido funciona con una adaptación innecesaria · No demostrado: 0 si no existe un recorrido reproducible | 25 | ___ |
| Base | Identidad mínima y cálculos | `selectedMediaId` es el único estado de selección; objeto y apertura se derivan desde `mediaItems`; cerrar asigna `null`. | Completo: 20 · Parcial: 10 si la selección abre pero existe una duplicación o un cálculo usa la colección filtrada · No demostrado: 0 si no se puede identificar la selección activa | 20 | ___ |
| Base | Modal, contenido y cierre | Cada tarjeta abre su propio contenido, cambia de identidad, presenta el fallback y cierra por control, Escape y overlay. | Completo: 25 · Parcial: 13 si abre el modal pero falla el cambio de identidad, el fallback o uno de los mecanismos de cierre · No demostrado: 0 si no abre desde las tarjetas | 25 | ___ |
| Base | Regresión y restricciones | Filtros, contador, limpieza y vacíos permanecen funcionales; no quedan trigger temporal, store, Effect ni estado adicional prohibido. | Completo: 15 · Parcial: 8 si la selección funciona pero existe una regresión localizada o una referencia temporal restante · No demostrado: 0 si el cambio reemplaza el checkpoint anterior o depende de un patrón fuera de alcance | 15 | ___ |
| Base | Verificación y explicación | El proyecto se entrega, `pnpm build` termina correctamente, la matriz se recorre y el estudiante explica propietario, referencia, closure y límite de evidencia. | Completo: 15 · Parcial: 8 si existe evidencia parcial o la explicación omite una parte del flujo · No demostrado: 0 si no hay evidencia reproducible ni explicación del recorrido | 15 | ___ |
| Total | Total base | Suma de los cinco criterios obligatorios. | Suma de filas base | 100 | ___ |
| Extra | Nombre accesible específico | Cada botón expone `Ver detalle de {título}` y el estudiante demuestra el nombre en el árbol de accesibilidad después de completar el flujo base. | Cumple ambas condiciones: +10 · No cumple o reemplaza un requisito base: 0 | +10 | ___ |
| Total | Total extra | Suma de actividades opcionales válidas. | Máximo adicional permitido | +10 | ___ |
| Total | Puntaje bruto | Total base más total extra. | Máximo antes del límite institucional | 110 | ___ |
| Registro | Nota en plataforma | Puntaje bruto limitado al máximo institucional. | `min(puntaje bruto, 100)` | 100 | ___ |

## Entrega

Sube los archivos o el enlace solicitado por el docente junto con la demostración y la evidencia de build. Si un caso queda pendiente, nombra la acción, el resultado actual y la causa que identificaste.
