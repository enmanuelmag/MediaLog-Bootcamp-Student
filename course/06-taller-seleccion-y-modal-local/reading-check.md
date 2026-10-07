# Control de lectura · Sesión 06

### Pregunta 1 · Opción múltiple

Si la lista ya guarda los objetos completos, ¿qué riesgo existe al copiar el objeto seleccionado en otro estado?

- A. Los mismos datos quedan duplicados y las dos copias pueden diferir.
- B. React elimina el objeto de la lista.
- C. `find` deja de funcionar para los demás elementos.
- D. El id se convierte automáticamente en string.

### Pregunta 2 · Opción múltiple

¿Qué dato mínimo conviene guardar para identificar el elemento seleccionado?

- A. Una segunda copia del arreglo.
- B. El id del elemento seleccionado.
- C. Un booleano dentro de cada objeto.
- D. El JSX completo de la tarjeta.

### Pregunta 3 · Verdadero o falso

Si `items.find(...)` permite obtener `selectedItem`, conviene calcularlo durante el render y no guardarlo en otro estado.

- Verdadero
- Falso

### Pregunta 4 · Opción múltiple

Dos componentes hermanos usan el mismo estado. ¿Qué componente debe guardarlo?

- A. En ambos hijos con valores duplicados.
- B. El componente padre más cercano que comparten.
- C. En una variable global mutable.
- D. Dentro del archivo CSS.

### Pregunta 5 · Verdadero o falso

Un padre puede pasar una función por props para que un hijo solicite un cambio en el estado del padre.

- Verdadero
- Falso
