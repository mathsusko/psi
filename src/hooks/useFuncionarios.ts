import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getFuncionarios,
  getFuncionarioById,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
  Funcionario,
  NovoFuncionarioDTO
} from '@/api/funcionarios'

export function useFuncionarios() {
  return useQuery<Funcionario[]>({
    queryKey: ['funcionarios'],
    queryFn: getFuncionarios
  })
}

export function useFuncionario(id: string) {
  return useQuery<Funcionario>({
    queryKey: ['funcionario', id],
    queryFn: () => getFuncionarioById(id),
    enabled: !!id
  })
}

export function useCriarFuncionario() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: criarFuncionario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] })
    }
  })
}

export function useAtualizarFuncionario(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<NovoFuncionarioDTO>) => atualizarFuncionario(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] })
      queryClient.invalidateQueries({ queryKey: ['funcionario', id] })
    }
  })
}

export function useDeletarFuncionario() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletarFuncionario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] })
    }
  })
}
