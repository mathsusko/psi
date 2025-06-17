// src/api/subprodutoApi.ts
import axios from 'axios'

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/estoque` // Substitua pela URL real da sua API

export const listarSubprodutosPorCategoria = async (categoriaId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/subprodutos?categoriaId=${categoriaId}`
    )
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar subprodutos da categoria ${categoriaId}:`, error)
    throw error
  }
}
