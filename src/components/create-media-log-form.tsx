import { Button, Code, Group, Select, Stack, Text, Textarea } from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { useState } from 'react'

import { toCreateMediaLogBody } from '../adapters/media-log-form-to-create-body'
import { mediaLogFormSchema, type MediaLogFormValues } from '../schemas/media-log'
import {
  MEDIA_PRIORITY_VALUES,
  MEDIA_STATUS_VALUES,
  type CreateCatalogMediaLogBody,
  type GetMediaDetailInput,
  type MediaPriority,
  type MediaStatus,
} from '../types/media-api'

const STATUS_LABELS: Record<MediaStatus, string> = {
  pending: 'Por ver',
  acquired: 'Adquirido',
  watching: 'Viendo',
  seen: 'Visto',
  dropped: 'Abandonado',
  paused: 'En pausa',
}

const PRIORITY_LABELS: Record<MediaPriority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

const STATUS_OPTIONS = MEDIA_STATUS_VALUES.map((value) => ({
  value,
  label: STATUS_LABELS[value],
}))

const PRIORITY_OPTIONS = MEDIA_PRIORITY_VALUES.map((value) => ({
  value,
  label: PRIORITY_LABELS[value],
}))

type CreateMediaLogFormProps = {
  identity: GetMediaDetailInput
  onCancel: () => void
}

export function CreateMediaLogForm(props: CreateMediaLogFormProps) {
  const { identity, onCancel } = props
  const [preparedBody, setPreparedBody] =
    useState<CreateCatalogMediaLogBody | null>(null)

  const form = useForm<MediaLogFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      status: 'pending',
      priority: 'medium',
      notes: '',
    },
    validate: schemaResolver(mediaLogFormSchema, { sync: true }),
    validateInputOnBlur: true,
    onValuesChange: () => setPreparedBody(null),
  })

  const handleSubmit = form.onSubmit((values) => {
    setPreparedBody(toCreateMediaLogBody(identity, values))
  })

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Tipo: {identity.mediaType} · ID: {identity.externalId}
        </Text>

        <Select
          key={form.key('status')}
          label="Estado"
          data={STATUS_OPTIONS}
          allowDeselect={false}
          {...form.getInputProps('status')}
        />

        <Select
          key={form.key('priority')}
          label="Prioridad"
          data={PRIORITY_OPTIONS}
          allowDeselect={false}
          {...form.getInputProps('priority')}
        />

        <Textarea
          key={form.key('notes')}
          label="Notas"
          placeholder="Opcional"
          autosize
          minRows={3}
          {...form.getInputProps('notes')}
        />

        <Group justify="flex-end">
          <Button type="button" variant="default" onClick={onCancel}>
            Cancelar
          </Button>

          <Button type="submit">Preparar body</Button>
        </Group>

        {preparedBody !== null ? (
          <Stack gap="xs">
            <Text fw={600}>Body preparado</Text>

            <Code block>{JSON.stringify(preparedBody, null, 2)}</Code>
          </Stack>
        ) : null}
      </Stack>
    </form>
  )
}
