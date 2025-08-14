import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { api } from '@/lib/axios'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'

const schema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  cargo: z.string().min(1, 'Cargo obrigatório'),
  telefone: z.string().optional()
})

type FormData = z.infer<typeof schema>

export default function NovoFuncionarioPage() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setErrorMessage(null) // Limpa qualquer erro anterior

    try {
      await api.post('/funcionarios', data)
      navigate('/funcionarios')
    } catch (err) {
      setErrorMessage('Erro ao cadastrar funcionário. Tente novamente.') // Exibe a mensagem de erro
      console.error(err)
    } finally {
      setIsLoading(false) // Desabilita o carregamento após o envio
    }
  }

  return (
    <div className="p-6 max-w-2xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Funcionário</h1>

      {errorMessage && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">{errorMessage}</div>
      )}

      <Card>
        <CardContent className="p-6">
          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <Label
                className="text-xs"
                htmlFor="nome"
              >
                Nome
              </Label>
              <Input
                id="nome"
                {...register('nome')}
              />
              {formState.errors.nome && (
                <p className="text-red-500 text-sm">{formState.errors.nome.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label
                className="text-xs"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
              />
              {formState.errors.email && (
                <p className="text-red-500 text-sm">{formState.errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label
                className="text-xs"
                htmlFor="cargo"
              >
                Cargo
              </Label>
              <Input
                id="cargo"
                {...register('cargo')}
              />
              {formState.errors.cargo && (
                <p className="text-red-500 text-sm">{formState.errors.cargo.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label
                className="text-xs"
                htmlFor="telefone"
              >
                Telefone
              </Label>
              <Input
                id="telefone"
                {...register('telefone')}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
