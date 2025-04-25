import axios from 'axios'

const API_URL = 'http://localhost:3333/api/cards'

// Funções para cards
const listarCards = async () => axios.get(API_URL).then(res => res.data)

const criarCard = async (cardData: { nome: string, imagem?: File }) => {
  const formData = new FormData()
  formData.append('nome', cardData.nome)
  if (cardData.imagem) formData.append('imagem', cardData.imagem)
  return axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data)
}

const editarCard = async (id: string, cardData: { nome: string, imagem?: File }) => {
  const formData = new FormData()
  formData.append('nome', cardData.nome)
  if (cardData.imagem) formData.append('imagem', cardData.imagem)
  return axios.put(`${API_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data)
}

const deletarCard = async (id: string) => axios.delete(`${API_URL}/${id}`).then(res => res.data)

// Funções para itens
const listarItensDoCard = async (id: string) => axios.get(`${API_URL}/${id}/itens`).then(res => res.data)

const criarItem = async (cardId: string, itemData: any) => axios.post(`${API_URL}/${cardId}/itens`, itemData).then(res => res.data)

const atualizarQuantidade = async (itemId: string, quantidade: number) => axios.patch(`http://localhost:3333/api/itens/${itemId}`, { quantidade }).then(res => res.data)

const editarItem = async (cardId: string, itemId: string, updatedData: any) => axios.put(`${API_URL}/cards/${cardId}/itens/${itemId}`, updatedData).then(res => res.data)

const deletarItem = async (cardId: string, itemId: string) => axios.delete(`${API_URL}/cards/${cardId}/itens/${itemId}`).then(res => res.data)

const CardEstoqueService = {
  listar: listarCards,
  criar: criarCard,
  editar: editarCard,
  deletar: deletarCard,
  listarItens: listarItensDoCard,
  criarItem,
  atualizarQuantidade,
  editarItem,
  deletarItem,
}

export default CardEstoqueService
