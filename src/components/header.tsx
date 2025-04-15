import { Codesandbox, Home, Shell } from 'lucide-react'
import { Separator } from './ui/separator'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme.toggle'
import { AccountMenu } from './account-menu'
import { SidebarTrigger } from './ui/sidebar'
export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <SidebarTrigger />
        <ThemeToggle />
        {/* <Shell className="h-6 w-6" /> */}

        <Separator className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Inicio
          </NavLink>
          <NavLink to="/orders">
            <Codesandbox className="h-4 w-4" />
            Estoque
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
