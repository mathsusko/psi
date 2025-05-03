import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DadosPrestador } from './DadosPrestador'
import { DadosCliente } from './DadosCliente'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Delete, Edit, MoveLeft, Plus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, NavLink } from 'react-router-dom'
import { DialogAddMateriais } from './componentes/modal-gerar-orcamento-materias'

export function GerarOrcamentoMateriais() {
  return (
    <>
      <Helmet title="Gerar Orçamentos Matariais" />
      <div className="flex flex-col gap-6 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <Link
          to="/orcamentos-de-materiais"
          className="flex gap-2 items-center text-xs"
        >
          <MoveLeft size="12" />
          Voltar
        </Link>
        <h1 className="text-sm font-bold tracking-tight">Criar Orçamento Materiais</h1>
      </div>

      <div className="flex flex-col gap-4 justify-between rounded-xl bg-sidebar text-sidebar-foreground">
        {/* Dados do Prestador */}
        <DadosPrestador />

        {/* Dados do Cliente */}
        <DadosCliente />
      </div>

      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Dados do Orçamento de Produto</span>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="Nome/Razão Social"
              className="px-1 text-xs"
            >
              Custo
            </label>
            <Input
              id="cst"
              defaultValue="R$ 10.000,00"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="CPF"
              className="px-1 text-xs"
            >
              Data Entra. Início
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="I.E"
              className="px-1 text-xs"
            >
              Data Saída
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Dados da Lista de Produtos</span>
        <Table className="border rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Imagem</TableHead>
              <TableHead className="text-muted-foreground">Material</TableHead>
              <TableHead className="text-muted-foreground">Medida</TableHead>
              <TableHead className="text-muted-foreground">Qtd/Un/Metros</TableHead>
              <TableHead className="text-muted-foreground">Preço</TableHead>
              <TableHead className="text-muted-foreground">Valor Total</TableHead>
              <TableHead className="text-muted-foreground flex items-center justify-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="">
                <img
                  src=""
                  alt=""
                  className="w-[64px] h-[64px] object-contain border border-sidebar rounded-sm"
                />
              </TableCell>
              <TableCell className="">Cotovelo</TableCell>
              <TableCell className="">6"</TableCell>
              <TableCell className="">10</TableCell>
              <TableCell className="">10</TableCell>
              <TableCell className="">10</TableCell>
              <TableCell className="flex items-center justify-center gap-4">
                <Button variant="outline">
                  <Delete />
                </Button>
                <Button variant="outline">
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              Adicionar <Plus />
            </Button>
          </DialogTrigger>

          <DialogAddMateriais />
        </Dialog>
      </div>

      <div className="w-full flex justify-end">
        <NavLink to="/previsualizacao-orcamento-materiais">
          <Button className="px-12">Concluir</Button>
        </NavLink>
      </div>
    </>
  )
}
