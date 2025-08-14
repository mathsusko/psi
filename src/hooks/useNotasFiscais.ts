import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { NotaFiscalService } from '@/api/notasFiscais'

export function useNotasFiscais(filialId: string) {
  return useQuery({
    queryKey: ['notasFiscais', filialId],
    queryFn: () => NotaFiscalService.listar(filialId),
    enabled: !!filialId
  })
}

export function useCriarNotaFiscal(filialId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: NotaFiscalService.criar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notasFiscais', filialId] })
    }
  })
}

export function useDeletarNotaFiscal(filialId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: NotaFiscalService.deletar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notasFiscais', filialId] })
    }
  })
}
