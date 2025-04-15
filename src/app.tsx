import './global.css'

import { RouterProvider } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { router } from './Routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider
        storageKey="psi-theme"
        defaultTheme="dark"
      >
        <Helmet titleTemplate="%s | PSI Previncêndio" />
        <Toaster richColors />

        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
