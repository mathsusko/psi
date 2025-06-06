import { api } from '@/lib/axios'

// DTO para criação de orçamento
export interface OrcamentoDTO {
  prestadorId: string
  filialId: string // ✅ substituído clienteId por filialId
  custo?: number
  dataInicio?: string
  dataSaida?: string
  descricaoServico?: string
}

// Tipo retornado com campos completos (inclusive populate)
export interface OrcamentoResponse {
  _id: string
  prestadorId: {
    _id: string
    nomeEmpresa: string
    cnpj: string
    email: string
    [key: string]: any
  }
  filialId: {
    _id: string
    nomeEmpresa: string
    cnpjCpf: string
    email: string
    [key: string]: any
  }
  custo: number
  dataInicio: string
  dataSaida: string
  descricaoServico?: string
  createdAt: string
  updatedAt: string
  __v?: number
  itens?: Array<{
    nome: string
    medida: string
    quantidade: number
    precoUn: number
  }>
}

// Cria um novo orçamento
export async function createOrcamento(dto: OrcamentoDTO): Promise<OrcamentoResponse> {
  const res = await api.post<OrcamentoResponse>('/orcamentos', dto)
  return res.data
}

// Busca orçamento completo por ID
export async function getOrcamento(id: string): Promise<OrcamentoResponse> {
  const res = await api.get<OrcamentoResponse>(`/orcamentos/${id}`)
  return res.data
}

// Lista orçamentos com filtros opcionais
export async function listOrcamentos(filtros?: {
  prestadorId?: string
  filialId?: string // ✅ atualizado também aqui
}): Promise<OrcamentoResponse[]> {
  const res = await api.get<OrcamentoResponse[]>('/orcamentos', { params: filtros })
  return res.data
}

export const getAllOrcamentos = listOrcamentos
