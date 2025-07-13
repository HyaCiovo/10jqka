import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Nav from './layouts/nav.tsx'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SkeletonTheme baseColor="#999" highlightColor="#f5f5f5">
      <Toaster toastOptions={{ duration: 3000, removeDelay: 500 }} />
      <Nav />
      <App />
    </SkeletonTheme>
  </StrictMode>,
)
