import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCardsEstoque } from '../../../../hooks/useCardsEstoque'

export function ModalNovoCard({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [nome, setNome] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)
  const [categoria, setCategoria] = useState('Un') // Estado para categoria
  const { criarCard } = useCardsEstoque()

  const handleSubmit = async () => {
    if (!nome || !imagem || !categoria) return
    await criarCard({ nome, imagem, categoria }) // Incluindo categoria
    setNome('')
    setImagem(null)
    setCategoria('Un') // Resetando a categoria
    onOpenChange(false) // Fecha o modal
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <Input
          placeholder="Nome do card"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)} // Mudando categoria
          className="mt-4 p-2 border rounded-md"
        >
          <option value="Un">Un</option>
          <option value="Kg">Kg</option>
          <option value="Metros">Metros</option>
        </select>
        <Input
          type="file"
          onChange={(e) => setImagem(e.target.files?.[0] || null)}
        />
        <Button onClick={handleSubmit}>Criar</Button>
      </DialogContent>
    </Dialog>
  )
}
