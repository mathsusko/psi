import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CardEstoqueService from '@/api/card-estoque'

interface ModalNovoItemProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cardId: string
}

export function ModalNovoItem({ open, onOpenChange, cardId }: ModalNovoItemProps) {
  const [form, setForm] = useState({
    codigo: '',
    descricao: '',
    medida: '',
    ncm: '',
    codigoFabrica: '',
    quantidade: '',
    precoUnitario: '',
  })

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      const data = {
        ...form,
        quantidade: Number(form.quantidade),
        precoUnitario: Number(form.precoUnitario),
      }
      return await CardEstoqueService.criarItem(cardId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['itens-card', cardId])
      onOpenChange(false)
      setForm({
        codigo: '',
        descricao: '',
        medida: '',
        ncm: '',
        codigoFabrica: '',
        quantidade: '',
        precoUnitario: '',
      })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    mutateAsync()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">Adicionar Novo Item</h2>
        {Object.entries(form).map(([key, value]) => (
          <Input
            key={key}
            name={key}
            placeholder={key}
            value={value}
            onChange={handleChange}
          />
        ))}
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Adicionando...' : 'Adicionar Item'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
