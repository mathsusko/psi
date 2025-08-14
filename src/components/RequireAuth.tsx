// // src/components/RequireAuth.tsx
// import { Navigate } from 'react-router-dom'

// export function RequireAuth({ children }: { children: React.ReactNode }) {
//   const estaLogado = localStorage.getItem('logado') === 'true'

//   if (!estaLogado) {
//     return (
//       <Navigate
//         to="/sign-in"
//         replace
//       />
//     )
//   }

//   return <>{children}</>
// }
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Carregando...</div> // previne 404 antes da hora
  if (!user)
    return (
      <Navigate
        to="/sign-in"
        replace
      />
    )

  return children
}
