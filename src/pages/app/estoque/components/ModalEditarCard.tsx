import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ModalEditarCardProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  nome: string
  imagemUrl: string
  onSave: (nome: string, imagem?: File) => void
}

const ModalEditarCard: React.FC<ModalEditarCardProps> = ({
  open,
  onOpenChange,
  nome,
  imagemUrl,
  onSave,
}) => {
  const [novoNome, setNovoNome] = useState(nome)
  const [novaImagem, setNovaImagem] = useState<File | null>(null)

  const handleSubmit = () => {
    if (!novoNome) return
    onSave(novoNome, novaImagem || undefined)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-4">
        <h2 className="text-lg font-semibold">Editar Card</h2>

        <div className="mt-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome:
          </label>
          <Input
            id="nome"
            placeholder="Nome do card"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">
            Imagem:
          </label>
          <Input
            id="imagem"
            type="file"
            onChange={(e) => setNovaImagem(e.target.files?.[0] || null)}
            className="mt-2"
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={() => onOpenChange(false)} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 text-white">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalEditarCard
