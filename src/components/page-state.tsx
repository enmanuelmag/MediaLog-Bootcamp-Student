import { Alert, Button, Loader, Stack, Text } from '@mantine/core'

export type PageStateVariant =
  | 'loading'
  | 'error'
  | 'invalid'
  | 'unavailable'

type PageStateProps = Readonly<{
  variant: PageStateVariant
  title?: string
  description?: string
  onRetry?: () => void
}>

const PAGE_STATE_COPY: Record<
  PageStateVariant,
  Readonly<{ title: string; description: string; color: string }>
> = {
  loading: {
    title: 'Cargando contenido',
    description: 'Espera mientras recuperamos la información.',
    color: 'blue',
  },
  error: {
    title: 'No pudimos cargar el contenido',
    description: 'Intenta nuevamente.',
    color: 'red',
  },
  invalid: {
    title: 'Dirección no válida',
    description: 'Revisa el enlace o vuelve a la página anterior.',
    color: 'yellow',
  },
  unavailable: {
    title: 'Contenido no disponible',
    description: 'No encontramos información para mostrar.',
    color: 'gray',
  },
}

export function PageState(props: PageStateProps) {
  const { variant, title, description, onRetry } = props
  const copy = PAGE_STATE_COPY[variant]
  const resolvedTitle = title ?? copy.title
  const resolvedDescription = description ?? copy.description
  const canRetry =
    (variant === 'error' || variant === 'unavailable') &&
    onRetry !== undefined

  if (variant === 'loading') {
    return (
      <Stack align="center" gap="sm" py="xl" role="status">
        <Loader aria-label={resolvedTitle} color={copy.color} />

        <Text fw={600}>{resolvedTitle}</Text>

        <Text c="dimmed" ta="center">
          {resolvedDescription}
        </Text>
      </Stack>
    )
  }

  return (
    <Alert color={copy.color} title={resolvedTitle}>
      <Stack gap="sm">
        <Text>{resolvedDescription}</Text>

        {canRetry ? (
          <Button type="button" onClick={onRetry} variant="light">
            Reintentar
          </Button>
        ) : null}
      </Stack>
    </Alert>
  )
}
