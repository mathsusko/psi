// src/components/RequireAuth.tsx
import { Navigate } from 'react-router-dom'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const estaLogado = localStorage.getItem('logado') === 'true'

  if (!estaLogado) {
    return (
      <Navigate
        to="/sign-in"
        replace
      />
    )
  }

  return <>{children}</>
}
