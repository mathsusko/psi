import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCardsEstoque } from '@/hooks/useCardsEstoque'

interface ModalEditarCardProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  id: string
  nome: string
  categoria: string
  imagemUrl: string
}

const ModalEditarCard = ({
  open,
  onOpenChange,
  id,
  nome,
  categoria,
  imagemUrl
}: ModalEditarCardProps) => {
  const [novoNome, setNovoNome] = useState(nome)
  const [novaImagem, setNovaImagem] = useState<File | null>(null)

  const { editarCard } = useCardsEstoque()

  useEffect(() => {
    setNovoNome(nome)
  }, [nome])

  const handleSubmit = async () => {
    if (!novoNome) {
      alert('Nome não pode estar vazio!')
      return
    }

    const updatedCard = {
      nome: novoNome,
      categoria,
      imagem: novaImagem || undefined
    }

    try {
      await editarCard({ id, data: updatedCard })
      onOpenChange(false)
    } catch (error) {
      console.error('Erro ao editar card:', error)
      alert('Erro ao editar card. Tente novamente.')
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogTitle>Editar Card</DialogTitle>

        <div className="mt-4">
          <label htmlFor="nome">Nome:</label>
          <Input
            id="nome"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="categoria">Categoria:</label>
          <Input
            id="categoria"
            value={categoria}
            readOnly
            disabled
          />
        </div>

        <div className="mt-4">
          <label htmlFor="imagem">Imagem:</label>
          <Input
            id="imagem"
            type="file"
            onChange={(e) => setNovaImagem(e.target.files?.[0] || null)}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            variant="secondary"
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalEditarCard
