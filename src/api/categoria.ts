import axios from 'axios'
import { toast } from 'sonner'

const API_BASE_URL = 'http://localhost:3333/api/estoque'

export const categoriaApi = {
  listar: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categorias`)
      return response.data
    } catch (error) {
      toast.error('Erro ao buscar categorias')
      throw error
    }
  },

  criar: async (data: {
    titulo: string
    estoque: number
    tipo: 'material' | 'ferramenta' | 'acessorio'
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categorias`, {
        ...data,
        slug: data.titulo.toLowerCase().replace(/\s+/g, '-')
      })
      return response.data
    } catch (error) {
      toast.error('Erro ao criar categoria')
      throw error
    }
  },

  obterPorSlug: async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categorias/${slug}`)
      return response.data
    } catch (error) {
      toast.error('Erro ao buscar categoria')
      throw error
    }
  },

  atualizar: async (
    id: string,
    data: {
      titulo?: string
      estoque?: number
      tipo?: 'material' | 'ferramenta' | 'acessorio'
    }
  ) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/categorias/${id}`, data)
      return response.data
    } catch (error) {
      toast.error('Erro ao atualizar categoria')
      throw error
    }
  },

  remover: async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/categorias/${id}`)
      return response.data
    } catch (error) {
      toast.error('Erro ao remover categoria')
      throw error
    }
  }
}
