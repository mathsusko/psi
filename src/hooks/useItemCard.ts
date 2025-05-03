// src/hooks/useItemCard.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import ItemCardService from '../api/ItemCardService'

// Tipos de dados para os Itens do Card
interface ItemData {
  codigo: string
  materialName: string
  medida: string
  ncm: string
  codigoFabrica: string
  quantidade: number
  precoUnitario: number
  custoTotal?: number
}

// Hook para gerenciar os Itens de um Card
export function useItemCard(cardId: string) {
  const queryClient = useQueryClient()

  // Consultar os itens de um card
  const {
    data: itens,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['itens-card', cardId],
    queryFn: () => ItemCardService.listarItens(cardId),
    onError: (error) => {
      console.error('Erro ao carregar itens:', error)
    }
  })

  // Função para criar um novo item no card
  const { mutateAsync: criarItem } = useMutation({
    mutationFn: (params: { cardId: string; itemData: ItemData }) =>
      ItemCardService.criarItem(params.cardId, params.itemData),
    onSuccess: () => {
      queryClient.invalidateQueries(['itens-card', cardId]) // Atualiza lista de itens após criação
    },
    onError: (error) => {
      console.error('Erro ao criar item:', error)
      alert('Erro ao criar o item. Tente novamente.')
    }
  })

  // Função para editar um item do card
  const { mutateAsync: editarItem } = useMutation({
    mutationFn: (params: { cardId: string; itemId: string; updatedData: ItemData }) =>
      ItemCardService.editarItem(params.cardId, params.itemId, params.updatedData),
    onSuccess: (data) => {
      console.log('Item editado com sucesso:', data)
      queryClient.invalidateQueries(['itens-card', cardId]) // Atualiza lista de itens após edição
    },
    onError: (error) => {
      console.error('Erro ao editar item:', error)
      alert('Erro ao editar o item. Verifique os dados e tente novamente.')
    }
  })

  // Função para deletar um item do card
  const { mutateAsync: deletarItem } = useMutation({
    mutationFn: (params: { cardId: string; itemId: string }) =>
      ItemCardService.deletarItem(params.cardId, params.itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(['itens-card', cardId]) // Atualiza lista de itens após deleção
    },
    onError: (error) => {
      console.error('Erro ao deletar item:', error)
      alert('Erro ao deletar o item. Tente novamente.')
    }
  })

  return { itens, criarItem, editarItem, deletarItem, isLoading, isError }
}
