import { api } from '@/lib/axios'

export const DocumentosService = {
  // Função para obter os documentos de um cliente
  async getPorCliente(clienteId: string) {
    try {
      const response = await api.get(`/api/documentos/${clienteId}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar documentos:', error)
      throw new Error('Erro ao buscar documentos')
    }
  },

  // Função para fazer upload de um documento
  async upload(clienteId: string, formData: FormData) {
    try {
      const response = await api.post(`/api/documentos/upload/${clienteId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao enviar o documento:', error)
      throw new Error('Erro ao enviar o documento')
    }
  },

  // Função para deletar um documento
  async deletar(id: string) {
    try {
      const response = await api.delete(`/api/documentos/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao deletar documento:', error)
      throw new Error('Erro ao deletar documento')
    }
  }
}
