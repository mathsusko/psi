import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { ModalNovaFilial } from './ModalNovaFilial'
import { useFiliais, useDeletarFilial } from '@/hooks/useFiliais'
import { MoveLeft, Trash } from 'lucide-react'
import { toast } from 'sonner'
import { useCliente } from '@/hooks/useCliente'

interface Filial {
  _id: string
  nomeEmpresa: string
  clientePaiId: string
  cnpjCpf: string
  categoria: string
}

export default function FiliaisDoCliente() {
  const { id: clientePaiId } = useParams<{ id: string }>()
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

  const {
    data: clienteData,
    isLoading: isClienteLoading,
    isError: isClienteError
  } = useCliente(clientePaiId!)

  const { data: filiais = [], isLoading, isError, refetch } = useFiliais(clientePaiId!)

  const { mutateAsync: deletarFilial } = useDeletarFilial()

  const verPerfil = (filialId: string) => {
    navigate(`/clientes/filial/${filialId}/orcamento`)
  }

  if (isLoading || isClienteLoading) return <div>Carregando...</div>
  if (isError || isClienteError) return <div>Erro ao carregar dados</div>

  return (
    <div className="p-6 space-y-6">
      <Link
        to="/clientes"
        className="flex gap-2 items-center text-xs"
      >
        <MoveLeft size="12" />
        Voltar
      </Link>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{clienteData?.nomeEmpresa}</h2>
        <Button onClick={() => setOpenModal(true)}>+ Adicionar</Button>
      </div>

      <div className="rounded-xl border bg-background shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da empresa</TableHead>
              <TableHead>CNPJ/CPF</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.isArray(filiais) &&
              filiais.map((filial) => (
                <TableRow key={filial._id}>
                  <TableCell>{filial.nomeEmpresa}</TableCell>
                  <TableCell>{filial.cnpjCpf}</TableCell>
                  <TableCell>{filial.categoria}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => verPerfil(filial._id!)}
                    >
                      Ver perfil
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={async () => {
                        const confirmar = window.confirm(
                          `Excluir filial "${filial.nomeEmpresa}"?`
                        )
                        if (confirmar) {
                          try {
                            await deletarFilial({
                              id: filial._id!,
                              clientePaiId: clientePaiId!
                            })
                            toast.success('Filial removida com sucesso.')
                            refetch()
                          } catch {
                            toast.error('Erro ao remover filial.')
                          }
                        }
                      }}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <ModalNovaFilial
        open={openModal}
        onOpenChange={(v) => {
          setOpenModal(v)
          if (!v) refetch()
        }}
        clientePaiId={clientePaiId!}
      />
    </div>
  )
}
