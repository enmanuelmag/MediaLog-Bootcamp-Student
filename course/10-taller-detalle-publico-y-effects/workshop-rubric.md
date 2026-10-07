# Taller y rúbrica · Sesión 10 · Detalle público y Effects

- **Modalidad:** presencial
- **Duración del taller:** 60 minutos
- **Puntaje base:** 100 puntos
- **Puntaje extra máximo:** 10 puntos
- **Puntaje bruto máximo:** 110 puntos
- **Nota máxima registrada:** 100 puntos

## Resultado que debes demostrar

Integrarás el input nullable de la URL con una query de detalle, compondrás sus estados mediante un modelo visual y restaurarás el título del documento al salir.

## Punto de partida

Comienza desde el trabajo previo al descanso o desde `session-10-workshop-start`:

- `mediaKeys.detail()` y `useMediaDetail()` funcionan con una identidad fija;
- el hook acepta un input nullable y usa `enabled`;
- modelo, adapter y contenido presentacional existen;
- `PageState` existe con variantes `loading`, `error`, `invalid` y `unavailable`;
- `MediaDocumentTitle` restaura el título mediante cleanup;
- un modelo temporal permite observar las piezas;
- el test dirigido y el build terminan correctamente.

El checkpoint alternativo no contiene la integración con params, la composición final de estados ni la eliminación del scaffold.

## Trabajo obligatorio

1. Reemplazar el input fijo por `detailInput`.
2. Llamar `useMediaDetail(detailInput)` antes de cualquier retorno condicional.
3. Impedir requests cuando el input sea nulo.
4. Conservar tipo e id en la query key.
5. Diferenciar URL inválida, carga, error remoto, catálogo nulo y éxito mediante `PageState` y la rama de contenido.
6. Adaptar el catálogo durante el render.
7. Renderizar `MediaDetailContent` con `MediaDetailModel`.
8. Montar `MediaDocumentTitle` solo en éxito.
9. Eliminar modelo temporal, input fijo y logs.
10. Comprobar película, serie, recarga, pestaña nueva, historial y URL inválida.
11. Ejecutar la prueba dirigida y `pnpm build`.
12. Explicar el propietario y el límite de cada evidencia.

## Restricciones

- No uses `useEffect` para fetching, params, modelo derivado o eventos.
- No guardes el DTO ni el modelo en estado local.
- No uses casts o non-null assertions para evitar el caso nullable.
- No mezcles `catalog: null` con error remoto.
- No retires `StrictMode`.
- No añadas loaders o actions de React Router, Zustand, formulario, Zod, auth o mutaciones.
- No reintroduzcas selección o modal de detalle.
- Si usas un agente, solo puede crear la prueba del adapter y debes revisar su diff.

## Casos de aceptación

El docente comprobará:

1. `movie` y `series` producen requests y keys distintas.
2. Un tipo desconocido muestra URL inválida sin request.
3. La primera carga, el error remoto y `catalog: null` usan variantes distintas de `PageState`.
4. Película conserva duración; serie conserva temporadas y episodios.
5. Descripción, poster, score, fecha y géneros respetan nulls y fallbacks acordados.
6. Entrar asigna `{título} | Medialog` y salir restaura el título anterior.
7. Recarga, pestaña nueva, Atrás y Adelante conservan la identidad observada.
8. No quedan datos temporales, logs ni patrones fuera de alcance.
9. Prueba dirigida y build terminan con código de salida 0.
10. El estudiante explica qué demuestra y qué no demuestra cada comprobación.

## Evidencia requerida

Entrega:

- código del checkpoint final;
- salida completa de la prueba dirigida;
- salida completa de `pnpm build`;
- matriz manual con resultados observados;
- diff de la prueba creada por el agente, si se utilizó;
- explicación breve del flujo `URL → input → query → DTO → modelo → contenido → título`.

El test cubre el adapter, no la infraestructura. El build cubre tipado y empaquetado, no el navegador. La matriz cubre el entorno local observado, no un despliegue.

## Actividad opcional

Después de completar la base, entrega `onRetry={() => void detailQuery.refetch()}` a `PageState` en los estados `error` y `unavailable`. El botón **Reintentar** debe aparecer en ambos casos y permanecer ausente en `loading` e `invalid`, sin crear otra fuente de identidad ni reemplazar la carga declarativa normal.

## Tabla única de evaluación

| Tipo | Criterio o actividad | Qué se evalúa | Escala de asignación | Máximo | Obtenido |
| --- | --- | --- | --- | ---: | ---: |
| Base | Input nullable y orden de hooks | `detailInput` alimenta siempre al hook antes de retornos; `enabled` impide una request inválida; no existen hooks condicionales, casts ni copia de params a estado. | Completo: 20 · Parcial: 10 si el flujo válido funciona pero el orden, la nulabilidad o la ausencia de request inválida queda demostrada solo parcialmente · No demostrado: 0 si depende de un hook condicional o solicita con identidad inválida | 20 | ___ |
| Base | Query key y estados remotos | La key incluye `mediaType + externalId`; `PageState` representa URL inválida, carga, error y `catalog: null`; éxito queda separado sin confundir `pending` con fetching. | Completo: 20 · Parcial: 10 si la consulta funciona pero la key omite parte de la identidad, falta una variante o dos estados se mezclan · No demostrado: 0 si la caché no identifica el detalle o no existe composición reproducible | 20 | ___ |
| Base | Modelo, adapter y contenido | El adapter puro conserva nulls y arrays, renombra portada y calcula fecha; película y serie muestran sus campos mediante un componente que no conoce infraestructura. | Completo: 20 · Parcial: 10 si el contenido aparece pero existe acoplamiento al DTO, un fallback inventado o una variante incompleta · No demostrado: 0 si el detalle no puede presentarse desde el modelo | 20 | ___ |
| Base | Effect, dependencias y cleanup | El título usa un único Effect con `[title]`, captura el anterior, lo restaura en cleanup, permanece correcto bajo Strict Mode y no hay fetching ni derivación en Effects. | Completo: 20 · Parcial: 10 si actualiza el título pero falla la restauración, la dependencia o la explicación del ciclo de desarrollo · No demostrado: 0 si queda título residual, se retira Strict Mode o el Effect administra datos remotos | 20 | ___ |
| Base | Flujo final, evidencia y limpieza | Película, serie, navegación e invalidez se comprueban; no quedan scaffolds o logs; prueba y build salen con 0; se explican los límites de cada evidencia. | Completo: 20 · Parcial: 10 si el flujo principal funciona pero faltan casos, limpieza, una salida verificable o el límite de evidencia · No demostrado: 0 si no hay ejecución reproducible del checkpoint | 20 | ___ |
| Total | Total base | Suma de los cinco criterios obligatorios. | Suma de filas base | 100 | ___ |
| Extra | Reintento de error o ausencia | El botón aparece en `error` y `unavailable`, llama `detailQuery.refetch()` sobre la identidad actual y permanece ausente en `loading` e `invalid`, sin segundo estado de identidad ni carga imperativa normal. | Cumple todas las condiciones: +10 · No cumple o reemplaza un requisito base: 0 | +10 | ___ |
| Total | Total extra | Suma de actividades opcionales válidas. | Máximo adicional permitido | +10 | ___ |
| Total | Puntaje bruto | Total base más total extra. | Máximo antes del límite institucional | 110 | ___ |
| Registro | Nota en plataforma | Puntaje bruto limitado al máximo institucional. | `min(puntaje bruto, 100)` | 100 | ___ |

## Entrega

Sube los archivos o el enlace solicitado por el docente junto con la matriz y las salidas completas. Si un caso queda pendiente, registra la acción, el resultado observado y la causa identificada.
