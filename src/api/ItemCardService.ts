import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/cards`

// Tipagem para os dados de um item
export interface ItemData {
  codigo: string
  materialName: string
  medida: string
  ncm: string
  codigoFabrica: string
  quantidade: number
  precoUnitario: number
  precoCusto: number // <- NOVO CAMPO
  custoTotal?: number
}

// Funções para itens dentro de um card
const listarItensDoCard = async (cardId: string) => {
  if (!cardId) throw new Error('Card ID is required')
  return axios.get(`${API_URL}/${cardId}/itens`).then((res) => res.data)
}

const criarItem = async (cardId: string, itemData: ItemData) => {
  if (!cardId) throw new Error('Card ID is required')
  return axios.post(`${API_URL}/${cardId}/itens`, itemData).then((res) => res.data)
}

const atualizarQuantidade = async (itemId: string, quantidade: number) => {
  if (!itemId) throw new Error('Item ID is required')
  return axios
    .patch(`${import.meta.env.VITE_API_URL}/itens/${itemId}`, { quantidade })
    .then((res) => res.data)
}

const editarItem = async (
  cardId: string,
  itemId: string,
  updatedData: Partial<ItemData>
) => {
  if (!cardId || !itemId) throw new Error('Card ID and Item ID are required')
  return axios
    .put(`${API_URL}/${cardId}/itens/${itemId}`, updatedData)
    .then((res) => res.data)
}

const deletarItem = async (cardId: string, itemId: string) => {
  if (!cardId || !itemId) throw new Error('Card ID and Item ID are required')
  return axios.delete(`${API_URL}/${cardId}/itens/${itemId}`).then((res) => res.data)
}

const ItemCardService = {
  listarItens: listarItensDoCard,
  criarItem,
  atualizarQuantidade,
  editarItem,
  deletarItem
}

export default ItemCardService
