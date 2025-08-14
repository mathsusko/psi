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

// Hook para listar todos os funcionários
export function useFuncionarios() {
  return useQuery<Funcionario[]>({
    queryKey: ['funcionarios'],
    queryFn: getFuncionarios,
    onError: (error) => {
      console.error('Erro ao buscar funcionários:', error)
    }
  })
}

// Hook para obter os detalhes de um funcionário específico
export function useFuncionario(id: string) {
  return useQuery<Funcionario>({
    queryKey: ['funcionario', id],
    queryFn: () => getFuncionarioById(id),
    enabled: !!id, // Garante que a consulta só será executada se o id estiver presente
    onError: (error) => {
      console.error(`Erro ao obter funcionário com id ${id}:`, error)
    }
  })
}

// Hook para criar um novo funcionário
export function useCriarFuncionario() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: criarFuncionario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] }) // Invalida a lista de funcionários após a criação
    },
    onError: (error) => {
      console.error('Erro ao criar funcionário:', error)
    }
  })
}

// Hook para atualizar as informações de um funcionário
export function useAtualizarFuncionario(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<NovoFuncionarioDTO>) => atualizarFuncionario(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] }) // Invalida a lista de funcionários
      queryClient.invalidateQueries({ queryKey: ['funcionario', id] }) // Invalida o cache do funcionário atualizado
    },
    onError: (error) => {
      console.error(`Erro ao atualizar funcionário com id ${id}:`, error)
    }
  })
}

// Hook para deletar um funcionário
export function useDeletarFuncionario() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletarFuncionario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] }) // Invalida a lista de funcionários após a exclusão
    },
    onError: (error) => {
      console.error('Erro ao deletar funcionário:', error)
    }
  })
}
