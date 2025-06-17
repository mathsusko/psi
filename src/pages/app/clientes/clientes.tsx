// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell
// } from '@/components/ui/table'
// import { ModalNovoCliente } from './ModalNovoCliente'
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const API_URL = `${import.meta.env.VITE_API_URL}/clientes`

// const fetchClientes = async () => {
//   const response = await axios.get(API_URL)
//   return response.data
// }

// export default function Clientes() {
//   const [openModal, setOpenModal] = useState(false)
//   const navigate = useNavigate()

//   const {
//     data: clientes,
//     isLoading,
//     isError
//   } = useQuery({
//     queryKey: ['clientes'],
//     queryFn: fetchClientes
//   })

//   const handleOpenModal = () => {
//     setOpenModal(true)
//   }

//   const verPerfil = (id: string) => {
//     navigate(`/clientes/${id}/filiais`)
//   }

//   if (isLoading) return <div>Carregando...</div>
//   if (isError) return <div>Erro ao carregar clientes</div>

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
//         <div className="flex items-center gap-2">
//           <Button onClick={handleOpenModal}>+ Adicionar cliente</Button>
//         </div>
//       </div>

//       <div className="rounded-xl border bg-background shadow-sm overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Nome da empresa</TableHead>
//               <TableHead className="flex justify-end px-[100px] items-center">
//                 Ações
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {clientes.map((cliente: any) => (
//               <TableRow key={cliente._id}>
//                 <TableCell>{cliente.nomeEmpresa}</TableCell>
//                 <TableCell className="flex justify-end px-[100px] items-center">
//                   <Button onClick={() => verPerfil(cliente._id)}>Ver perfil</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <ModalNovoCliente
//         open={openModal}
//         onOpenChange={setOpenModal}
//       />
//     </div>
//   )
// }

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
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Trash } from 'lucide-react'

const API_URL = `${import.meta.env.VITE_API_URL}/clientes`

const fetchClientes = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const excluirClienteAPI = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`)
}

export default function Clientes() {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

  const {
    data: clientes,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['clientes'],
    queryFn: fetchClientes
  })

  const { mutate: excluirCliente } = useMutation({
    mutationFn: excluirClienteAPI,
    onSuccess: () => {
      // Refaz a busca dos clientes após a exclusão
      refetch()
    },
    onError: () => {
      toast.error('Erro ao excluir cliente.')
    }
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
              <TableHead className="flex justify-end px-[100px] items-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clientes.map((cliente: any) => (
              <TableRow key={cliente._id}>
                <TableCell>{cliente.nomeEmpresa}</TableCell>
                <TableCell className="flex justify-end px-[60px] items-center">
                  {/* Botão "Ver perfil" */}
                  <Button onClick={() => verPerfil(cliente._id)}>Ver perfil</Button>

                  {/* Ícone de lixeira */}
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Excluir"
                    onClick={() => excluirCliente(cliente._id)} // Função de exclusão
                    className="ml-2"
                  >
                    <Trash className="w-4 h-4 text-red-600" />
                  </Button>
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
