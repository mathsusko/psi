import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog' // Importando DialogDescription
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ClientesService from '@/api/clientes' // Certifique-se de que a importação está correta
import { toast } from 'sonner' // Usando o Sonner para notificações

interface ModalNovoClienteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ModalNovoCliente({ open, onOpenChange }: ModalNovoClienteProps) {
  const [form, setForm] = useState({
    nomeEmpresa: '',
    cnpjCpf: '',
    endereco: '',
    numeroEndereco: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    categoria: '' // Categoria (Matriz ou Filial)
  })

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      const data = {
        ...form
      }
      // Certifique-se de que a função correta de criação está sendo chamada.
      return await ClientesService.criar(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['clientes']) // Atualiza a lista de clientes após o sucesso
      toast.success('Cliente criado com sucesso!') // Exibe a mensagem de sucesso
      onOpenChange(false) // Fecha o modal após sucesso
      setForm({
        nomeEmpresa: '',
        cnpjCpf: '',
        endereco: '',
        numeroEndereco: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',
        categoria: ''
      })
    },
    onError: () => {
      toast.error('Erro ao criar cliente. Tente novamente.') // Exibe a mensagem de erro
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const confirm = window.confirm('Tem certeza que deseja adicionar este cliente?') // Confirmação antes de criar o cliente
    if (confirm) {
      try {
        await mutateAsync() // Aguarda a mutação ser concluída
      } catch (error) {
        console.error('Erro ao enviar dados:', error) // Exibe o erro se houver
      }
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="space-y-4">
        <DialogTitle>Adicionar Novo Cliente</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para adicionar um novo cliente.
        </DialogDescription>

        {Object.entries(form).map(([key, value]) => (
          <Input
            key={key}
            name={key}
            placeholder={key.replace(/([A-Z])/g, ' $1')} // Formatação do nome do campo
            value={value}
            onChange={handleChange}
          />
        ))}
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
