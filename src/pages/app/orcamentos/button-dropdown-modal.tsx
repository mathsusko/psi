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

export function DropdownModal() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-[200px]"
        asChild
      >
        <Button variant="outline">Escolha a categória</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="start"
      >
        {/* <DropdownMenuLabel>Escolha a categória</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuGroup>
          <DropdownMenuItem>Peça por QTD</DropdownMenuItem>

          <DropdownMenuItem>Peças por Metragem</DropdownMenuItem>
          <DropdownMenuItem>Peças por Kg</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <DropdownMenuSeparator />
    </DropdownMenu>
  )
}
