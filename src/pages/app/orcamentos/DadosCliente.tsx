// src/components/DadosCliente.tsx
import { useEffect, useState } from 'react'
import ClientesService from '@/api/clientes'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface Props {
  onSelectCliente: (clienteId: string) => void
}

export function DadosCliente({ onSelectCliente }: Props) {
  const [clientes, setClientes] = useState<any[]>([])
  const [selectedNome, setSelectedNome] = useState('')

  useEffect(() => {
    ClientesService.listar().then(setClientes).catch(console.error)
  }, [])

  const handleClienteChange = (nomeEmpresa: string) => {
    setSelectedNome(nomeEmpresa)
    const cliente = clientes.find((c) => c.nomeEmpresa === nomeEmpresa)
    if (cliente) onSelectCliente(cliente._id)
  }

  const renderClienteInfo = () => {
    const cliente = clientes.find((c) => c.nomeEmpresa === selectedNome)
    if (!cliente) return null
    return (
      <div className="flex flex-col gap-12 w-full px-4">
        <div className="flex gap-12 text-xs">
          <div>
            <span className="text-zinc-500">Nome</span>
            <p>{cliente.nomeEmpresa}</p>
          </div>
          <div>
            <span className="text-zinc-500">CNPJ</span>
            <p>{cliente.cnpjCpf}</p>
          </div>
          <div>
            <span className="text-zinc-500">Inscrição Estadual</span>
            <p>{cliente.ie}</p>
          </div>
          <div>
            <span className="text-zinc-500">Categoria</span>
            <p>{cliente.categoria}</p>
          </div>
          <div>
            <span className="text-zinc-500">E-mail</span>
            <p>{cliente.email}</p>
          </div>
          <div>
            <span className="text-zinc-500">Telefone</span>
            <p>{cliente.telefone}</p>
          </div>
        </div>
        <div className="flex gap-12 text-xs">
          <div>
            <span className="text-zinc-500">Endereço</span>
            <p>{cliente.endereco}</p>
          </div>
          <div>
            <span className="text-zinc-500">Número</span>
            <p>{cliente.numeroEndereco}</p>
          </div>
          <div>
            <span className="text-zinc-500">Cidade</span>
            <p>{cliente.cidade}</p>
          </div>
          <div>
            <span className="text-zinc-500">Estado</span>
            <p>{cliente.estado}</p>
          </div>
          <div>
            <span className="text-zinc-500">CEP</span>
            <p>{cliente.cep}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-sidebar text-sidebar-foreground">
      <span>Dados do cliente</span>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2 w-[400px]">
          <label className="px-1 text-xs">Escolha um cliente</label>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center p-2 border rounded-md w-full">
              {selectedNome || 'Escolha um cliente'} <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="p-2 border rounded-md bg-sidebar"
            >
              {clientes.map((cliente) => (
                <DropdownMenuItem
                  key={cliente._id}
                  className="p-2 rounded-md"
                  onClick={() => handleClienteChange(cliente.nomeEmpresa)}
                >
                  {cliente.nomeEmpresa}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {selectedNome && renderClienteInfo()}
      </div>
    </div>
  )
}
