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

export function OrcamentoDeServicosLista() {
  return (
    <>
      <Helmet title="Orçamentos" />

      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Orçamentos de serviços</h1>
        <NavLink to="/gerar-orcamento-servicos">
          <Button variant="outline">
            Gerar novo orçamento <Plus />
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
              <TableHead className="text-muted-foreground">Cód.</TableHead>
              <TableHead className="text-muted-foreground">Tipo do orçamento</TableHead>
              <TableHead className="text-muted-foreground">Tomador</TableHead>
              <TableHead className="text-muted-foreground">Preço Total</TableHead>
              <TableHead className="text-muted-foreground">Descrição</TableHead>

              <TableHead className="text-muted-foreground flex items-center justify-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="">01</TableCell>
              <TableCell className="">para Serviço</TableCell>
              <TableCell className="">Condor</TableCell>
              <TableCell className="">R$ 10.000,00</TableCell>
              <TableCell className="">Mão de obra</TableCell>

              <TableCell className="flex items-center justify-center gap-4">
                <Eye size="22" />
                <Download />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Pagination />
      </div>
    </>
  )
}
