import { CreditCard, Plus, Settings, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { NavLink } from 'react-router-dom'

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Adicionar <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
      >
        <DropdownMenuLabel>Adicionar produto ao estoque</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <NavLink to="/add-peca-por-qtd">Peça por QTD</NavLink>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard />
            <NavLink to="/add-peca-por-metro">Peças por Metragem</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <NavLink to="/add-peca-por-kilo">Peças por Kg</NavLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
