import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useFuncionario, useAtualizarFuncionario } from '@/hooks/useFuncionarios'
import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

const schema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  cargo: z.string().min(1, 'Cargo obrigatório'),
  telefone: z.string().optional(),
  fotoUrl: z.string().url().optional()
})

type FormData = z.infer<typeof schema>

export default function FuncionarioDados() {
  const { id } = useParams<{ id: string }>()
  const { data: funcionario, isLoading } = useFuncionario(id!)
  const atualizarFuncionario = useAtualizarFuncionario(id!)

  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    if (funcionario) {
      reset({
        nome: funcionario.nome,
        email: funcionario.email,
        cargo: funcionario.cargo,
        telefone: funcionario.telefone || '',
        fotoUrl: funcionario.fotoUrl || ''
      })
    }
  }, [funcionario, reset])

  const onSubmit = async (data: FormData) => {
    try {
      await atualizarFuncionario.mutateAsync(data)
      toast.success('Funcionário atualizado com sucesso')
    } catch (error) {
      toast.error('Erro ao atualizar funcionário')
      console.error(error)
    }
  }

  if (isLoading) return <p className="p-6">Carregando funcionário...</p>

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-xl font-semibold">Dados Cadastrais</h2>

      <Card>
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                {...register('nome')}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
              />
            </div>

            <div>
              <Label htmlFor="cargo">Cargo</Label>
              <Input
                id="cargo"
                {...register('cargo')}
              />
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
                {...register('fotoUrl')}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={formState.isSubmitting}
            >
              Salvar Alterações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
