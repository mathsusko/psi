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
  try {
    const response = await api.get('/funcionarios')
    return response.data
  } catch (error) {
    console.error('Erro ao listar funcionários:', error)
    throw new Error('Erro ao listar funcionários')
  }
}

export async function getFuncionarioById(id: string): Promise<Funcionario> {
  try {
    const response = await api.get(`/funcionarios/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erro ao obter funcionário com id ${id}:`, error)
    throw new Error(`Erro ao obter funcionário com id ${id}`)
  }
}

export async function criarFuncionario(data: NovoFuncionarioDTO): Promise<Funcionario> {
  try {
    const response = await api.post('/funcionarios', data)
    return response.data
  } catch (error) {
    console.error('Erro ao criar funcionário:', error)
    throw new Error('Erro ao criar funcionário')
  }
}

export async function atualizarFuncionario(
  id: string,
  data: Partial<NovoFuncionarioDTO>
): Promise<Funcionario> {
  try {
    const response = await api.put(`/funcionarios/${id}`, data)
    return response.data
  } catch (error) {
    console.error(`Erro ao atualizar funcionário com id ${id}:`, error)
    throw new Error(`Erro ao atualizar funcionário com id ${id}`)
  }
}

export async function deletarFuncionario(id: string): Promise<void> {
  try {
    await api.delete(`/funcionarios/${id}`)
  } catch (error) {
    console.error(`Erro ao deletar funcionário com id ${id}:`, error)
    throw new Error(`Erro ao deletar funcionário com id ${id}`)
  }
}
