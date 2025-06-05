import { api } from '@/lib/axios'

export type PagamentoFuncionario = {
  _id: string
  funcionarioId: string
  mesReferencia: string // Ex: '2025-05'
  valor: number
  status: 'pendente' | 'pago'
  dataPagamento?: string
}

export type NovoPagamentoDTO = Omit<PagamentoFuncionario, '_id'>

export async function listarPagamentos(
  funcionarioId: string
): Promise<PagamentoFuncionario[]> {
  const res = await api.get(`/funcionarios/${funcionarioId}/pagamentos`)
  return res.data
}

export async function criarPagamento(
  funcionarioId: string,
  data: Omit<NovoPagamentoDTO, 'funcionarioId'>
): Promise<PagamentoFuncionario> {
  const res = await api.post(`/funcionarios/${funcionarioId}/pagamentos`, data)
  return res.data
}

export async function atualizarPagamento(
  pagamentoId: string,
  data: Partial<NovoPagamentoDTO>
): Promise<PagamentoFuncionario> {
  const res = await api.put(`/funcionarios/pagamentos/${pagamentoId}`, data)
  return res.data
}

export async function deletarPagamento(pagamentoId: string): Promise<void> {
  await api.delete(`/funcionarios/pagamentos/${pagamentoId}`)
}
