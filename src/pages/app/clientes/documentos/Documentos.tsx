import React, { useRef, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Documento = {
  _id: string
  clienteId: string
  descricao: string
  url: string
  createdAt: string
}

const Documentos = ({ clienteId }: { clienteId: string }) => {
  const qc = useQueryClient()

  // === form local (upload) ===
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [descricao, setDescricao] = useState('')

  // === GET lista ===
  const {
    data: documentos = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['documentos', clienteId],
    queryFn: async () => {
      const { data } = await api.get<Documento[]>(`/api/documentos/${clienteId}`)
      return data
    },
    enabled: !!clienteId
  })

  // === POST upload ===
  const uploadMutation = useMutation({
    mutationFn: async ({ file, descricao }: { file: File; descricao: string }) => {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('descricao', descricao ?? '')
      const { data } = await api.post(`/api/documentos/upload/${clienteId}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['documentos', clienteId] })
      // reset form
      setDescricao('')
      if (fileRef.current) fileRef.current.value = ''
    }
  })

  // === DELETE ===
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/api/documentos/${id}`)
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['documentos', clienteId] })
    }
  })

  // === handlers ===
  const handleUpload = () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    uploadMutation.mutate({ file, descricao })
  }

  const handleDownload = (url: string) => {
    // abre o arquivo servido por /uploads/documentos/*
    window.open(url, '_blank')
  }

  return (
    <div className="p-4 space-y-4 bg-sidebar mt-3.5 rounded-2xl">
      <h2 className="text-lg font-semibold">Documentos do cliente</h2>

      {/* Formulário simples de upload */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        <div>
          <Label className="mb-1 block">Arquivo</Label>
          <Input
            ref={fileRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
          />
        </div>
        <div>
          <Label className="mb-1 block">Descrição (opcional)</Label>
          <Input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: RG escaneado, contrato, etc."
          />
        </div>
        <div>
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? 'Enviando...' : 'Enviar documento'}
          </Button>
        </div>
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Enviado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center"
              >
                Carregando...
              </TableCell>
            </TableRow>
          )}

          {isError && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-red-600"
              >
                Erro ao carregar documentos
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !isError && documentos.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                Nenhum documento encontrado.
              </TableCell>
            </TableRow>
          )}

          {documentos.map((doc) => (
            <TableRow key={doc._id}>
              <TableCell className="max-w-[420px] truncate">
                {doc.descricao || '-'}
              </TableCell>
              <TableCell>{new Date(doc.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(doc.url)}
                >
                  Baixar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(doc._id)}
                  disabled={deleteMutation.isPending}
                >
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Documentos
