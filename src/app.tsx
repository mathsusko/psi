import './global.css'

import { RouterProvider } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { router } from './Routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { AuthProvider } from './hooks/useAuth' // <-- Adicionado

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
          <AuthProvider>
            {' '}
            {/* <-- Envolvendo com AuthProvider */}
            {/* <RouterProvider router={router} /> */}
            <RouterProvider
              router={router}
              fallbackElement={<div>Carregando rota...</div>}
              basename="/"
            />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
