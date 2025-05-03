import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useItemCard } from '@/hooks/useItemCard' // Usando o hook correto para gerenciar itens
import { ItemData } from '@/api/ItemCardService' // Tipos de dados do item

interface ModalNovoItemProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cardId: string
}

export function ModalNovoItem({ open, onOpenChange, cardId }: ModalNovoItemProps) {
  const [form, setForm] = useState({
    codigo: '',
    materialName: '',
    medida: '',
    ncm: '',
    codigoFabrica: '',
    quantidade: '',
    precoUnitario: ''
  })

  const queryClient = useQueryClient()
  const { criarItem } = useItemCard(cardId) // Usando o hook para criar o item no card

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const data: ItemData = {
      codigo: form.codigo,
      materialName: form.materialName,
      medida: form.medida,
      ncm: form.ncm,
      codigoFabrica: form.codigoFabrica,
      quantidade: Number(form.quantidade),
      precoUnitario: Number(form.precoUnitario)
    }

    try {
      // Criando o item usando a mutação
      await criarItem({ cardId, itemData: data })
      onOpenChange(false) // Fechar o modal após sucesso
      setForm({
        codigo: '',
        materialName: '',
        medida: '',
        ncm: '',
        codigoFabrica: '',
        quantidade: '',
        precoUnitario: ''
      }) // Limpar os campos do formulário
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">Adicionar Novo Item</h2>
        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor={key}
            >
              {key[0].toUpperCase() + key.slice(1)}
            </label>
            <Input
              id={key}
              name={key}
              placeholder={key}
              value={value}
              onChange={handleChange}
              className="mt-2"
            />
          </div>
        ))}

        <div className="mt-4 flex justify-end gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            variant="secondary"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 text-white"
            disabled={false} // Se desejar adicionar um estado de loading, pode usar um `isLoading` aqui
          >
            Adicionar Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
