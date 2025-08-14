import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ClientesService, Filial } from '@/api/clientes'

// Hook que lista as filiais de um cliente
export function useFiliais(clientePaiId: string) {
  return useQuery<Filial[]>(
    ['filiais', clientePaiId],
    async () => {
      if (!clientePaiId) {
        throw new Error('Cliente Pai ID é necessário para listar as filiais.')
      }
      try {
        // Certifique-se de que a função de listar filiais está correta no backend
        const filiais = await ClientesService.listarFiliais(clientePaiId)
        return filiais // Retorne a lista de filiais
      } catch (error) {
        throw new Error(`Erro ao carregar filiais: ${error.message}`)
      }
    },
    {
      enabled: !!clientePaiId, // Só faz a requisição se clientePaiId estiver presente
      refetchOnWindowFocus: false // Evitar refetch ao voltar para a página
    }
  )
}

// Hook para criar filial
export function useCriarFilial() {
  const qc = useQueryClient()
  return useMutation((dados: Partial<Filial>) => ClientesService.criarFilial(dados), {
    onSuccess: () => {
      // Invalida a query de filiais após criar uma nova filial
      qc.invalidateQueries(['filiais'])
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar filial: ${error.message}`)
    }
  })
}

// Hook para deletar filial
export function useDeletarFilial() {
  const qc = useQueryClient()
  return useMutation(
    ({ id, clientePaiId }: { id: string; clientePaiId: string }) =>
      ClientesService.deletarFilial(id, clientePaiId),
    {
      onSuccess: () => {
        // Invalida a query de filiais após excluir uma filial
        qc.invalidateQueries(['filiais'])
      },
      onError: (error: any) => {
        toast.error(`Erro ao excluir filial: ${error.message}`)
      }
    }
  )
}
