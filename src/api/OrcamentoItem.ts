// import { api } from '@/lib/axios'

// export interface OrcamentoItemDTO {
//   _id?: string
//   orcamentoId: string
//   materialId: string
//   nome: string
//   medida: string
//   quantidade: number
//   precoUn: number
//   imagem?: string // ✅ ESSENCIAL
//   createdAt?: string
//   updatedAt?: string
// }

// export async function createOrcamentoItem(
//   item: OrcamentoItemDTO
// ): Promise<OrcamentoItemDTO> {
//   const response = await api.post<OrcamentoItemDTO>('/orcamento-items', item)
//   return response.data
// }

// export async function listOrcamentoItems(
//   orcamentoId: string
// ): Promise<OrcamentoItemDTO[]> {
//   const response = await api.get<OrcamentoItemDTO[]>('/orcamento-items', {
//     params: { orcamentoId }
//   })
//   return response.data
// }

// export async function deleteOrcamentoItem(id: string): Promise<void> {
//   await api.delete(`/orcamento-items/${id}`)
// }

import { api } from '@/lib/axios'

// DTO para criação de item de orçamento
export interface OrcamentoItemDTO {
  _id?: string
  orcamentoId: string
  materialId: string
  nome: string
  medida: string
  quantidade: number
  precoUn: number
  imagem?: string // Essencial para o item
  createdAt?: string
  updatedAt?: string
}

// Função para criar um novo item de orçamento
export async function createOrcamentoItem(
  item: OrcamentoItemDTO
): Promise<OrcamentoItemDTO> {
  const response = await api.post<OrcamentoItemDTO>('/orcamento-items', item)
  return response.data
}

// Função para listar os itens de um orçamento
export async function listOrcamentoItems(
  orcamentoId: string
): Promise<OrcamentoItemDTO[]> {
  const response = await api.get<OrcamentoItemDTO[]>('/orcamento-items', {
    params: { orcamentoId }
  })
  return response.data
}

// Função para deletar um item de orçamento
export async function deleteOrcamentoItem(id: string): Promise<void> {
  await api.delete(`/orcamento-items/${id}`)
}
