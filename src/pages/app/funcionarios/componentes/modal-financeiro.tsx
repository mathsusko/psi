import { useState, useEffect } from 'react'
import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@radix-ui/react-separator'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useParams } from 'react-router-dom'
import { getFuncionarioById } from '@/api/funcionarios' // Importando a função da API

interface DialogFinanceiroProps {
  onAdd: (item: any) => void
}

export function DialogFinanceiro({ onAdd }: DialogFinanceiroProps) {
  const { funcionarioId } = useParams<{ funcionarioId: string }>() // Pega o ID do funcionário da URL
  const [state, setState] = useState({
    nomeFuncionario: '',
    quantidade: '',
    diaInteiro: false,
    meioDia: false,
    fimSemana: false,
    valorDiaTrabalho: '',
    bonus: '',
    descricao: ''
  })

  useEffect(() => {
    // Função para buscar o nome do funcionário baseado no ID da URL usando a API
    const fetchFuncionario = async () => {
      try {
        const data = await getFuncionarioById(funcionarioId) // Chama a API para pegar os dados do funcionário
        console.log('Dados do funcionário:', data) // Log do retorno da API
        setState((prevState) => ({
          ...prevState,
          nomeFuncionario: data.nome // Atualiza o nome do funcionário no estado
        }))
      } catch (error) {
        console.error('Erro ao buscar nome do funcionário:', error)
      }
    }

    if (funcionarioId) {
      fetchFuncionario() // Chama a função quando o componente é montado
    }
  }, [funcionarioId]) // A dependência é o 'funcionarioId' para garantir que sempre que ele mudar, o nome será atualizado

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setState((prev) => ({ ...prev, [name]: checked }))
  }

  console.log('Estado atual:', state) // Log do estado

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Registro</DialogTitle>
        <DialogDescription>
          Preencha com as informações do dia do trabalho do funcionário
        </DialogDescription>
      </DialogHeader>
      <form className="grid gap-4 py-4">
        <div className="flex flex-col gap-2">
          <div className="space-y-4">
            <p className="text-gray-900">O nome do funcionário buscado automaticamente</p>
            <div className="space-y-2 mb-4">
              <label
                htmlFor="nomeFuncionario"
                className="text-sm font-medium text-gray-700"
              >
                Nome do Funcionário
              </label>
              <Input
                id="nomeFuncionario"
                name="nomeFuncionario"
                value={state.nomeFuncionario}
                onChange={handleChange}
                placeholder="Nome do Funcionário"
                disabled // Nome vem automaticamente e não pode ser editado
              />
            </div>
          </div>
          <Separator
            orientation="horizontal"
            className="border mb-4"
          />

          {/* Outros campos do formulário */}
          <div className="space-y-4">
            <p className="text-gray-900">
              Selecione a opção que corresponde ao dia de trabalho
            </p>
            <div className="flex gap-6">
              <div className="space-x-2 mb-4 flex items-center">
                <Checkbox
                  name="diaInteiro"
                  checked={state.diaInteiro}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm font-medium text-gray-700">Dia inteiro</span>
              </div>
              <div className="space-x-2 mb-4 flex items-center">
                <Checkbox
                  name="meioDia"
                  checked={state.meioDia}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm font-medium text-gray-700">Meio-Dia</span>
              </div>
              <div className="space-x-2 mb-4 flex items-center">
                <Checkbox
                  name="fimSemana"
                  checked={state.fimSemana}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm font-medium text-gray-700">Fim de semana</span>
              </div>
            </div>
          </div>

          <Separator
            orientation="horizontal"
            className="border mb-4"
          />

          <div className="space-y-4">
            <p className="text-gray-900">Defina o valor da mão de obra</p>
            <div className="flex justify-between gap-2">
              <div className="space-y-2 mb-4 w-full">
                <label
                  htmlFor="valorDiaTrabalho"
                  className="text-sm font-medium text-gray-700"
                >
                  R$ Dia Trabalho
                </label>
                <Input
                  id="valorDiaTrabalho"
                  name="valorDiaTrabalho"
                  value={state.valorDiaTrabalho}
                  onChange={handleChange}
                  placeholder="Valor por dia"
                />
              </div>
              <div className="space-y-2 mb-4 w-full">
                <label
                  htmlFor="bonus"
                  className="text-sm font-medium text-gray-700"
                >
                  R$ Bônus
                </label>
                <Input
                  id="bonus"
                  name="bonus"
                  value={state.bonus}
                  onChange={handleChange}
                  placeholder="Bônus"
                />
              </div>
            </div>
          </div>

          <Separator
            orientation="horizontal"
            className="border mb-4"
          />

          <div className="space-y-4">
            <p className="text-gray-900">Informação adicional</p>
            <div className="space-y-2 mb-4 w-full">
              <label
                htmlFor="descricao"
                className="text-sm font-medium text-gray-700"
              >
                Descrição (opcional)
              </label>
              <Textarea
                id="descricao"
                name="descricao"
                value={state.descricao}
                onChange={handleChange}
                placeholder="Deixe uma descrição importante..."
                rows={5}
              />
            </div>
          </div>
        </div>
        <Button onClick={() => onAdd(state)}>Confirmar</Button>
      </form>
    </DialogContent>
  )
}
