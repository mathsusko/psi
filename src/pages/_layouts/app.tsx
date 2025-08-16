import { AppSidebar } from '@/components/app-sidebar'
import { ThemeToggle } from '@/components/theme/theme.toggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="flex min-h-screen antialiased">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-row items-center gap-2">
            <SidebarTrigger />
            <ThemeToggle />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-2 pt-6">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
