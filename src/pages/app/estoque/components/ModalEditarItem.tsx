import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useItemCard } from '@/hooks/useItemCard'

interface ItemData {
  _id: string
  cardId: string
  materialName: string
  medida: string
  ncm: string
  quantidade: number
  precoUnitario: number
  precoCusto: number
  custoTotal?: number
}

interface ModalEditarItemProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  item: ItemData | null
  onSave: () => void
}

export function ModalEditarItem({
  open,
  onOpenChange,
  item,
  onSave
}: ModalEditarItemProps) {
  if (!item) {
    return (
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent>
          <h2 className="text-lg font-semibold">Editar Item</h2>
          <div className="mt-4 text-center text-red-500">Item não encontrado.</div>
        </DialogContent>
      </Dialog>
    )
  }

  const [materialName, setmaterialName] = useState(item.materialName || '')
  const [medida, setMedida] = useState(item.medida || '')
  const [ncm, setNcm] = useState(item.ncm || '')
  const [quantidade, setQuantidade] = useState(item.quantidade || 0)
  const [precoUnitario, setPrecoUnitario] = useState(item.precoUnitario || 0)
  const [precoCusto, setPrecoCusto] = useState(item.precoCusto || 0)

  const { editarItem } = useItemCard(item.cardId)

  useEffect(() => {
    if (item) {
      setmaterialName(item.materialName)
      setMedida(item.medida)
      setNcm(item.ncm)
      setQuantidade(item.quantidade)
      setPrecoUnitario(item.precoUnitario)
      setPrecoCusto(item.precoCusto || 0)
    }
  }, [item])

  const handleSave = async () => {
    const updatedData: ItemData = {
      _id: item._id,
      cardId: item.cardId,
      materialName,
      medida,
      ncm,
      quantidade,
      precoUnitario,
      precoCusto
    }

    const changes: Partial<ItemData> = {}
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key as keyof ItemData] !== item[key as keyof ItemData]) {
        changes[key as keyof ItemData] = updatedData[key as keyof ItemData]
      }
    })

    if (Object.keys(changes).length === 0) {
      alert('Nenhuma alteração detectada.')
      return
    }

    try {
      await editarItem({
        cardId: item.cardId,
        itemId: item._id,
        updatedData: changes
      })

      onSave()
      onOpenChange(false)
    } catch (error) {
      console.error('Erro ao salvar item:', error)
      alert('Erro ao salvar o item. Tente novamente.')
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <h2 className="text-lg font-semibold">Editar Item</h2>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Material</label>
          <Input
            value={materialName}
            onChange={(e) => setmaterialName(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Medida</label>
          <Input
            value={medida}
            onChange={(e) => setMedida(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">NCM</label>
          <Input
            value={ncm}
            onChange={(e) => setNcm(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Quantidade</label>
          <Input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Preço Unitário
          </label>
          <Input
            type="number"
            value={precoUnitario}
            onChange={(e) => setPrecoUnitario(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Preço de Custo
          </label>
          <Input
            type="number"
            value={precoCusto}
            onChange={(e) => setPrecoCusto(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            variant="secondary"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 text-white"
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
