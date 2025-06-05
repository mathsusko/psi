import { api } from '@/lib/axios'

export type HoraTrabalhada = {
  _id: string
  funcionarioId: string
  titulo: string
  descricao?: string
  inicio: string
  fim: string
}

export type CriarHoraDTO = Omit<HoraTrabalhada, '_id'>

export async function listarHoras(funcionarioId: string): Promise<HoraTrabalhada[]> {
  const res = await api.get(`/funcionarios/${funcionarioId}/horas`)
  return res.data
}

export async function criarHora(
  funcionarioId: string,
  data: Omit<CriarHoraDTO, 'funcionarioId'>
): Promise<HoraTrabalhada> {
  const res = await api.post(`/funcionarios/${funcionarioId}/horas`, data)
  return res.data
}

export async function atualizarHora(
  horaId: string,
  data: Partial<CriarHoraDTO>
): Promise<HoraTrabalhada> {
  const res = await api.put(`/funcionarios/horas/${horaId}`, data)
  return res.data
}

export async function deletarHora(horaId: string): Promise<void> {
  await api.delete(`/funcionarios/horas/${horaId}`)
}
