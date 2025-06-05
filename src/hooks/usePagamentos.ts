import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  listarPagamentos,
  criarPagamento,
  atualizarPagamento,
  deletarPagamento,
  PagamentoFuncionario
} from '@/api/pagamentos'

export function usePagamentos(funcionarioId: string) {
  return useQuery<PagamentoFuncionario[]>({
    queryKey: ['pagamentos', funcionarioId],
    queryFn: () => listarPagamentos(funcionarioId),
    enabled: !!funcionarioId
  })
}

export function useCriarPagamento(funcionarioId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<PagamentoFuncionario, '_id' | 'funcionarioId'>) =>
      criarPagamento(funcionarioId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagamentos', funcionarioId] })
    }
  })
}

export function useAtualizarPagamento(funcionarioId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      pagamentoId,
      data
    }: {
      pagamentoId: string
      data: Partial<PagamentoFuncionario>
    }) => atualizarPagamento(pagamentoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagamentos', funcionarioId] })
    }
  })
}

export function useDeletarPagamento(funcionarioId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletarPagamento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagamentos', funcionarioId] })
    }
  })
}
