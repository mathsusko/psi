import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          {/* Ícone do Sol para tema claro */}
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
            }`}
          />
          {/* Ícone da Lua para tema escuro */}
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
              theme === 'light' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
