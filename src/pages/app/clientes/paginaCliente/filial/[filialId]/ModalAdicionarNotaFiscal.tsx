import { useState, ChangeEvent } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCriarNotaFiscal } from '@/hooks/useNotasFiscais'
import { toast } from 'sonner'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  filialId: string
}

export function ModalAdicionarNotaFiscal({ open, onOpenChange, filialId }: Props) {
  const [clienteNome, setClienteNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataRecebimento, setDataRecebimento] = useState('')
  const [arquivo, setArquivo] = useState<File | null>(null)

  const { mutateAsync, isLoading } = useCriarNotaFiscal()

  const handleSubmit = async () => {
    if (!arquivo) {
      toast.error('Envie o arquivo da nota fiscal.')
      return
    }

    const formData = new FormData()
    formData.append('clienteNome', clienteNome)
    formData.append('descricao', descricao)
    formData.append('dataRecebimento', dataRecebimento)
    formData.append('arquivo', arquivo)
    formData.append('filialId', filialId) // Enviando o ID da filial

    try {
      await mutateAsync(formData)
      toast.success('Nota fiscal adicionada com sucesso.')
      onOpenChange(false)

      // Resetando os campos
      setClienteNome('')
      setDescricao('')
      setDataRecebimento('')
      setArquivo(null)
    } catch (error) {
      toast.error('Erro ao salvar nota fiscal.')
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setArquivo(file)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-md space-y-4">
        <h2 className="text-lg font-bold">Nova Nota Fiscal</h2>

        <div className="space-y-2">
          <Label>Nome da Empresa</Label>
          <Input
            value={clienteNome}
            onChange={(e) => setClienteNome(e.target.value)}
            placeholder="Empresa responsável"
          />
        </div>

        <div className="space-y-2">
          <Label>Descrição</Label>
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Detalhes da nota"
          />
        </div>

        <div className="space-y-2">
          <Label>Data de Recebimento</Label>
          <Input
            type="date"
            value={dataRecebimento}
            onChange={(e) => setDataRecebimento(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Arquivo PDF</Label>
          <Input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
