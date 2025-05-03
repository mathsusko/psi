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

export function DadosCliente() {
  const [clientes, setClientes] = useState([]) // Dados dos clientes
  const [selectedCliente, setSelectedCliente] = useState('') // Cliente selecionado

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await ClientesService.listar() // Requisição para pegar os dados da API
        setClientes(response) // Armazenar os clientes
      } catch (error) {
        console.error('Erro ao carregar dados dos clientes:', error)
      }
    }

    fetchClientes() // Chamada à função
  }, []) // Carrega quando o componente for montado

  const handleClienteChange = (nomeCliente: string) => {
    setSelectedCliente(nomeCliente) // Atualiza o cliente selecionado
  }

  // Função para renderizar os dados do cliente
  const renderClienteInfo = () => {
    const cliente = clientes.find((cliente) => cliente.nomeEmpresa === selectedCliente)
    if (!cliente) return null // Se não encontrar o cliente, não renderiza nada
    return (
      <div className="flex gap-6 w-full px-4">
        <div className="flex flex-col gap-2 text-xs">
          <div>
            <span className="text-zinc-500">Nome</span>
            <p>{cliente.nomeEmpresa}</p>
          </div>
          <div>
            <span className="text-zinc-500">CNPJ</span>
            <p>{cliente.cnpjCpf}</p>
          </div>
          <div>
            <span className="text-zinc-500">E-mail</span>
            <p>{cliente.email}</p>
          </div>
          <div>
            <span className="text-zinc-500">Telefone</span>
            <p>{cliente.telefone}</p>
          </div>
          <div>
            <span className="text-zinc-500">Categoria</span>
            <p>{cliente.categoria}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs">
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
    <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
      <span>Dados do cliente</span>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2 w-[400px]">
          <label
            htmlFor="Escolha um Cliente"
            className="px-1 text-xs"
          >
            Escolha um cliente
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between w-[300px] items-center p-2 border rounded-md">
              {selectedCliente ? selectedCliente : 'Escolha um cliente'}{' '}
              <ChevronDown size="16" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="p-2 border rounded-md bg-sidebar"
            >
              {clientes.map((cliente) => (
                <DropdownMenuItem
                  className="p-2 rounded-md"
                  key={cliente._id}
                  onClick={() => handleClienteChange(cliente.nomeEmpresa)}
                >
                  {cliente.nomeEmpresa}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Exibindo as informações do cliente */}
        {selectedCliente && renderClienteInfo()}
      </div>
    </div>
  )
}
