import type { MediaLogFormValues } from '../schemas/media-log'
import type {
  CreateCatalogMediaLogBody,
  GetMediaDetailInput,
} from '../types/media-api'

export function toCreateMediaLogBody(
  identity: GetMediaDetailInput,
  values: MediaLogFormValues,
): CreateCatalogMediaLogBody {
  const notes = values.notes.trim()

  return {
    source: 'catalog',
    mediaType: identity.mediaType,
    externalId: identity.externalId,
    status: values.status,
    priority: values.priority,
    notes: notes === '' ? null : notes,
  }
}
