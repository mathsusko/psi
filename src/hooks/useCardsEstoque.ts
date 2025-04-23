// src/hooks/useCardsEstoque.ts
import { useQuery, useMutation } from '@tanstack/react-query'
import { CardEstoqueService } from '../api/card-estoque'

export function useCardsEstoque() {
  const { data: cards } = useQuery({
    queryKey: ['cards-estoque'],
    queryFn: CardEstoqueService.listar
  })

  const { mutateAsync: criarCard } = useMutation({
    mutationFn: CardEstoqueService.criar
  })

  return { cards, criarCard }
}
  