import { Shell } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import bg from '@/assets/background.png'
import logo from '@/assets/logo.png'

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-2 antialiased ">
      <div className="h-full bg-[url(@/assets/background.png)] object-cover border-r border-foreground/5 p-10 text-muted-foreground flex flex-col justify-between">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <img
            src={logo}
            alt="logo"
          />
          <span className="font-semibold">PSI Previncêndio</span>
        </div>
        <footer className="text-sm">
          Painel de gestão &copy; Psi Previncêndio - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center relative">
        <Outlet />
      </div>
    </div>
  )
}
