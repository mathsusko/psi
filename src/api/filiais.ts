import { api } from '@/lib/axios'
import { Cliente } from './clientes'

export async function getFiliais(clientePaiId: string): Promise<Cliente[]> {
  const response = await api.get(`/clientes/filiais/${clientePaiId}`)
  return Array.isArray(response.data) ? response.data : []
}

export async function getFilialPorId(id: string) {
  const response = await api.get(`/filiais/filial/${id}`)
  return response.data
}

export async function criarFilial(dados: any) {
  const response = await api.post('/filiais', dados)
  return response.data
}

export async function atualizarFilial(id: string, dados: any) {
  const response = await api.put(`/filiais/${id}`, dados)
  return response.data
}

export async function deletarFilial(id: string) {
  const response = await api.delete(`/filiais/${id}`)
  return response.data
}
