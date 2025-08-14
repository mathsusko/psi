import { api } from '@/lib/axios'

export const DocumentosService = {
  getPorCliente(clienteId: string) {
    return api.get(`/api/documentos/${clienteId}`).then((r) => r.data)
  },
  upload(clienteId: string, formData: FormData) {
    return api
      .post(`/api/documentos/upload/${clienteId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((r) => r.data)
  },
  deletar(id: string) {
    return api.delete(`/api/documentos/${id}`).then((r) => r.data)
  }
}
