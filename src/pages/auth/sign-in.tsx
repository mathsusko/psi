// src/pages/auth/sign-in.tsx
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signIn } from '@/api/sign-in'

const signInForm = z.object({
  email: z.string().email(),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignInForm>()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email, senha: data.senha })
      toast.success('Login bem-sucedido. Redirecionando...')
      navigate('/', { replace: true })
    } catch {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="login" />
      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
            <p className="text-sm text-muted-foreground">
              Seja bem-vindo ao seu gerenciador
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Sua senha</Label>
              <Input
                id="senha"
                type="password"
                {...register('senha')}
              />
            </div>

            <Button
              disabled={isSubmitting}
              className="w-full"
              type="submit"
            >
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
