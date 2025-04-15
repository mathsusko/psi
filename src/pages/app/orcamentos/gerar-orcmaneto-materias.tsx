import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Eye, Download, Trash, Delete, Edit, Plus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { DialogAddMateriais } from './modal-gerar-orcamento-materias'

export function GerarOrcamentoMateriais() {
  return (
    <>
      <Helmet title="Gerar Orçamentos Matariais" />
      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Criar Orçamento Materiais</h1>
      </div>
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Dados do prestador</span>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Nome/Razão Social"
              className="px-1"
            >
              Nome/Razão Social
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="CPF"
              className="px-1"
            >
              CPF
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="I.E"
              className="px-1"
            >
              I.E
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Cep"
              className="px-1"
            >
              CEP
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Endereço"
              className="px-1"
            >
              Endereço
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Cidade"
              className="px-1"
            >
              Cidade
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Estado"
              className="px-1"
            >
              Estado
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Cep"
              className="px-1"
            >
              Site
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Endereço"
              className="px-1"
            >
              Telefone
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Cidade"
              className="px-1"
            >
              Email
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Dados do cliente</span>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Nome/Razão Social"
              className="px-1"
            >
              Nome/Razão Social
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="CPF"
              className="px-1"
            >
              CPF
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="I.E"
              className="px-1"
            >
              I.E
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Cep"
              className="px-1"
            >
              CEP
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Endereço"
              className="px-1"
            >
              Endereço
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Cidade"
              className="px-1"
            >
              Cidade
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Estado"
              className="px-1"
            >
              Estado
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Cep"
              className="px-1"
            >
              Site
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Endereço"
              className="px-1"
            >
              Telefone
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Cidade"
              className="px-1"
            >
              Email
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Dados do Orçamento de Produto</span>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Nome/Razão Social"
              className="px-1"
            >
              Custo
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="CPF"
              className="px-1"
            >
              Data Entra. Início
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="I.E"
              className="px-1"
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
              <TableHead className="text-muted-foreground">Material</TableHead>
              <TableHead className="text-muted-foreground">Especifição</TableHead>
              <TableHead className="text-muted-foreground">Qtd. Un.</TableHead>
              <TableHead className="text-muted-foreground">Qtd. Kg</TableHead>
              <TableHead className="text-muted-foreground">Qtd. Metro</TableHead>
              <TableHead className="text-muted-foreground">Preço Un.</TableHead>
              <TableHead className="text-muted-foreground">Preço Kg</TableHead>
              <TableHead className="text-muted-foreground">Preço Metro</TableHead>
              <TableHead className="text-muted-foreground">Valor Total</TableHead>
              <TableHead className="text-muted-foreground flex items-center justify-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="">Cotovelo</TableCell>
              <TableCell className="">6"</TableCell>
              <TableCell className="">10</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">R$ 10,00</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">R$ 100,00</TableCell>
              <TableCell className="flex items-center justify-center gap-4">
                <Button variant="outline">
                  <Delete />
                </Button>
                <Button variant="outline">
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="">Cotovelo</TableCell>
              <TableCell className="">6"</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">10</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">R$ 10,00</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">R$ 100,00</TableCell>
              <TableCell className="flex items-center justify-center gap-4">
                <Button variant="outline">
                  <Delete />
                </Button>
                <Button variant="outline">
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="">Cotovelo</TableCell>
              <TableCell className="">6"</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">10</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">-</TableCell>
              <TableCell className="">R$ 10,00</TableCell>
              <TableCell className="">R$ 100,00</TableCell>
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
