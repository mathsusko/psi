// src/hooks/useCliente.ts

import { useQuery } from '@tanstack/react-query'
import { ClientesService } from '@/api/clientes'

// Definição do tipo Cliente
export interface Cliente {
  nomeEmpresa: string
  cnpjCpf: string
  ie: string
  categoria: string
  email: string
  telefone: string
  endereco: string
  numeroEndereco: string
  complemento: string
  bairro: string
  cep: string
  cidade: string
  estado: string
}

// Hook para buscar o cliente por ID
export const useCliente = () => {
  const buscarClientePorId = (perfilId: string) => {
    return useQuery({
      queryKey: ['cliente', perfilId], // Chave da query
      queryFn: () => ClientesService.buscarPorId(perfilId), // Função de busca
      enabled: !!perfilId, // Só ativa a query se o perfilId for válido
      onError: (error) => {
        console.error('Erro ao buscar cliente:', error) // Tratamento de erro
      }
    })
  }

  return {
    buscarClientePorId
  }
}
