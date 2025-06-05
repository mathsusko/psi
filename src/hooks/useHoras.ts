import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  listarHoras,
  criarHora,
  atualizarHora,
  deletarHora,
  HoraTrabalhada
} from '@/api/horas'

export function useHoras(funcionarioId: string) {
  return useQuery<HoraTrabalhada[]>({
    queryKey: ['horas', funcionarioId],
    queryFn: () => listarHoras(funcionarioId),
    enabled: !!funcionarioId
  })
}

export function useCriarHora(funcionarioId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<HoraTrabalhada, '_id' | 'funcionarioId'>) =>
      criarHora(funcionarioId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horas', funcionarioId] })
    }
  })
}

export function useAtualizarHora(funcionarioId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ horaId, data }: { horaId: string; data: any }) =>
      atualizarHora(horaId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horas', funcionarioId] })
    }
  })
}

export function useDeletarHora(funcionarioId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletarHora,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horas', funcionarioId] })
    }
  })
}
