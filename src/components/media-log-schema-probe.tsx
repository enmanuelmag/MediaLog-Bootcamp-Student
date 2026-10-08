import { Button } from '@mantine/core'

import { mediaLogFormSchema } from '../schemas/media-log'

export function MediaLogSchemaProbe() {
  function handleProbe() {
    const valid = mediaLogFormSchema.safeParse({
      status: 'pending',
      priority: 'medium',
      notes: '',
    })

    console.log('Valores válidos:', valid)

    const invalidStatus = mediaLogFormSchema.safeParse({
      status: 'inventado',
      priority: 'medium',
      notes: '',
    })

    console.log('Estado inválido:', invalidStatus)

    const longNotes = mediaLogFormSchema.safeParse({
      status: 'pending',
      priority: 'medium',
      notes: 'a'.repeat(257),
    })

    console.log('Notas demasiado largas:', longNotes)
  }

  return (
    <Button mt="md" onClick={handleProbe}>
      Probar validación
    </Button>
  )
}
