// src/api/card-estoque.ts
import axios from 'axios'

const API_URL = 'http://localhost:3333/api/cards'

// Funções para cards
const listarCards = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const criarCard = async (cardData: { nome: string, imagem?: File }) => {
  const formData = new FormData()
  formData.append('nome', cardData.nome)
  if (cardData.imagem) {
    formData.append('imagem', cardData.imagem)
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

const editarCard = async (id: string, cardData: { nome: string, imagem?: File }) => {
  const formData = new FormData()
  formData.append('nome', cardData.nome)
  if (cardData.imagem) {
    formData.append('imagem', cardData.imagem)
  }

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

const deletarCard = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}

// Funções para itens
const listarItensDoCard = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}/itens`)
  return response.data
}

const criarItem = async (cardId: string, itemData: any) => {
  const response = await axios.post(`${API_URL}/${cardId}/itens`, itemData)
  return response.data
}

const atualizarQuantidade = async (itemId: string, quantidade: number) => {
  const response = await axios.patch(`http://localhost:3333/api/itens/${itemId}`, {
    quantidade,
  })
  return response.data
}

const editarItem = async (cardId: string, itemId: string, updatedData: any) => {
  const response = await axios.put(`http://localhost:3333/api/cards/${cardId}/itens/${itemId}`, updatedData)
  return response.data
}

// Função para deletar item
const deletarItem = async (cardId: string, itemId: string) => {
  const response = await axios.delete(`http://localhost:3333/api/cards/${cardId}/itens/${itemId}`)
  return response.data
}

const CardEstoqueService = {
  listar: listarCards,
  criar: criarCard,
  editar: editarCard,
  deletar: deletarCard,
  listarItens: listarItensDoCard,
  criarItem,
  atualizarQuantidade,
  editarItem,
  deletarItem, // Adicionando a função de deletar item
}

export default CardEstoqueService
