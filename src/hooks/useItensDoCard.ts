// src/hooks/useItensDoCard.ts
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useItensDoCard(id: string) {
  return useQuery({
    queryKey: ['itens-do-card', id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3333/api/cards/${id}/itens`)
      console.log('Itens recebidos:', data) // Verificando os dados recebidos
      return data
    },
    enabled: !!id,  // Só executa quando ID não for nulo
  })
}
