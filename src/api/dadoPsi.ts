import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/dadoPsi`

// Função para listar dadosPsi
const listarDadoPsi = async () => axios.get(API_URL).then((res) => res.data)

// Função para criar dadoPsi
const criarDadoPsi = async (dadoPsiData: {
  nomeEmpresa: string
  cnpj: string // Alterado para uma string única, não mais um array
  endereco: string
  numeroEndereco: string
  email: string
  telefone: string
  complemento: string
  bairro: string
  cep: string
  cidade: string
  estado: string
  categoria: string
}) => {
  return axios.post(API_URL, dadoPsiData).then((res) => res.data)
}

// Função para editar dadoPsi
const editarDadoPsi = async (id: string, dadoPsiData: any) => {
  return axios.put(`${API_URL}/${id}`, dadoPsiData).then((res) => res.data)
}

// Função para deletar dadoPsi
const deletarDadoPsi = async (id: string) => {
  return axios.delete(`${API_URL}/${id}`).then((res) => res.data)
}

const DadoPsiService = {
  listar: listarDadoPsi,
  criar: criarDadoPsi,
  editar: editarDadoPsi,
  deletar: deletarDadoPsi
}

export default DadoPsiService
