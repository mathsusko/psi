import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import ModalAdicionarDocumento from './ModalAdicionarDocumento'
import { useDocumentos } from '@/hooks/useDocumentos'

const Documentos = ({ clienteId }: { clienteId: string }) => {
  const [open, setOpen] = useState(false) // Controle do estado do modal
  const { documentos, isLoading, isError, upload, deletar, atualizarDescricao } =
    useDocumentos(clienteId)

  const handleDownload = (url: string) => {
    window.open(url, '_blank')
  }

  const handleDelete = (documentoId: string) => {
    deletar.mutate(documentoId)
  }

  const handleDescricaoChange = (documentoId: string, descricao: string) => {
    atualizarDescricao.mutate({ id: documentoId, descricao })
  }

  const handleUploadSuccess = () => {
    // Atualizar a lista de documentos após o upload
    setOpen(false)
  }

  return (
    <div className="p-4 space-y-4 bg-sidebar mt-3.5 rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Documentos gerais</h2>
        <ModalAdicionarDocumento
          open={open}
          onOpenChange={setOpen}
          onUploadSuccess={handleUploadSuccess}
          clienteId={clienteId}
        />
      </div>

      {/* Tabela de Documentos */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Documento</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center"
              >
                Carregando...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-red-600"
              >
                Erro ao carregar documentos
              </TableCell>
            </TableRow>
          ) : documentos.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                Nenhum documento encontrado.
              </TableCell>
            </TableRow>
          ) : (
            documentos.map((documento) => (
              <TableRow key={documento._id}>
                <TableCell>{documento.descricao}</TableCell>
                <TableCell>{documento.descricao}</TableCell> {/* Descrição */}
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(documento.url)}
                  >
                    Baixar
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(documento._id)}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Documentos
