import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useItensDoCard } from '@/hooks/useItensDoCard'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CardEstoqueService from '@/api/card-estoque'
import { ModalEditarItem } from './components/ModalEditarItem'
import { ModalNovoItem } from './components/ModalNovoItem'
import { EditIcon, TrashIcon } from 'lucide-react'

export default function ItensDoCardPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<any>(null)
  const { data: itens, isLoading, isError } = useItensDoCard(id!)
  const queryClient = useQueryClient()

  const handleEditItem = (item: any) => {
    setItemToEdit(item)
    setOpenEditModal(true)
  }

  const { mutate: deletarItem } = useMutation({
    mutationFn: (itemId: string) => CardEstoqueService.deletarItem(id!, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(['itens-card', id])
    },
  })

  const handleAddItem = async (newItem: any) => {
    try {
      if (!id) {
        alert("ID do card não encontrado.")
        return
      }
      await CardEstoqueService.criarItem(id, newItem)
      queryClient.invalidateQueries(['itens-card', id])
      setOpenModal(false)
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
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
          <Button variant="outline" onClick={() => navigate('/estoque')}>
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
              <TableHead>Código</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Medida</TableHead>
              <TableHead>NCM/SH</TableHead>
              <TableHead>Cód. Fábrica</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço Un.</TableHead>
              <TableHead>Custo Total</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itens?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.descricao}</TableCell>
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
                      onClick={() => deletarItem(item.cardId, item._id)}
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
        cardId={id!}
      />
    </div>
  )
}
