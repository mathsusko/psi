import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useItemCard } from '@/hooks/useItemCard'

interface ItemData {
  codigo: string
  materialName: string
  medida: string
  ncm: string
  codigoFabrica: string
  quantidade: number
  precoUnitario: number
  custoTotal?: number
}

interface ModalNovoItemProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cardId: string
  onSave: (newItem: ItemData) => Promise<void>
}

export function ModalNovoItem({
  open,
  onOpenChange,
  cardId,
  onSave
}: ModalNovoItemProps) {
  const [form, setForm] = useState({
    codigo: '',
    materialName: '',
    medida: '',
    ncm: '',
    codigoFabrica: '',
    quantidade: '',
    precoUnitario: ''
  })

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
      await onSave(data)
      onOpenChange(false)
      setForm({
        codigo: '',
        materialName: '',
        medida: '',
        ncm: '',
        codigoFabrica: '',
        quantidade: '',
        precoUnitario: ''
      })
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
      alert('Erro ao adicionar item. Verifique os dados e tente novamente.')
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
          >
            Adicionar Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
