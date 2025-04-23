// src/api/cardEstoque.js (frontend)
import axios from 'axios'

const API_URL = 'http://localhost:3333/api/cards'

export const fetchCards = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar cards:', error)
    throw error
  }
}

export const createCard = async (cardData) => {
  const formData = new FormData()
  formData.append('nome', cardData.nome)
  if (cardData.imagem) {
    formData.append('imagem', cardData.imagem)
  }

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Erro ao criar card:', error)
    throw error
  }
}
