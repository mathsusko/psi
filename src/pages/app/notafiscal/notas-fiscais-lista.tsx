import { Helmet } from 'react-helmet-async'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Pagination } from '@/components/pagination'
import { Download, Eye, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NavLink } from '@/components/nav-link'

export function NotasFiscaisLista() {
  return (
    <>
      <Helmet title="Orçamentos" />

      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Notas Fiscais</h1>
        <NavLink to="/gerar-nota-fiscal-one">
          <Button variant="outline">
            Gerar NF° <Plus />
          </Button>
        </NavLink>
      </div>

      <div className="flex flex-col gap-4 p-4 space-y-2.5 rounded-xl bg-sidebar text-sidebar-foreground">
        <form className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros:</span>
          <Input
            className="h-8 w-[320px]"
            placeholder="Nome do cliente"
          />
        </form>
        <Table className="border rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Data de geração</TableHead>
              <TableHead className="text-muted-foreground">Emitida de</TableHead>
              <TableHead className="text-muted-foreground">Emitida para</TableHead>
              <TableHead className="text-muted-foreground">Valor</TableHead>
              <TableHead className="text-muted-foreground text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="">30/03/2024</TableCell>
              <TableCell className="">42.000.00/00001-90 Psi Previncendio</TableCell>
              <TableCell className="">42.000.00/00001-90 Cliente</TableCell>
              <TableCell className="">Condor</TableCell>
              <TableCell className="flex items-center justify-center gap-4">
                <Eye size="22" />
                <Download />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Pagination
          pageIndex={1}
          totalCount={1}
          perPage={10}
        />
      </div>
    </>
  )
}
