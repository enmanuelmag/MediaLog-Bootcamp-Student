import { Anchor, Container, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <Container py="xl" size="sm">
      <Stack>
        <Title order={1}>Página no encontrada</Title>
        <Text>La URL no coincide con una página pública.</Text>
        <Anchor component={Link} to="/search">
          Volver a la búsqueda
        </Anchor>
      </Stack>
    </Container>
  )
}
