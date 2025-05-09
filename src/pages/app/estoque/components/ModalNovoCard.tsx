import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCardsEstoque } from '@/hooks/useCardsEstoque'

interface ModalNovoCardProps {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function ModalNovoCard({ open, onOpenChange }: ModalNovoCardProps) {
  const [nome, setNome] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)
  const [categoria, setCategoria] = useState('Un')
  const { criarCard } = useCardsEstoque()

  const handleSubmit = async () => {
    if (!nome || !imagem || !categoria) {
      alert('Todos os campos são obrigatórios.')
      return
    }

    try {
      await criarCard({ nome, imagem, categoria })
      setNome('')
      setImagem(null)
      setCategoria('Un')
      onOpenChange(false)
    } catch (error) {
      console.error('Erro ao criar card:', error)
      alert('Erro ao criar card. Tente novamente.')
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="space-y-4">
        <DialogTitle>Criar Novo Card</DialogTitle>

        <Input
          placeholder="Nome do card"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full border rounded-md p-2 text-sm"
        >
          <option value="Un">Un</option>
          <option value="Kg">Kg</option>
          <option value="Metros">Metros</option>
        </select>

        <Input
          type="file"
          onChange={(e) => setImagem(e.target.files?.[0] || null)}
        />

        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Criar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
