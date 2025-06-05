// import { useQuery } from '@tanstack/react-query'
// import { ClientesService, Cliente } from '@/api/clientes'

// export function useCliente(id: string) {
//   return useQuery<Cliente>({
//     queryKey: ['cliente', id],
//     queryFn: () => ClientesService.buscarPorId(id),
//     enabled: !!id
//   })
// }

// src/hooks/useCliente.ts
import { useQuery } from '@tanstack/react-query'
import { ClientesService } from '@/api/clientes' // Corrigir para a importação nomeada

export function useCliente(id: string) {
  return useQuery({
    queryKey: ['cliente', id],
    queryFn: () => ClientesService.buscarPorId(id),
    enabled: !!id
  })
}
