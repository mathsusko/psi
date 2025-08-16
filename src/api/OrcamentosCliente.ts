import { api } from '@/lib/axios'

// DTO para criação de orçamento
export interface OrcamentoDTO {
  prestadorId: string
  clienteId: string // Cliente ID para associar o orçamento ao cliente correto
  custo?: number
  dataInicio?: string
  dataSaida?: string
  descricaoServico?: string // Campo para orçamentos de serviço
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
  clienteId: {
    _id: string
    nomeEmpresa: string
    cnpjCpf: string
    email: string
    [key: string]: any
  }
  custo: number
  dataInicio: string
  dataSaida: string
  descricaoServico?: string // Se presente, é um orçamento de serviços
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

// Função para listar orçamentos de um cliente filtrados por tipo
export async function listOrcamentosCliente(filtros?: {
  clienteId: string // Filtro por clienteId
  tipo?: 'material' | 'servico' // Filtro por tipo de orçamento (material ou serviço)
}): Promise<OrcamentoResponse[]> {
  const params: any = { ...filtros }

  if (filtros?.tipo) {
    if (filtros.tipo === 'material') {
      // Para orçamentos de materiais, garantimos que a descrição do serviço não seja preenchida
      params.descricaoServico = ''
    } else if (filtros.tipo === 'servico') {
      // Para orçamentos de serviços, garantimos que a descrição do serviço esteja presente
      params.descricaoServico = { $exists: true }
    }
  }

  const res = await api.get<OrcamentoResponse[]>('/orcamento', { params })
  return res.data
}

export const getAllOrcamentosCliente = listOrcamentosCliente
