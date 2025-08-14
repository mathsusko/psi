import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DocumentosService } from '@/api/Documentos'

export const useDocumentos = (clienteId: string) => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['documentos', clienteId],
    queryFn: () => DocumentosService.getPorCliente(clienteId),
    enabled: !!clienteId
  })

  const upload = useMutation({
    mutationFn: ({ clienteId, formData }: { clienteId: string; formData: FormData }) =>
      DocumentosService.upload(clienteId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['documentos', clienteId])
    }
  })

  const deletar = useMutation({
    mutationFn: (id: string) => DocumentosService.deletar(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['documentos', clienteId])
    }
  })

  const atualizarDescricao = useMutation({
    mutationFn: ({ id, descricao }: { id: string; descricao: string }) =>
      DocumentosService.atualizarDescricao(id, descricao),
    onSuccess: () => {
      queryClient.invalidateQueries(['documentos', clienteId])
    }
  })

  return {
    documentos: data || [],
    isLoading,
    isError,
    upload,
    deletar,
    atualizarDescricao
  }
}
