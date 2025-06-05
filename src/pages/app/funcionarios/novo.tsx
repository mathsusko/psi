import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { api } from '@/lib/axios'
import { Card, CardContent } from '@/components/ui/card'

const schema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email(),
  cargo: z.string().min(1, 'Cargo obrigatório'),
  telefone: z.string().optional(),
  fotoUrl: z.string().url().optional()
})

type FormData = z.infer<typeof schema>

export default function NovoFuncionarioPage() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/api/funcionarios', data)
      navigate('/funcionarios')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Funcionário</h1>

      <Card>
        <CardContent className="p-6">
          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                {...register('nome')}
              />
              {formState.errors.nome && (
                <p className="text-red-500 text-sm">{formState.errors.nome.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
              />
              {formState.errors.email && (
                <p className="text-red-500 text-sm">{formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cargo">Cargo</Label>
              <Input
                id="cargo"
                {...register('cargo')}
              />
              {formState.errors.cargo && (
                <p className="text-red-500 text-sm">{formState.errors.cargo.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                {...register('telefone')}
              />
            </div>

            <div>
              <Label htmlFor="fotoUrl">URL da Foto</Label>
              <Input
                id="fotoUrl"
                placeholder="https://..."
                {...register('fotoUrl')}
              />
              <small className="text-muted-foreground">Aceita uma URL por enquanto</small>
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
