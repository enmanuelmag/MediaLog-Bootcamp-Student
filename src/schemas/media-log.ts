import { z } from 'zod/v4'

import { MEDIA_PRIORITY_VALUES, MEDIA_STATUS_VALUES } from '../types/media-api'

export const mediaLogFormSchema = z.object({
  status: z.enum(MEDIA_STATUS_VALUES, {
    error: 'Selecciona un estado válido.',
  }),
  priority: z.enum(MEDIA_PRIORITY_VALUES, {
    error: 'Selecciona una prioridad válida.',
  }),
  notes: z.string().max(256, {
    error: 'Las notas deben tener 256 caracteres o menos.',
  }),
})

export type MediaLogFormValues = z.infer<typeof mediaLogFormSchema>
