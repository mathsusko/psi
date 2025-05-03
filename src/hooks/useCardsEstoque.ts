// hooks/useCardsEstoque.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import CardEstoqueService from '../api/CardEstoqueService'

// Tipos de dados para o Card
interface CardData {
  nome?: string // Permitir campos opcionais
  categoria?: string
  imagem?: File
  imagemUrl?: string // Adicionando imagemUrl para manter a imagem atual
}

// Hook para gerenciar os Cards
export function useCardsEstoque() {
  const queryClient = useQueryClient()

  // Consultar todos os cards
  const {
    data: cards,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['cards-estoque'],
    queryFn: CardEstoqueService.listar
  })

  // Função para criar um novo card
  const { mutateAsync: criarCard } = useMutation({
    mutationFn: CardEstoqueService.criar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards-estoque'] }) // Corrigido: Especificando queryKey corretamente
    },
    onError: (error) => {
      console.error('Erro ao criar card:', error)
    }
  })

  // Função para editar um card existente
  const { mutateAsync: editarCard } = useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string
      data: { nome: string; imagem?: File; imagemUrl?: string }
    }) => CardEstoqueService.editar(id, data), // Passa somente nome e imagem
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards-estoque'] })
    },
    onError: (error) => {
      console.error('Erro ao editar card:', error)
    }
  })

  // Função para deletar um card
  const { mutateAsync: deletarCard } = useMutation({
    mutationFn: CardEstoqueService.deletar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards-estoque'] }) // Corrigido: Especificando queryKey corretamente
    },
    onError: (error) => {
      console.error('Erro ao deletar card:', error)
    }
  })

  return { cards, criarCard, editarCard, deletarCard, isLoading, isError }
}
