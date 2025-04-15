import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Delete, Download, Edit, X } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export function PrevisualizacaoOrcamentoDeMateriais() {
  return (
    <>
      <Helmet title="Orçamentos" />

      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">
          Previsualizacao orçamento de materiais
        </h1>
      </div>

      <div className="flex flex-col gap-4 p-4 space-y-2.5 rounded-xl bg-sidebar text-sidebar-foreground">
        <div className="w-full flex flex-col gap-4 rounded-xl border p-4">
          <span>Informações do emitente</span>
          <div className="flex gap-4">
            <div className="w-full flex flex-col items-end space-y-2.5 text-sm">
              <p>Nome/Razão Social</p>
              <p>CPF/CNPJ</p>
              <p>Endereço</p>
              <p>Cidade</p>
              <p>Estado</p>
              <p>CEP</p>
              <p>Site</p>
              <p>Telefone</p>
              <p>E-mail</p>
            </div>
            <div className="w-full flex flex-col space-y-2.5 text-sm">
              <p>Nome/Razão Social</p>
              <p>CPF/CNPJ</p>
              <p>Endereço</p>
              <p>Cidade</p>
              <p>Estado</p>
              <p>CEP</p>
              <p>Site</p>
              <p>Telefone</p>
              <p>E-mail</p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <NavLink to="/gerar-orcamento-materiais">
              <Button
                variant="outline"
                className="px-12"
              >
                Edit campos <Edit />
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 rounded-xl border p-4">
          <span>Informações do cliente</span>

          <div className="flex gap-4">
            <div className="w-full flex flex-col items-end space-y-2.5 text-sm">
              <p>Nome/Razão Social</p>
              <p>CPF/CNPJ</p>
              <p>Endereço</p>
              <p>Cidade</p>
              <p>Estado</p>
              <p>CEP</p>
              <p>Site</p>
              <p>Telefone</p>
              <p>E-mail</p>
            </div>
            <div className="w-full flex flex-col space-y-2.5 text-sm">
              <p>Nome/Razão Social</p>
              <p>CPF/CNPJ</p>
              <p>Endereço</p>
              <p>Cidade</p>
              <p>Estado</p>
              <p>CEP</p>
              <p>Site</p>
              <p>Telefone</p>
              <p>E-mail</p>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <NavLink to="/gerar-orcamento-materiais">
              <Button
                variant="outline"
                className="px-12"
              >
                Editar campos <Edit />
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 rounded-xl border p-4">
          <span>Dados do orçamento</span>
          <div className="flex gap-4">
            <div className="w-full flex flex-col items-end space-y-2.5 text-sm">
              <p>Custo</p>
              <p>Data Entra. Início</p>
              <p>Data Saída:</p>
            </div>
            <div className="w-full flex flex-col space-y-2.5 text-sm">
              <p>R$ 10.000,00</p>
              <p>12/04/2025</p>
              <p>12/05/2025</p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <NavLink to="/gerar-orcamento-materiais">
              <Button
                variant="outline"
                className="px-12"
              >
                Editar campos <Edit />
              </Button>
            </NavLink>
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
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex justify-between">
        <NavLink to="/gerar-orcamento-materiais">
          <Button
            variant="outline"
            className="px-12"
          >
            Cancelar <X />
          </Button>
        </NavLink>
        <NavLink to="/gerar-orcamento-materiais">
          <Button className="px-12">
            Gerar orçamento <Download />
          </Button>
        </NavLink>
      </div>
    </>
  )
}
