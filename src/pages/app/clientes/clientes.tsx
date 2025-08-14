import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { toast } from 'sonner'
import { ClientesService, Cliente } from '@/api/clientes'
import { ModalNovoCliente } from './ModalNovoCliente'

export default function Clientes() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // 1) Busca lista de clientes
  const {
    data: clientes = [],
    isLoading,
    isError
  } = useQuery<Cliente[]>({
    queryKey: ['clientes'],
    queryFn: ClientesService.listar,
    onError: () => toast.error('Erro ao carregar clientes.') // Mensagem de erro ao buscar os clientes
  })

  // 2) Mutação de exclusão (objeto de opções, não args separados)
  const excluirMutation = useMutation({
    mutationFn: (id: string) => ClientesService.deletar(id),
    onSuccess: () => {
      toast.success('Cliente excluído com sucesso!')
      queryClient.invalidateQueries(['clientes'])
    },
    onError: () => {
      toast.error('Erro ao excluir cliente.')
    }
  })

  const handleVerPerfil = (id: string) => {
    // Navegar para o perfil do cliente
    navigate(`/clientes/${id}/perfil`)
  }

  const handleExcluir = (id: string) => {
    excluirMutation.mutate(id)
  }

  if (isLoading) return <div>Carregando clientes...</div>

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <ModalNovoCliente /> {/* Modal para adicionar novo cliente */}
      </div>

      {/* Tabela para exibir os clientes */}
      <div className="rounded-xl border bg-background shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da Empresa</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente._id}>
                <TableCell>{cliente.nomeEmpresa}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <Button onClick={() => handleVerPerfil(cliente._id!)}>
                    Acessar Perfil
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Excluir"
                    onClick={() => handleExcluir(cliente._id!)}
                    disabled={excluirMutation.isLoading}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
