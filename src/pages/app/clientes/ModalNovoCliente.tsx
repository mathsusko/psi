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
  clientePaiId?: string
  isFilial?: boolean
}

export function ModalNovoCliente({ open, onOpenChange }: ModalNovoClienteProps) {
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      return await ClientesService.criarRapido(nomeEmpresa)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
      toast.success('Cliente criado com sucesso!')
      onOpenChange(false)
      setNomeEmpresa('')
    },
    onError: () => {
      toast.error('Erro ao criar cliente. Tente novamente.')
    }
  })

  const handleSubmit = async () => {
    const confirm = window.confirm('Tem certeza que deseja adicionar este cliente?')
    if (!nomeEmpresa.trim()) {
      toast.error('O nome da empresa é obrigatório.')
      return
    }

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
      <DialogContent className="space-y-4 w-full max-w-[400px]">
        <DialogTitle>Adicionar Novo Cliente</DialogTitle>
        <DialogDescription>
          Insira o nome da organização para criar um novo cliente.
        </DialogDescription>

        <Input
          name="nomeEmpresa"
          placeholder="Nome da Empresa"
          value={nomeEmpresa}
          onChange={(e) => setNomeEmpresa(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? 'Adicionando...' : 'Adicionar Cliente'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
