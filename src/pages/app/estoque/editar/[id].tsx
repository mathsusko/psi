import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { categoriaApi } from '@/api/categoria'
import { toast } from 'sonner'

export function EditarCategoriaPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: categoria, isLoading } = useQuery({
    queryKey: ['categoria', id],
    queryFn: () => categoriaApi.obterPorSlug(id!),
    onError: () => {
      toast.error('Falha ao carregar categoria')
    }
  })

  const { mutate: atualizarCategoria, isPending } = useMutation({
    mutationFn: (data: any) => categoriaApi.atualizar(id!, data),
    onSuccess: () => {
      toast.success('Categoria atualizada com sucesso')
      navigate('/app/estoque')
    },
    onError: () => {
      toast.error('Falha ao atualizar categoria')
    }
  })

  // ... restante do código permanece igual
}
