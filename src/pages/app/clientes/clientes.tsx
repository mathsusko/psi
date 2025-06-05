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
import { ModalNovoCliente } from './ModalNovoCliente'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:3333/api/clientes'

const fetchClientes = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export default function Clientes() {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

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

  const verPerfil = (id: string) => {
    navigate(`/clientes/${id}/filiais`)
  }

  if (isLoading) return <div>Carregando...</div>
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
              <TableHead className="flex justify-center items-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clientes.map((cliente: any) => (
              <TableRow key={cliente._id}>
                <TableCell>{cliente.nomeEmpresa}</TableCell>
                <TableCell className="flex justify-center items-center">
                  <Button onClick={() => verPerfil(cliente._id)}>Ver perfil</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ModalNovoCliente
        open={openModal}
        onOpenChange={setOpenModal}
      />
    </div>
  )
}
