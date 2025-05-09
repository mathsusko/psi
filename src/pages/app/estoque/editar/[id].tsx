import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { categoriaApi } from '@/api/dadoPsi' // ajuste aqui conforme a localização real
import { toast } from 'sonner'

export function EditarCategoriaPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: categoria, isLoading } = useQuery({
    queryKey: ['categoria', id],
    queryFn: () => categoriaApi.obterPorSlug(id!)
    // onError removido — se quiser tratar erro, use .catch no queryFn
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

  if (isLoading) return <div>Carregando...</div>
  if (!categoria) return <div>Categoria não encontrada.</div>

  // Supondo que aqui venha um formulário:
  const handleSubmit = (dados: any) => {
    atualizarCategoria(dados)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Editar Categoria</h1>
      <p>Nome atual: {categoria.nome}</p>
      {/* Aqui poderia haver um formulário */}
      <button onClick={() => handleSubmit({ nome: 'Nova Categoria' })}>Atualizar</button>
    </div>
  )
}
