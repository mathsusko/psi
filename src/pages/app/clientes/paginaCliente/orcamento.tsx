import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Download, Eye } from 'lucide-react'

export default function Orcamento() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl">Orçamentos</span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo do orçamento</TableHead>
            <TableHead>Data de geração</TableHead>
            <TableHead>Itens</TableHead>
            <TableHead>Valor total</TableHead>
            <TableHead className="flex justify-center items-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Serviço 1</TableCell>
            <TableCell>01/01/2023</TableCell>
            <TableCell>3</TableCell>
            <TableCell>R$ 500,00</TableCell>
            <TableCell className="flex justify-center gap-4 items-centers">
              <Download size="16" />
              <Eye size="16" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
