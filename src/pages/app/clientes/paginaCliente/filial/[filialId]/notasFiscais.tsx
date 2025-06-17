import { useState } from 'react'
import { useNotasFiscais, useDeletarNotaFiscal } from '@/hooks/useNotasFiscais'
import { ModalAdicionarNotaFiscal } from './ModalAdicionarNotaFiscal'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { Trash } from 'lucide-react'

export default function NotasFiscaisRecebidas() {
  const [open, setOpen] = useState(false)
  const { data = [], isLoading } = useNotasFiscais()
  const { mutateAsync: deletarNota } = useDeletarNotaFiscal()

  // Aqui, você pode passar o ID da filial dinamicamente de acordo com a URL
  const filialId = '684071eb0aa7be1361218378' // Exemplo do ID da filial (isso pode vir da URL ou outra lógica)

  const handleDeletar = async (id: string) => {
    try {
      await deletarNota(id)
      toast.success('Nota fiscal removida.')
    } catch (error) {
      toast.error('Erro ao remover nota fiscal.')
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Notas Fiscais Recebidas</h2>
        <Button onClick={() => setOpen(true)}>+ Nova Nota</Button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className="border rounded-xl overflow-x-auto shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data Recebida</TableHead>
                <TableHead>Arquivo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((nota) => (
                <TableRow key={nota._id}>
                  <TableCell>{nota.clienteNome}</TableCell>
                  <TableCell>{nota.descricao}</TableCell>
                  <TableCell>
                    {format(new Date(nota.dataRecebimento), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`/uploads/${nota.caminhoArquivo}`} // Certifique-se de que o arquivo está acessível via URL no servidor
                      download={nota.caminhoArquivo} // Força o download do arquivo
                      className="text-blue-600 underline text-sm"
                    >
                      Baixar PDF
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Excluir nota fiscal"
                      onClick={() => handleDeletar(nota._id)}
                    >
                      <Trash className="w-4 h-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ModalAdicionarNotaFiscal
        open={open}
        onOpenChange={setOpen}
        filialId={filialId} // Passando o ID da filial para o modal
      />
    </div>
  )
}
