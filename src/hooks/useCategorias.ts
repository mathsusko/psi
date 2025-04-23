import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoriaApi } from '../api/categoria'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function useCategorias() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    data: categorias,
    isLoading,
    error
  } = useQuery({
    queryKey: ['categorias'],
    queryFn: categoriaApi.listar,
    onError: () => {
      toast.error('Falha ao carregar categorias')
    }
  })

  const criarCategoria = useMutation({
    mutationFn: categoriaApi.criar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] })
      toast.success('Categoria criada com sucesso')
      navigate('/app/estoque')
    },
    onError: () => {
      toast.error('Falha ao criar categoria')
    }
  })

  const atualizarCategoria = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      categoriaApi.atualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] })
      toast.success('Categoria atualizada com sucesso')
    },
    onError: () => {
      toast.error('Falha ao atualizar categoria')
    }
  })

  const removerCategoria = useMutation({
    mutationFn: (id: string) => categoriaApi.remover(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] })
      toast.success('Categoria removida com sucesso')
    },
    onError: () => {
      toast.error('Falha ao remover categoria')
    }
  })

  return {
    categorias,
    isLoading,
    error,
    criarCategoria,
    atualizarCategoria,
    removerCategoria
  }
}
