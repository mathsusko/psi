import { useParams } from 'react-router-dom'
import {
  usePagamentos,
  useCriarPagamento,
  useAtualizarPagamento,
  useDeletarPagamento
} from '@/hooks/usePagamentos'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { PagamentoFuncionario } from '@/api/pagamentos'

const schema = z.object({
  mesReferencia: z.string().min(7, 'Informe no formato YYYY-MM'),
  valor: z.coerce.number().min(0.01, 'Valor mínimo é R$0.01'),
  status: z.enum(['pendente', 'pago'])
})

type FormData = z.infer<typeof schema>

export default function FuncionarioPagamentos() {
  const { id: funcionarioId } = useParams<{ id: string }>()
  const { data: pagamentos = [], isLoading } = usePagamentos(funcionarioId!)
  const criar = useCriarPagamento(funcionarioId!)
  const atualizar = useAtualizarPagamento(funcionarioId!)
  const deletar = useDeletarPagamento(funcionarioId!)

  const [editando, setEditando] = useState<PagamentoFuncionario | null>(null)

  const { register, handleSubmit, reset, setValue, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    if (editando) {
      atualizar.mutate(
        { pagamentoId: editando._id, data },
        {
          onSuccess: () => {
            toast.success('Pagamento atualizado!')
            setEditando(null)
            reset()
          },
          onError: () => toast.error('Erro ao atualizar')
        }
      )
    } else {
      criar.mutate(data, {
        onSuccess: () => {
          toast.success('Pagamento criado!')
          reset()
        },
        onError: () => toast.error('Erro ao criar')
      })
    }
  }

  const iniciarEdicao = (pagamento: PagamentoFuncionario) => {
    setEditando(pagamento)
    setValue('mesReferencia', pagamento.mesReferencia)
    setValue('valor', pagamento.valor)
    setValue('status', pagamento.status)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Controle de Pagamentos</h2>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div>
          <Label>Mês de Referência</Label>
          <Input
            type="month"
            {...register('mesReferencia')}
          />
        </div>

        <div>
          <Label>Valor (R$)</Label>
          <Input
            type="number"
            step="0.01"
            {...register('valor')}
          />
        </div>

        <div>
          <Label>Status</Label>
          <Select
            defaultValue="pendente"
            onValueChange={(value) => setValue('status', value as 'pendente' | 'pago')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-full">
          <Button
            type="submit"
            className="w-full"
            disabled={formState.isSubmitting}
          >
            {editando ? 'Salvar Alterações' : 'Cadastrar Pagamento'}
          </Button>
        </div>
      </form>

      {/* Lista */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-lg">
          <thead>
            <tr className="bg-muted text-left">
              <th className="p-2">Mês</th>
              <th className="p-2">Valor (R$)</th>
              <th className="p-2">Status</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center"
                >
                  Carregando...
                </td>
              </tr>
            )}
            {!isLoading && pagamentos.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-muted-foreground"
                >
                  Nenhum pagamento registrado.
                </td>
              </tr>
            )}
            {pagamentos.map((p) => (
              <tr
                key={p._id}
                className="border-t"
              >
                <td className="p-2">{p.mesReferencia}</td>
                <td className="p-2">R$ {p.valor.toFixed(2)}</td>
                <td className="p-2 capitalize">{p.status}</td>
                <td className="p-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => iniciarEdicao(p)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      deletar.mutate(p._id, {
                        onSuccess: () => toast.success('Pagamento deletado.'),
                        onError: () => toast.error('Erro ao deletar.')
                      })
                    }}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
