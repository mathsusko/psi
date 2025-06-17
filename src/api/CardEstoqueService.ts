import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/cards`

interface CardData {
  nome: string
  categoria: string
  imagem?: File
  imagemUrl?: string
}

const listarCards = async () => axios.get(API_URL).then((res) => res.data)

const criarCard = async (cardData: CardData) => {
  const formData = new FormData()
  formData.append('nome', cardData.nome)
  formData.append('categoria', cardData.categoria)
  if (cardData.imagem) formData.append('imagem', cardData.imagem)

  return axios
    .post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => res.data)
}

const editarCard = async (
  id: string,
  cardData: { nome: string; imagem?: File; imagemUrl?: string }
) => {
  const formData = new FormData()
  formData.append('nome', cardData.nome)

  if (cardData.imagem) {
    formData.append('imagem', cardData.imagem)
  } else if (cardData.imagemUrl) {
    formData.append('imagem', cardData.imagemUrl)
  }

  return axios
    .put(`${API_URL}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error('Erro ao editar card:', err)
      throw new Error('Erro ao editar card.')
    })
}

const deletarCard = async (id: string) =>
  axios.delete(`${API_URL}/${id}`).then((res) => res.data)

const CardEstoqueService = {
  listar: listarCards,
  criar: criarCard,
  editar: editarCard,
  deletar: deletarCard
}

export default CardEstoqueService
