// src/api/sign-in.ts
import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  senha: string
}

export interface SignInResponse {
  token: string
  usuario: {
    id: string
    nome: string
    email: string
    // adicione outros campos se necessário
  }
}

export async function signIn({ email, senha }: SignInBody): Promise<SignInResponse> {
  const response = await api.post<SignInResponse>('/auth/login', { email, senha })
  return response.data
}
