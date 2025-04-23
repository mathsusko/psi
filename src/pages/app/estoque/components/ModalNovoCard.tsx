// src/pages/app/estoque/components/ModalNovoCard.tsx
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from 'react-day-picker'
import { useCardsEstoque } from '../../../../hooks/useCardsEstoque'

export function ModalNovoCard() {
  const [nome, setNome] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)
  const { criarCard } = useCardsEstoque()

  const handleSubmit = async () => {
    if (!nome || !imagem) return
    await criarCard({ nome, imagem })
    // Fecha o modal e atualiza a lista
  }

  return (
    <Dialog>
      <DialogContent>
        <Input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="file"
          onChange={(e) => setImagem(e.target.files?.[0] || null)}
        />
        <Button onClick={handleSubmit}>Criar</Button>
      </DialogContent>
    </Dialog>
  )
}
