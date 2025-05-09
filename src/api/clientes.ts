import axios from 'axios'

const API_URL = 'http://localhost:3333/api/clientes'

// Função para listar clientes
const listarClientes = async () => axios.get(API_URL).then((res) => res.data)

// Função para criar cliente
const criarCliente = async (clienteData: {
  nomeEmpresa: string
  cnpjCpf: string
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
  return axios.post(API_URL, clienteData).then((res) => res.data)
}

// Função para editar cliente
const editarCliente = async (id: string, clienteData: any) => {
  return axios.put(`${API_URL}/${id}`, clienteData).then((res) => res.data)
}

// Função para deletar cliente
const deletarCliente = async (id: string) => {
  return axios.delete(`${API_URL}/${id}`).then((res) => res.data)
}

const buscarClientePorId = async (id: string) => {
  return axios.get(`${API_URL}/${id}`).then((res) => res.data)
}

const ClientesService = {
  listar: listarClientes,
  criar: criarCliente,
  editar: editarCliente,
  deletar: deletarCliente,
  buscarPorId: buscarClientePorId // ⬅️ nova função
}

export default ClientesService
