import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query'
import ItemCardService from '../api/ItemCardService'

// Tipagem atualizada com precoCusto
export interface ItemData {
  codigo: string
  materialName: string
  medida: string
  ncm: string
  codigoFabrica: string
  quantidade: number
  precoUnitario: number
  precoCusto: number // <- NOVO
  custoTotal?: number
}

export function useItemCard(cardId: string) {
  const queryClient = useQueryClient()

  const {
    data: itens,
    isLoading,
    isError
  }: UseQueryResult<ItemData[]> = useQuery({
    queryKey: ['itens-card', cardId],
    queryFn: () => ItemCardService.listarItens(cardId)
  })

  const { mutateAsync: criarItem } = useMutation({
    mutationFn: (params: { cardId: string; itemData: ItemData }) =>
      ItemCardService.criarItem(params.cardId, params.itemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itens-card', cardId] })
    },
    onError: (error: unknown) => {
      console.error('Erro ao criar item:', error)
      alert('Erro ao criar o item. Tente novamente.')
    }
  })

  const { mutateAsync: editarItem } = useMutation({
    mutationFn: (params: {
      cardId: string
      itemId: string
      updatedData: Partial<ItemData>
    }) => ItemCardService.editarItem(params.cardId, params.itemId, params.updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itens-card', cardId] })
    },
    onError: (error: unknown) => {
      console.error('Erro ao editar item:', error)
      alert('Erro ao editar o item. Verifique os dados e tente novamente.')
    }
  })

  const { mutateAsync: deletarItem } = useMutation({
    mutationFn: (params: { cardId: string; itemId: string }) =>
      ItemCardService.deletarItem(params.cardId, params.itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itens-card', cardId] })
    },
    onError: (error: unknown) => {
      console.error('Erro ao deletar item:', error)
      alert('Erro ao deletar o item. Tente novamente.')
    }
  })

  return {
    itens,
    criarItem,
    editarItem,
    deletarItem,
    isLoading,
    isError
  }
}
