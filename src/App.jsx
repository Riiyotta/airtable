import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Home from './pages/Home.jsx'
import StubPage from './pages/StubPage.jsx'
import seasonRoutes from './routes/season.jsx'
import bkRoutes from './routes/bk.jsx'
import standaloneRoutes from './routes/standalone.jsx'

// Each page group registers its own routes; every other path falls back to the shared stub.
const pageRoutes = [...seasonRoutes, ...bkRoutes, ...standaloneRoutes]

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {pageRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<StubPage />} />
      </Route>
    </Routes>
  )
}
