// src/hooks/useCardsEstoque.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import CardEstoqueService from '../api/card-estoque'

export function useCardsEstoque() {
  const queryClient = useQueryClient()

  // Consultar todos os cards
  const { data: cards, isLoading, isError } = useQuery({
    queryKey: ['cards-estoque'],
    queryFn: CardEstoqueService.listar
  })

  // Função para criar um novo card
  const { mutateAsync: criarCard } = useMutation({
    mutationFn: CardEstoqueService.criar,
    onSuccess: () => {
      queryClient.invalidateQueries(['cards-estoque']) // atualiza lista após criação
    }
  })

  return { cards, criarCard, isLoading, isError }
}
