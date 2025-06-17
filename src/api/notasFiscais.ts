import { api } from '@/lib/axios'

export interface NotaFiscal {
  _id: string
  clienteNome: string
  descricao: string
  dataRecebimento: string
  caminhoArquivo: string
}

export const NotaFiscalService = {
  listar: async (): Promise<NotaFiscal[]> => {
    const response = await api.get('/notas')
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
