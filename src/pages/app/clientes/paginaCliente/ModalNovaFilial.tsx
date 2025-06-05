import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useCriarFilial } from '@/hooks/useFiliais'

interface ModalNovaFilialProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientePaiId: string
}

export function ModalNovaFilial({
  open,
  onOpenChange,
  clientePaiId
}: ModalNovaFilialProps) {
  const [form, setForm] = useState({
    nomeEmpresa: '',
    cnpjCpf: '',
    ie: '',
    categoria: '',
    email: '',
    telefone: '',
    endereco: '',
    numeroEndereco: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: ''
  })

  const { mutateAsync, isPending } = useCriarFilial()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!form.nomeEmpresa.trim()) {
      toast.error('O nome da empresa é obrigatório.')
      return
    }

    const confirm = window.confirm('Tem certeza que deseja adicionar esta filial?')
    if (!confirm) return

    try {
      await mutateAsync({ ...form, clientePaiId })
      toast.success('Filial criada com sucesso!')
      onOpenChange(false)
      setForm({
        nomeEmpresa: '',
        cnpjCpf: '',
        ie: '',
        categoria: '',
        email: '',
        telefone: '',
        endereco: '',
        numeroEndereco: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: ''
      })
    } catch (error) {
      toast.error('Erro ao criar filial. Tente novamente.')
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="space-y-4 w-full max-w-[600px]">
        <DialogTitle>Adicionar Nova Filial</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para adicionar uma nova filial vinculada ao cliente.
        </DialogDescription>

        <div className="flex gap-4">
          <div className="space-y-4 w-full">
            <h3 className="text-sm font-semibold">Informações da Filial</h3>
            <Input
              name="nomeEmpresa"
              placeholder="Nome da Empresa"
              value={form.nomeEmpresa}
              onChange={handleChange}
            />
            <Input
              name="cnpjCpf"
              placeholder="CNPJ/CPF"
              value={form.cnpjCpf}
              onChange={handleChange}
            />
            <Input
              name="ie"
              placeholder="Inscrição Estadual"
              value={form.ie}
              onChange={handleChange}
            />
            <Input
              name="categoria"
              placeholder="Categoria (Matriz ou Filial)"
              value={form.categoria}
              onChange={handleChange}
            />
            <Input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-4 w-full">
            <h3 className="text-sm font-semibold">Endereço</h3>
            <Input
              name="endereco"
              placeholder="Endereço"
              value={form.endereco}
              onChange={handleChange}
            />
            <Input
              name="numeroEndereco"
              placeholder="Número"
              value={form.numeroEndereco}
              onChange={handleChange}
            />
            <Input
              name="complemento"
              placeholder="Complemento"
              value={form.complemento}
              onChange={handleChange}
            />
            <Input
              name="bairro"
              placeholder="Bairro"
              value={form.bairro}
              onChange={handleChange}
            />
            <Input
              name="cep"
              placeholder="CEP"
              value={form.cep}
              onChange={handleChange}
            />
            <Input
              name="cidade"
              placeholder="Cidade"
              value={form.cidade}
              onChange={handleChange}
            />
            <Input
              name="estado"
              placeholder="Estado"
              value={form.estado}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? 'Adicionando...' : 'Adicionar Filial'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
