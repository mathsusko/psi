import { api } from '@/lib/axios'

export interface NotaFiscal {
  _id: string
  clienteNome: string
  descricao: string
  dataRecebimento: string
  caminhoArquivo: string
  filialId: string
}

export const NotaFiscalService = {
  listar: async (filialId?: string): Promise<NotaFiscal[]> => {
    const response = await api.get('/notas', {
      params: { filialId }
    })
    return response.data
  },

  criar: async (dados: FormData): Promise<NotaFiscal> => {
    const response = await api.post('/notas', dados, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  deletar: async (id: string): Promise<void> => {
    await api.delete(`/notas/${id}`)
  }
}
