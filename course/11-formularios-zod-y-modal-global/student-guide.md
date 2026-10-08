# Guía estudiantil · Sesión 11 · Formularios, Zod y modal global

## Qué vas a construir

**Virtual · 90 minutos.** Abrirás el mismo formulario desde búsqueda y detalle. Completarás estado, prioridad y notas; comprobarás los datos y prepararás un objeto local. Esta sesión todavía no guarda registros en el servidor.

Lectura previa: [store y validación local](pre-class-reading.md). Control posterior: [preguntas de lectura](reading-check.md).

Primero veremos la presentación completa. Después trabajaremos en el editor, practicaremos y cerraremos sobre el resultado. No necesitas copiar código mientras se muestran las diapositivas.

## Punto de partida

`session-11-start` coincide con `session-10-end`. Ya puedes buscar películas o series, abrir un detalle por URL y volver a la búsqueda. El título de la pestaña cambia con el medio y se restaura al salir. `PublicLayout` contiene el encabezado y el lugar donde Router muestra la página activa.

Comprueba ese recorrido antes de editar. Guarda tu trabajo antes de cambiar de rama. Las ramas son respaldos que el docente compartirá según avance la clase; tu trabajo puede continuar en tu propia rama. `main` del repositorio docente conserva el inicio del curso.

## Una ficha y un formulario

Imagina un mostrador al que se puede llegar desde dos puertas: búsqueda y detalle. Sobre el mostrador dejamos una ficha con el tipo y el ID del medio elegido. Quien atiende usa esa ficha para abrir el formulario correcto.

La ficha compartida es el **store** de Zustand. Los campos que completas pertenecen a **Mantine Form**. **Zod** comprueba las reglas, como un revisor que señala un campo inválido. El **adapter** reúne los datos del medio y tus respuestas en el formato acordado. Preparar ese objeto es parecido a completar una solicitud: todavía falta enviarla y recibir confirmación.

| Dato o trabajo | Responsable |
| --- | --- |
| Tipo e ID del medio elegido; abrir y cerrar | Zustand |
| Valores actuales y errores de los campos | Mantine Form |
| Reglas que aceptan o rechazan esos valores | Zod |
| Objeto preparado para una futura petición | Adapter y vista previa local |
| Respuestas de búsqueda y detalle | TanStack Query, como en sesiones anteriores |

## Ruta de la clase

| Bloque | Minutos | Comprobación |
| --- | ---: | --- |
| Presentación continua | 25 | Reconocer qué hace cada herramienta. |
| Store y apertura temporal | 10 | Abrir y cerrar con datos de ejemplo. |
| Búsqueda y detalle | 8 | Abrir desde ambas pantallas. |
| Reglas de validación | 8 | Comparar datos válidos e inválidos. |
| Formulario | 14 | Completar campos y ver errores. |
| Body local | 9 | Preparar los datos y revisar notas. |
| Tests con agente | 7 | Leer y ejecutar cinco casos. |
| Práctica | 6 | Comprobar otro medio. |
| Cierre | 3 | Explicar el resultado y sus límites. |

Total: 90 minutos. Los tiempos se ajustarán a partir de la experiencia real del grupo. El docente entrega soporte mecánico dentro de cada bloque de coding; tú sigues la construcción y explicas las decisiones.

## 1. Instalar y abrir un modal compartido

Después de la presentación, trabaja desde el cierre anterior. En una copia preparada desde la rama de entrada:

```bash
pnpm install --frozen-lockfile
pnpm add --save-exact zustand@5.0.15 @mantine/form@9.4.1 zod@4.4.3
pnpm dev
```

Mantine Core, Hooks y Form usan 9.4.1. No actualices otras dependencias. El lockfile se genera con pnpm.

Construye con el docente:

- `src/stores/create-media-log-modal-store.ts`: selección inicial `null`, acción `openCreate` y acción `closeCreate`.
- `src/components/create-media-log-modal.tsx`: lee selección y cierre mediante selectores separados; calcula si se abre desde `selection !== null`.
- `src/layouts/public-layout.tsx`: conserva `Outlet` y monta el modal una sola vez. Durante este paso incluye un botón temporal.

**Comprueba:** el botón abre con tipo e ID visibles; cerrar permite volver a abrir. No guardes `opened` además de la selección: podrían contradecirse. No añadas respuestas de la API, notas o sesión al store.

Respaldo: `session-11-step-01-modal-store`.

## 2. Abrir desde búsqueda y detalle

Sigue la integración en este orden:

1. `MediaSearchResults` recibe `onCreate` como prop y la llama desde el botón del resultado con tipo e ID. Conserva el enlace «Ver detalle».
2. `SearchPage` lee `openCreate` y lo entrega al componente de resultados.
3. `MediaDetailPage` lee la misma acción antes de cualquier retorno y muestra el botón solo cuando el detalle es válido y está disponible.
4. Retira el botón temporal de `PublicLayout`; el modal permanece.

**Comprueba:** abre desde una película, cierra y abre desde una serie. Visita el detalle y abre allí. Cada vez debe aparecer el tipo y el ID correspondientes. El resultado presenta la acción mediante una prop; no necesita importar Zustand.

Respaldo: `session-11-step-02-modal-entrypoints`.

## 3. Acordar y ejecutar las reglas

En `src/types/media-api.ts` se añade `CreateCatalogMediaLogBody`: origen de catálogo, tipo, ID, estado, prioridad y notas. No transporta título, usuario o token.

En `src/schemas/media-log.ts`, el schema usa las listas de estados y prioridades que ya existen. Las notas deben ser texto de hasta 256 caracteres. `MediaLogFormValues` se obtiene con `z.infer` para no mantener una segunda definición de los mismos campos.

**Distingue:** inferir un tipo ayuda a TypeScript; ejecutar `safeParse` examina un valor real. La demostración temporal `media-log-schema-probe.tsx` tiene un botón dentro del modal y compara datos válidos, estado no permitido y notas de 257 caracteres. Predice los tres resultados antes de mirar la consola.

**Comprueba:** el caso válido se acepta y los otros muestran rechazo. El límite de notas es una regla de esta interfaz, no una afirmación sobre el servidor.

Respaldo: `session-11-step-03-form-schema`.

## 4. Conectar los campos

Construye `src/components/create-media-log-form.tsx`. Recibe `identity` —tipo e ID del medio elegido— y `onCancel`. Usa Mantine Form en modo `uncontrolled`, con estado Por ver (`pending`), prioridad Media (`medium`) y notas vacías.

Revisa en el código que construyes:

- `schemaResolver` se importa desde `@mantine/form` y conecta las reglas de Zod. `{ sync: true }` corresponde a estas reglas inmediatas.
- Cada control recibe `form.key('campo')` y `form.getInputProps('campo')`.
- Las etiquetas son españolas, pero los valores conservan el contrato: por ejemplo, Por ver corresponde a `pending`.
- `form.onSubmit` comprueba los campos antes de entregar valores válidos a la preparación.
- `onValuesChange` retira la vista previa anterior cuando editas.
- Cancelar es un botón normal; comprobar/preparar es el botón de envío del formulario.

El modal monta el formulario solo con selección. Su `key` combina tipo e ID. Elimina la demostración temporal y su import; conserva el schema, que ahora usa Form.

**Comprueba:** completar y enviar muestra valores válidos. Escribir 257 caracteres muestra error al salir del campo o enviar. Con 256 puedes continuar. Editar retira la vista previa. No añadas `maxLength` para ocultar la comprobación que estamos aprendiendo.

Respaldo: `session-11-step-04-form-fields`.

## 5. Preparar el body

Antes de escribir el adapter, acuerda qué hacer con notas vacías, solo espacios o texto. Crea `src/adapters/media-log-form-to-create-body.ts`: recibe datos del medio y valores válidos del formulario, devuelve un objeto nuevo y convierte notas vacías en `null` después de recortar espacios de los extremos.

Conecta el adapter al submit de `CreateMediaLogForm`. Ahora el botón «Preparar body» muestra el objeto completo, no solamente los campos. Editar lo retira; cerrar y reabrir inicia un formulario nuevo. No uses un Effect para preparar o reiniciar.

**Comprueba:** mismo tipo e ID, estado y prioridad elegidos, `source: 'catalog'` y notas normalizadas. En Network no aparece `POST /api/v2/media/create`. La búsqueda sí utiliza POST: distingue la ruta de cada petición.

Respaldo: `session-11-step-05-body-preview`.

## 6. Trabajo con agente

La persona define la matriz antes de delegar. Usa este prompt después de escribir el adapter:

```text
Partimos de session-11-step-05-body-preview. Lee el adapter
src/adapters/media-log-form-to-create-body.ts, el schema media-log.ts,
los tipos media-api.ts y un test existente de adapters.

Usa la skill ahk-test para redactar y ejecutar cinco pruebas Vitest:
1. Conserva mediaType, externalId, status y priority.
2. Añade source: 'catalog'.
3. Notas vacías producen null.
4. Notas con solo espacios producen null.
5. Recorta los extremos del texto y conserva el contenido interior.

Solo puedes modificar src/adapters/__tests__/media-log-form-to-create-body.test.ts
y fixtures necesarios dentro de src/adapters/__tests__/fixtures/.
No cambies producción, schemas, tipos, componentes, store, rutas, dependencias,
configuración u otros tests. No uses snapshots ni debilites expectativas.
Si un caso contradice el código, detente y explica antes de proponer cambios.

Ejecuta pnpm exec vitest run src/adapters/__tests__/media-log-form-to-create-body.test.ts.
Entrega archivos, matriz, resultado y exit status, flujo probado, supuestos
y límites. No afirmes haber comprobado el navegador.
```

Lee todo el diff. Explica entrada, resultado y expectativa de cada caso. Si el agente falla o tarda, usa la referencia que entregue el docente después de acordar el comportamiento; también debes leerla y ejecutarla.

```bash
pnpm exec vitest run src/adapters/__tests__/media-log-form-to-create-body.test.ts
pnpm test
pnpm lint
pnpm build
```

Respaldo: `session-11-step-06-adapter-tests`. El test demuestra la transformación pura; no comprueba la interfaz, el backend ni persistencia.

## 7. Práctica y evidencia

Usa un medio diferente del ejemplo docente. Registra qué observaste en cada caso; marca pendiente lo que todavía no hayas comprobado.

| Caso | Resultado que debes observar |
| --- | --- |
| Abrir desde búsqueda | Tipo e ID del resultado elegido. |
| Abrir desde detalle | Mismo formulario, datos de ese detalle. |
| Notas vacías o espacios | El body contiene `notes: null`. |
| Notas con texto | Se recortan extremos y se conserva el interior. |
| 257 caracteres | Error y ausencia de una nueva preparación. |
| 256 caracteres | Preparación permitida con el resto de datos válidos. |
| Editar tras preparar | Se retira la vista previa anterior. |
| Cerrar y reabrir | Campos iniciales y sin vista previa. |
| Network | Sin petición de creación; búsqueda puede hacer POST. |

Entrega código, salida de las comprobaciones, diff del agente leído y registro del recorrido. Explica quién administra selección, campos, reglas y datos remotos. El cierre de referencia es `session-11-end`.

## Palabras del código

- **Store:** lugar compartido para un estado concreto; aquí solo la selección y sus acciones.
- **Selector:** función que elige un dato o una acción del store.
- **Schema:** reglas que se pueden ejecutar sobre datos reales.
- **Resolver:** conexión que convierte el resultado de Zod en errores de Form.
- **Uncontrolled:** modo en que el control mantiene su valor visible y Form registra el valor actual sin actualizar `form.values` en cada tecla.
- **Body:** objeto preparado para el contenido de una futura petición.
- **Adapter:** función que transforma una forma de datos en otra.
- **identity:** nombre del parámetro que contiene tipo e ID del medio elegido.

## Si no terminaste

Anota último bloque y paso comprobado, cambio guardado, primera acción pendiente y evidencia que falta. Un respaldo recupera código, pero todavía debes recorrer y explicar lo pendiente antes de continuar.

No añadimos autenticación, rutas privadas, POST de creación, mutaciones, persistencia de Zustand ni un Effect de reset. La próxima sesión reutilizará lo aprendido en formularios de acceso.
