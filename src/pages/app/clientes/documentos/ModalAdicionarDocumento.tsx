import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DocumentosService } from '@/api/Documentos'

interface ModalAdicionarDocumentoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadSuccess: () => void
  clienteId: string
}

const ModalAdicionarDocumento = ({
  open,
  onOpenChange,
  onUploadSuccess,
  clienteId
}: ModalAdicionarDocumentoProps) => {
  const [descricao, setDescricao] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!selectedFile || !descricao) {
      alert('Por favor, selecione um arquivo e insira uma descrição.')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('descricao', descricao)

      // Chama o método de upload correto
      const documento = await DocumentosService.upload(clienteId, formData)

      alert('Documento enviado com sucesso!')

      setDescricao('')
      setSelectedFile(null)
      onOpenChange(false)
      onUploadSuccess()
    } catch (error) {
      console.error('Erro ao fazer upload do documento:', error)
      alert('Erro ao enviar o documento. Verifique o arquivo e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>
        <Button>+ Adicionar Documento</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Adicionar Novo Documento</DialogTitle>

        <div className="space-y-4">
          <Input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
          <Input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição do Documento"
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAdicionarDocumento
