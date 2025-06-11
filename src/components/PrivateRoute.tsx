import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function PrivateRoute() {
  const { user, token } = useAuth()

  if (!user || !token) {
    return (
      <Navigate
        to="/sign-in"
        replace
      />
    )
  }

  return <Outlet />
}
