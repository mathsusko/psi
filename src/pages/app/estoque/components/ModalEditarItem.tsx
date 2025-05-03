import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useItemCard } from '@/hooks/useItemCard'
import { ItemData } from '@/api/ItemCardService'

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

  const [codigo, setCodigo] = useState(item.codigo || '')
  const [materialName, setmaterialName] = useState(item.materialName || '')
  const [medida, setMedida] = useState(item.medida || '')
  const [ncm, setNcm] = useState(item.ncm || '')
  const [codigoFabrica, setCodigoFabrica] = useState(item.codigoFabrica || '')
  const [quantidade, setQuantidade] = useState(item.quantidade || 0)
  const [precoUnitario, setPrecoUnitario] = useState(item.precoUnitario || 0)

  const { editarItem } = useItemCard(item.cardId)

  useEffect(() => {
    if (item) {
      setCodigo(item.codigo)
      setmaterialName(item.materialName)
      setMedida(item.medida)
      setNcm(item.ncm)
      setCodigoFabrica(item.codigoFabrica)
      setQuantidade(item.quantidade)
      setPrecoUnitario(item.precoUnitario)
    }
  }, [item])

  const handleSave = async () => {
    if (!codigo || !materialName || !quantidade || !precoUnitario) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const updatedData: ItemData = {
      codigo,
      materialName,
      medida,
      ncm,
      codigoFabrica,
      quantidade,
      precoUnitario
    }

    const changes: Partial<ItemData> = {}

    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] !== item[key as keyof ItemData]) {
        changes[key as keyof ItemData] = updatedData[key]
      }
    })

    if (Object.keys(changes).length === 0) {
      alert('Nenhuma alteração detectada.')
      return
    }

    try {
      // Adicionei log para inspecionar os dados antes de enviar
      console.log('Dados enviados para editar:', {
        itemId: item._id,
        updatedData: changes
      })

      await editarItem({
        cardId: item.cardId,
        itemId: item._id,
        updatedData: changes
      })

      onSave() // Notifica o componente pai que a edição foi salva
      onOpenChange(false) // Fecha o modal após a edição ser salva com sucesso
    } catch (error) {
      // Alterado para mostrar mensagem de erro mais detalhada
      console.error('Erro ao salvar item:', error)
      alert('Erro ao salvar o item. Tente novamente. Erro: ' + error.message) // Inclui a mensagem de erro
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
          <label className="block text-sm font-medium text-gray-700">Código</label>
          <Input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="mt-2"
          />
        </div>

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
          <label className="block text-sm font-medium text-gray-700">
            Código de Fábrica
          </label>
          <Input
            value={codigoFabrica}
            onChange={(e) => setCodigoFabrica(e.target.value)}
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

        <div className="mt-4 flex justify-end gap-2">
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
