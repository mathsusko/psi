import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { ModalNovoCliente } from './ModalNovoCliente' // Importe o novo modal
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Importação correta para navegar

const API_URL = 'http://localhost:3333/api/clientes'

// Função para buscar os clientes
const fetchClientes = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export default function Clientes() {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate() // Hook para navegação

  // Usando o React Query para buscar a lista de clientes
  const {
    data: clientes,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['clientes'],
    queryFn: fetchClientes
  })

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Função para navegar para o perfil do cliente
  const verPerfil = (id: string) => {
    navigate(`/clientes/${id}`) // Corrigido para navegar corretamente
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Erro ao carregar clientes</div>

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenModal}>+ Adicionar cliente</Button>
        </div>
      </div>

      <div className="rounded-xl border bg-background shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da empresa</TableHead>
              <TableHead>CNPJ/CPF</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="flex justify-center items-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clientes.map((cliente: any) => (
              <TableRow key={cliente._id}>
                <TableCell>{cliente.nomeEmpresa}</TableCell>
                <TableCell>{cliente.cnpjCpf}</TableCell>
                <TableCell>{cliente.categoria}</TableCell>
                <TableCell className="flex justify-center items-centers">
                  <Button onClick={() => verPerfil(cliente._id)}>Ver perfil</Button>{' '}
                  {/* Passando o ID para a navegação */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal Novo Cliente */}
      <ModalNovoCliente
        open={openModal}
        onOpenChange={setOpenModal}
      />
    </div>
  )
}
