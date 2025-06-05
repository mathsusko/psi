// import { api } from '@/lib/axios'

// export interface Cliente {
//   _id?: string
//   nomeEmpresa: string
//   cnpjCpf?: string
//   endereco?: string
//   numeroEndereco?: string
//   complemento?: string
//   bairro?: string
//   cep?: string
//   cidade?: string
//   estado?: string
//   email?: string
//   telefone?: string
//   categoria?: string
//   ie?: string
//   clientePaiId?: string | null
//   createdAt?: string
//   updatedAt?: string
// }

// const BASE_URL = '/clientes'

// const ClientesService = {
//   listar: async (): Promise<Cliente[]> => {
//     const response = await api.get(BASE_URL)
//     return response.data
//   },

//   criar: async (dados: Cliente): Promise<Cliente> => {
//     const response = await api.post(BASE_URL, dados)
//     return response.data.data
//   },

//   editar: async (id: string, dados: Partial<Cliente>): Promise<Cliente> => {
//     const response = await api.put(`${BASE_URL}/${id}`, dados)
//     return response.data.data
//   },

//   deletar: async (id: string): Promise<void> => {
//     await api.delete(`${BASE_URL}/${id}`)
//   },

//   buscarPorId: async (id: string): Promise<Cliente> => {
//     const response = await api.get(`${BASE_URL}/${id}`)
//     return response.data
//   },

//   listarPorClientePai: async (clientePaiId: string): Promise<Cliente[]> => {
//     const response = await api.get(`${BASE_URL}/filiais/${clientePaiId}`)
//     return response.data
//   }
// }

// export default ClientesService

// src/api/clientes.ts
import { api } from '@/lib/axios'

export interface Cliente {
  _id?: string
  nomeEmpresa: string
  cnpjCpf?: string
  endereco?: string
  numeroEndereco?: string
  complemento?: string
  bairro?: string
  cep?: string
  cidade?: string
  estado?: string
  email?: string
  telefone?: string
  categoria?: string
  ie?: string
  clientePaiId?: string | null
  createdAt?: string
  updatedAt?: string
}

const BASE_URL = '/clientes'

export const ClientesService = {
  listar: async (): Promise<Cliente[]> => {
    const response = await api.get(BASE_URL)
    return response.data
  },

  criar: async (dados: Cliente): Promise<Cliente> => {
    const response = await api.post(BASE_URL, dados)
    return response.data.data
  },

  editar: async (id: string, dados: Partial<Cliente>): Promise<Cliente> => {
    const response = await api.put(`${BASE_URL}/${id}`, dados)
    return response.data.data
  },

  deletar: async (id: string): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`)
  },

  buscarPorId: async (id: string): Promise<Cliente> => {
    const response = await api.get(`${BASE_URL}/${id}`)
    return response.data
  },

  listarPorClientePai: async (clientePaiId: string): Promise<Cliente[]> => {
    const response = await api.get(`${BASE_URL}/filiais/${clientePaiId}`)
    return response.data
  }
}
export default ClientesService
