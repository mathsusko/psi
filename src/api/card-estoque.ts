// src/api/card-estoque.ts
import axios from 'axios'

const API_URL = 'http://localhost:3333/api/cards'

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

const CardEstoqueService = {
  listar: listarCards,
  criar: criarCard
}

export default CardEstoqueService
