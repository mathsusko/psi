import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

export function DropdownModal() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-between w-[300px] items-center p-2 border rounded-md">
        {selectedCliente ? selectedCliente : 'Escolha uma categoria'}{' '}
        <ChevronDown size="16" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-2 border rounded-md bg-sidebar"
      >
        <DropdownMenuItem className="p-2 rounded-md">Material por Un.</DropdownMenuItem>
        <DropdownMenuItem className="p-2 rounded-md">Material por Un.</DropdownMenuItem>
        <DropdownMenuItem className="p-2 rounded-md">Material por Un.</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
