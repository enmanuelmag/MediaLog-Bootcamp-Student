import { Navigate, Route, Routes } from 'react-router'

import { PublicLayout } from './layouts/public-layout'
import { MediaDetailPage } from './pages/media-detail-page'
import { NotFoundPage } from './pages/not-found-page'
import { SearchPage } from './pages/search-page'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Navigate replace to="/search" />} />
        <Route path="search" element={<SearchPage />} />
        <Route
          path="media/:mediaType/:externalId"
          element={<MediaDetailPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
