import { api } from '@/lib/axios'

export interface OrcamentoItemDTO {
  _id?: string
  orcamentoId: string
  materialId: string
  nome: string
  medida: string
  quantidade: number
  precoUn: number
  imagem?: string // ✅ ESSENCIAL
  createdAt?: string
  updatedAt?: string
}

export async function createOrcamentoItem(
  item: OrcamentoItemDTO
): Promise<OrcamentoItemDTO> {
  const response = await api.post<OrcamentoItemDTO>('/orcamento-items', item)
  return response.data
}

export async function listOrcamentoItems(
  orcamentoId: string
): Promise<OrcamentoItemDTO[]> {
  const response = await api.get<OrcamentoItemDTO[]>('/orcamento-items', {
    params: { orcamentoId }
  })
  return response.data
}

export async function deleteOrcamentoItem(id: string): Promise<void> {
  await api.delete(`/orcamento-items/${id}`)
}
