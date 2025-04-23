import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  senha: string
}

export async function signIn({ email, senha }: SignInBody) {
  await api.post('/auth/login', { email, senha })
}
