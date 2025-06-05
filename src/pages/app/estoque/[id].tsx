import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useItemCard } from '@/hooks/useItemCard'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { EditIcon, TrashIcon, ArrowUpDown } from 'lucide-react'
import { ModalEditarItem } from './components/ModalEditarItem'
import { ModalNovoItem } from './components/ModalNovoItem'

type SortOrder = 'asc' | 'desc'

export default function ItensDoCardPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<any>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const { itens, isLoading, isError, criarItem, deletarItem } = useItemCard(id ?? '')

  if (!id) return <div>Erro: ID do card não encontrado.</div>
  if (isError) return <div>Erro ao carregar os itens.</div>
  if (isLoading) return <div>Carregando...</div>

  const handleEditItem = (item: any) => {
    setItemToEdit(item)
    setOpenEditModal(true)
  }

  const handleAddItem = async (newItem: any) => {
    try {
      await criarItem({ cardId: id, itemData: newItem })
      setOpenModal(false)
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    try {
      await deletarItem({ cardId: id, itemId })
      queryClient.invalidateQueries({ queryKey: ['itens-card', id] })
    } catch (error) {
      console.error('Erro ao excluir item:', error)
    }
  }

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const parseMedidaToNumber = (medida: string): number => {
    if (!medida) return 0
    const cleaned = medida.replace(/['"]/g, '').trim()

    // Ex: 1 1/2 -> ["1", "1/2"]
    const parts = cleaned.split(' ')
    let total = 0

    parts.forEach((part) => {
      if (part.includes('/')) {
        const [numerator, denominator] = part.split('/')
        if (!isNaN(+numerator) && !isNaN(+denominator)) {
          total += +numerator / +denominator
        }
      } else if (!isNaN(+part)) {
        total += +part
      }
    })

    return total
  }

  const itensOrdenados = [...(itens ?? [])].sort((a, b) => {
    const medidaA = parseMedidaToNumber(a.medida)
    const medidaB = parseMedidaToNumber(b.medida)

    return sortOrder === 'asc' ? medidaA - medidaB : medidaB - medidaA
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Itens do Card</h1>
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
              <TableHead className="flex items-center gap-1">
                Medida
                <button
                  onClick={toggleSortOrder}
                  title="Ordenar Medidas"
                >
                  <ArrowUpDown size={16} />
                </button>
              </TableHead>
              <TableHead>NCM/SH</TableHead>
              <TableHead>Un/Qtd/Metros</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Preço de Custo</TableHead>
              <TableHead>Custo Total</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {itensOrdenados.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.materialName}</TableCell>
                <TableCell>{item.medida}</TableCell>
                <TableCell>{item.ncm}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell>R$ {item.precoUnitario?.toFixed(2)}</TableCell>
                <TableCell>R$ {item.precoCusto?.toFixed(2)}</TableCell>
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
                      onClick={() => handleDeleteItem(item._id ?? '')}
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
        onSave={() => queryClient.invalidateQueries({ queryKey: ['itens-card', id] })}
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
