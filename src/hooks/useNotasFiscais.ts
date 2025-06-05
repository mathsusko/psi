import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { NotaFiscalService } from '@/api/notasFiscais'

export function useNotasFiscais() {
  return useQuery({
    queryKey: ['notasFiscais'],
    queryFn: NotaFiscalService.listar
  })
}

export function useCriarNotaFiscal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: NotaFiscalService.criar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notasFiscais'] })
    }
  })
}

export function useDeletarNotaFiscal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: NotaFiscalService.deletar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notasFiscais'] })
    }
  })
}
