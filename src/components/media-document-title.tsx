import { useEffect } from 'react'

type MediaDocumentTitleProps = Readonly<{
  title: string
}>

export function MediaDocumentTitle(props: MediaDocumentTitleProps) {
  const { title } = props

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${title} | Medialog`

    return () => {
      document.title = previousTitle
    }
  }, [title])

  return null
}
