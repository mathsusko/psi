import { Button } from '@/components/ui/button'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from '@/components/ui/table'
import { Download, Eye, Plus } from 'lucide-react'

export default function NotasFiscais() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-xl">Notas fiscais</span>
        <Button variant="outline">
          Subir NF
          <Plus />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Data de geração</TableHead>

            <TableHead className="flex justify-center items-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Serviço 1</TableCell>
            <TableCell>01/01/2023</TableCell>
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
