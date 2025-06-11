import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'

const signInSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  senha: z.string().min(1, 'Informe sua senha')
})

type SignInForm = z.infer<typeof signInSchema>

export function SignIn() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  })

  async function handleSignIn(data: SignInForm) {
    if (data.email === 'admin@psi.com.br' && data.senha === '123456') {
      localStorage.setItem('logado', 'true')
      toast.success('Login bem-sucedido! Redirecionando...')
      navigate('/dashboard')
    } else {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8 flex justify-center items-center min-h-screen">
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
                placeholder="email@exemplo.com"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Sua senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="••••••••"
                {...register('senha')}
              />
              {errors.senha && (
                <span className="text-red-500 text-sm">{errors.senha.message}</span>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Entrando...' : 'Acessar painel'}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
