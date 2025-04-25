import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { MoreVerticalIcon } from 'lucide-react'
import ModalEditarCard from './ModalEditarCard'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import CardEstoqueService from '@/api/card-estoque'
import { useDeleteCardEstoque } from '@/hooks/useCardsEstoque'

interface CardEstoqueProps {
  id: string
  nome: string
  imagemUrl: string
}

export function CardEstoque({ id, nome, imagemUrl }: CardEstoqueProps) {
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nomeEditado, setNomeEditado] = useState(nome)
  const [imagemEditada, setImagemEditada] = useState(imagemUrl)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
  const [quantidadeTotal, setQuantidadeTotal] = useState(0)

  const { mutate: deletarCard } = useDeleteCardEstoque()

  // Buscar quantidade de itens do card
  useEffect(() => {
    const fetchQuantidade = async () => {
      try {
        const itens = await CardEstoqueService.listarItens(id)
        const total = itens.reduce((acc: number, item: any) => acc + Number(item.quantidade || 0), 0)
        setQuantidadeTotal(total)
      } catch (error) {
        console.error('Erro ao buscar quantidade:', error)
      }
    }

    fetchQuantidade()
  }, [id])

  // Salvar edição
  const handleSave = async (novoNome: string, novaImagem?: File) => {
    try {
      const response = await CardEstoqueService.editar(id, {
        nome: novoNome,
        imagem: novaImagem,
      })

      setNomeEditado(response.data.nome)
      setImagemEditada(`http://localhost:3333${response.data.imagemUrl}`)
    } catch (error) {
      console.error('Erro ao editar card:', error)
    }
  }

  // Confirmar exclusão (reativo)
  const handleConfirmDelete = () => {
    deletarCard(id)
    setIsConfirmDeleteOpen(false)
  }

  const handleCancelDelete = () => setIsConfirmDeleteOpen(false)
  const handleEdit = () => setIsModalOpen(true)
  const handleDelete = () => setIsConfirmDeleteOpen(true)
  const handleVerMais = () => navigate(`/app/estoque/${id}`)

  return (
    <div className="flex flex-col gap-2 rounded-lg shadow-md transition-transform duration-200 bg-sidebar hover:shadow-lg dark:bg-sidebar-800 foreground p-4">
      {/* Botão de opções */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded hover:bg-muted transition">
              <MoreVerticalIcon className="w-5 h-5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Editar Card</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Deletar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Imagem */}
      <div className="w-full h-60 mb-4 flex justify-center items-center rounded-lg">
        <img
          src={imagemEditada || '/placeholder.png'}
          alt={nomeEditado}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Informações */}
      <div className="flex flex-col gap-1">
        <span className="text-left text-sm font-semibold text-gray-800 dark:text-white">
          {nomeEditado}
        </span>
        <span className="text-left text-xs text-gray-600 dark:text-gray-300">
          Quantidade em estoque: {quantidadeTotal}
        </span>
      </div>

      {/* Botão "Ver Itens" */}
      <button
        onClick={handleVerMais}
        className="w-full mt-3 px-2 py-2 text-base text-white bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Ver itens
      </button>

      {/* Modal de edição */}
      <ModalEditarCard
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        nome={nomeEditado}
        imagemUrl={imagemEditada}
        onSave={handleSave}
      />

      {/* Modal de confirmação de exclusão */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir este card? Esta ação não poderá ser desfeita.
          </DialogDescription>
          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={handleCancelDelete} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} className="bg-red-600 text-white">
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
