import { api } from '@/lib/axios'

export type Funcionario = {
  _id: string
  nome: string
  email: string
  cargo: string
  telefone?: string
  dataAdmissao?: string
  ativo: boolean
  fotoUrl?: string
}

export type NovoFuncionarioDTO = Omit<Funcionario, '_id' | 'dataAdmissao'>

export async function getFuncionarios(): Promise<Funcionario[]> {
  const response = await api.get('/funcionarios')
  return response.data
}

export async function getFuncionarioById(id: string): Promise<Funcionario> {
  const response = await api.get(`/funcionarios/${id}`)
  return response.data
}

export async function criarFuncionario(data: NovoFuncionarioDTO): Promise<Funcionario> {
  const response = await api.post('/funcionarios', data)
  return response.data
}

export async function atualizarFuncionario(
  id: string,
  data: Partial<NovoFuncionarioDTO>
): Promise<Funcionario> {
  const response = await api.put(`/funcionarios/${id}`, data)
  return response.data
}

export async function deletarFuncionario(id: string): Promise<void> {
  await api.delete(`/funcionarios/${id}`)
}
