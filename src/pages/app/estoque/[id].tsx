// src/pages/app/estoque/itensDoCardPage.tsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useItemCard } from '@/hooks/useItemCard'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { EditIcon, TrashIcon } from 'lucide-react'
import { ModalEditarItem } from './components/ModalEditarItem'
import { ModalNovoItem } from './components/ModalNovoItem'

export default function ItensDoCardPage() {
  const { id } = useParams() // Obtendo o ID do parâmetro da rota
  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<any>(null)

  // Verifique se o id está presente antes de passar para o hook
  if (!id) {
    return <div>Erro: ID do card não encontrado.</div> // Exibe um erro se o id não for encontrado
  }

  const { itens, isLoading, isError, criarItem, editarItem, deletarItem, queryClient } =
    useItemCard(id) // Passando o ID validado para o hook

  const handleEditItem = (item: any) => {
    setItemToEdit(item)
    setOpenEditModal(true)
  }

  const handleAddItem = async (newItem: any) => {
    try {
      if (!id) {
        alert('ID do card não encontrado.')
        return
      }
      await criarItem({ cardId: id, itemData: newItem })
      setOpenModal(false)
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    try {
      if (id) {
        await deletarItem({ cardId: id, itemId })
        queryClient.invalidateQueries(['itens-card', id])
      }
    } catch (error) {
      console.error('Erro ao excluir item:', error)
    }
  }

  if (isError) return <div>Erro ao carregar os itens.</div>
  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          {itens?.[0]?.cardNome ?? 'Itens do Card'}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate('/estoque')}
          >
            Voltar
          </Button>
          <Button
            onClick={() => setOpenModal(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            + Adicionar Linha à tabela
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-background shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material</TableHead>
              <TableHead>Medida</TableHead>
              <TableHead>NCM/SH</TableHead>
              <TableHead>Cód. Fábrica</TableHead>
              <TableHead>Un/Qtd/Metros</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Custo Total</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {itens?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.materialName}</TableCell>
                <TableCell>{item.medida}</TableCell>
                <TableCell>{item.ncm}</TableCell>
                <TableCell>{item.codigoFabrica}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell>R$ {item.precoUnitario?.toFixed(2)}</TableCell>
                <TableCell>R$ {item.custoTotal?.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditItem(item)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ModalEditarItem
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        item={itemToEdit}
        onSave={() => queryClient.invalidateQueries(['itens-card', id])}
      />

      <ModalNovoItem
        open={openModal}
        onOpenChange={setOpenModal}
        cardId={id}
        onSave={handleAddItem}
      />
    </div>
  )
}
