import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ClientesService from '@/api/clientes'
import { toast } from 'sonner'

interface ModalNovoClienteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ModalNovoCliente({ open, onOpenChange }: ModalNovoClienteProps) {
  const [form, setForm] = useState({
    nomeEmpresa: '',
    cnpjCpf: '',
    categoria: '', // Categoria (Matriz ou Filial)
    email: '',
    telefone: '',
    endereco: '',
    numeroEndereco: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    ie: ''
  })

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      const data = {
        ...form
      }
      return await ClientesService.criar(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['clientes'])
      toast.success('Cliente criado com sucesso!')
      onOpenChange(false)
      setForm({
        nomeEmpresa: '',
        cnpjCpf: '',
        categoria: '',
        email: '',
        telefone: '',
        endereco: '',
        numeroEndereco: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',
        ie: ''
      })
    },
    onError: () => {
      toast.error('Erro ao criar cliente. Tente novamente.')
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const confirm = window.confirm('Tem certeza que deseja adicionar este cliente?')
    if (confirm) {
      try {
        await mutateAsync()
      } catch (error) {
        console.error('Erro ao enviar dados:', error)
      }
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="space-y-4 w-full max-w-[600px]">
        <DialogTitle>Adicionar Novo Cliente</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para adicionar um novo cliente.
        </DialogDescription>

        <div className="flex gap-4">
          <div className="space-y-4 w-full">
            <h3 className="text-sm font-semibold">Dados da Empresa</h3>
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
          disabled={isLoading}
        >
          {isLoading ? 'Adicionando...' : 'Adicionar Cliente'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
