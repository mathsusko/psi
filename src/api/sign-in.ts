// src/api/sign-in.ts
import { api } from '@/lib/axios'

interface SignInBody {
  email: string
  senha: string
}

interface SignInResponse {
  token: string
  usuario: {
    id: string
    nome: string
    email: string
  }
}

export async function signInRequest(data: SignInBody) {
  const response = await api.post<SignInResponse>('/login', data)
  return response.data
}
