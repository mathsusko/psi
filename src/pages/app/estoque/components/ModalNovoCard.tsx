import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button' // ⚠️ garantir que esse Button é do seu design system
import { useCardsEstoque } from '../../../../hooks/useCardsEstoque'

export function ModalNovoCard({ open, onOpenChange }: { open: boolean, onOpenChange: (v: boolean) => void }) {
  const [nome, setNome] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)
  const { criarCard } = useCardsEstoque()

  const handleSubmit = async () => {
    if (!nome || !imagem) return
    await criarCard({ nome, imagem })
    setNome('')
    setImagem(null)
    onOpenChange(false) // fecha o modal
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Input
          placeholder="Nome do card"
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
