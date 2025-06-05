// src/hooks/useFiliais.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getFiliais,
  getFilialPorId,
  criarFilial,
  atualizarFilial,
  deletarFilial
} from '@/api/filiais'
import { Cliente } from '@/api/clientes'

export function useFiliais(clientePaiId: string) {
  return useQuery<Cliente[]>({
    queryKey: ['filiais', clientePaiId],
    queryFn: () => getFiliais(clientePaiId),
    enabled: !!clientePaiId
  })
}

export function useFilial(filialId: string) {
  return useQuery<Cliente>({
    queryKey: ['filial', filialId],
    queryFn: () => getFilialPorId(filialId),
    enabled: !!filialId
  })
}

export function useCriarFilial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: criarFilial,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['filiais', data.clientePaiId])
    }
  })
}

export function useAtualizarFilial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: Partial<Cliente> }) =>
      atualizarFilial(id, dados),
    onSuccess: (_, { dados }) => {
      queryClient.invalidateQueries(['filiais', dados.clientePaiId])
    }
  })
}

export function useDeletarFilial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, clientePaiId }: { id: string; clientePaiId: string }) =>
      deletarFilial(id),
    onSuccess: (_, { clientePaiId }) => {
      queryClient.invalidateQueries(['filiais', clientePaiId])
    }
  })
}
