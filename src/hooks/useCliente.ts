import { useQuery } from '@tanstack/react-query'
import ClientesService from '@/api/clientes'

export function useCliente(id: string) {
  return useQuery({
    queryKey: ['cliente', id],
    queryFn: () => ClientesService.buscarPorId(id),
    enabled: !!id
  })
}
