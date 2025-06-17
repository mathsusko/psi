import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { MoreVerticalIcon } from 'lucide-react'
import ModalEditarCard from './ModalEditarCard'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCardsEstoque } from '@/hooks/useCardsEstoque'
import { useItemCard } from '@/hooks/useItemCard'

interface CardEstoqueProps {
  id: string
  nome: string
  imagemUrl: string
  categoria: string
}

export function CardEstoque({ id, nome, imagemUrl, categoria }: CardEstoqueProps) {
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nomeEditado, setNomeEditado] = useState(nome)
  const [imagemEditada, setImagemEditada] = useState(imagemUrl)
  const [categoriaEditada, setCategoriaEditada] = useState(categoria)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
  const [quantidadeTotal, setQuantidadeTotal] = useState(0)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const { deletarCard, editarCard } = useCardsEstoque()
  const { itens } = useItemCard(id)

  useEffect(() => {
    const total = itens?.reduce(
      (acc: number, item: any) => acc + Number(item.quantidade || 0),
      0
    )
    setQuantidadeTotal(total || 0)
  }, [itens])

  const handleSave = async (
    novoNome: string,
    novaCategoria: string,
    novaImagem?: File
  ) => {
    try {
      const response = await editarCard({
        id,
        data: {
          nome: novoNome,
          categoria: novaCategoria, // agora aceita
          imagem: novaImagem
        }
      })

      setNomeEditado(response.data.nome)
      setCategoriaEditada(response.data.categoria)
      setImagemEditada(`${import.meta.env.VITE_API_URL}${response.data.imagemUrl}`)
    } catch (error) {
      console.error('Erro ao editar card:', error)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      setIsLoadingDelete(true)
      await deletarCard(id)
      setIsConfirmDeleteOpen(false)
    } catch (error) {
      console.error('Erro ao excluir card:', error)
    } finally {
      setIsLoadingDelete(false)
    }
  }

  const handleCancelDelete = () => setIsConfirmDeleteOpen(false)
  const handleEdit = () => setIsModalOpen(true)
  const handleDelete = () => setIsConfirmDeleteOpen(true)
  const handleVerMais = () => navigate(`/estoque/${id}`)

  return (
    <div className="flex flex-col gap-2 rounded-lg shadow-md transition-transform duration-200 bg-sidebar hover:shadow-lg dark:bg-sidebar-800 foreground p-4">
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

      <div className="w-full h-60 mb-4 flex justify-center items-center rounded-lg">
        <img
          src={imagemEditada || '/placeholder.png'}
          alt={nomeEditado}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-left text-sm font-semibold text-gray-800 dark:text-white">
          {nomeEditado}
        </span>
        <span className="text-left text-xs text-gray-600 dark:text-gray-300">
          Categoria: {categoriaEditada}
        </span>
        <span className="text-left text-xs text-gray-600 dark:text-gray-300">
          Quantidade em estoque: {quantidadeTotal}
        </span>
      </div>

      <button
        onClick={handleVerMais}
        className="w-full mt-3 px-2 py-2 text-base text-white bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Ver itens
      </button>

      <ModalEditarCard
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        id={id}
        nome={nomeEditado}
        categoria={categoriaEditada}
        imagemUrl={imagemEditada}
        onSave={handleSave}
      />

      <Dialog
        open={isConfirmDeleteOpen}
        onOpenChange={setIsConfirmDeleteOpen}
      >
        <DialogContent>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir este card? Esta ação não poderá ser
            desfeita.
          </DialogDescription>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              onClick={handleCancelDelete}
              variant="secondary"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white"
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? 'Excluindo...' : 'Confirmar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
