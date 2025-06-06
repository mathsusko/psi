import { useEffect, useState } from 'react'
import ClientesService, { Cliente } from '@/api/clientes'
import { getFiliais } from '@/api/filiais'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface Props {
  onSelectFilial: (filialId: string) => void
}

interface Filial {
  _id: string
  nomeEmpresa: string
  cnpjCpf: string
  ie?: string
  categoria?: string
  email?: string
  telefone?: string
  endereco?: string
  numeroEndereco?: string
  cidade?: string
  estado?: string
  cep?: string
}

export function DadosClienteFilial({ onSelectFilial }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [filiais, setFiliais] = useState<Filial[]>([])

  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)
  const [filialSelecionada, setFilialSelecionada] = useState<Filial | null>(null)

  useEffect(() => {
    ClientesService.listar().then(setClientes).catch(console.error)
  }, [])

  const handleClienteChange = async (cliente: Cliente) => {
    setClienteSelecionado(cliente)
    setFilialSelecionada(null)
    try {
      const lista = await getFiliais(cliente._id || '')
      setFiliais(Array.isArray(lista) ? lista : []) // fallback seguro
    } catch (err) {
      console.error('Erro ao carregar filiais:', err)
      setFiliais([])
    }
  }

  const handleFilialChange = (filial: Filial) => {
    setFilialSelecionada(filial)
    onSelectFilial(filial._id)
  }

  const renderFilialInfo = () => {
    if (!filialSelecionada) return null

    return (
      <div className="flex flex-col gap-12 w-full px-4">
        <div className="flex flex-wrap gap-6 text-xs">
          <div>
            <span className="text-zinc-500">Nome</span>
            <p>{filialSelecionada.nomeEmpresa}</p>
          </div>
          <div>
            <span className="text-zinc-500">CNPJ/CPF</span>
            <p>{filialSelecionada.cnpjCpf}</p>
          </div>
          <div>
            <span className="text-zinc-500">Inscrição Estadual</span>
            <p>{filialSelecionada.ie}</p>
          </div>
          <div>
            <span className="text-zinc-500">Categoria</span>
            <p>{filialSelecionada.categoria}</p>
          </div>
          <div>
            <span className="text-zinc-500">E-mail</span>
            <p>{filialSelecionada.email}</p>
          </div>
          <div>
            <span className="text-zinc-500">Telefone</span>
            <p>{filialSelecionada.telefone}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-xs">
          <div>
            <span className="text-zinc-500">Endereço</span>
            <p>{filialSelecionada.endereco}</p>
          </div>
          <div>
            <span className="text-zinc-500">Número</span>
            <p>{filialSelecionada.numeroEndereco}</p>
          </div>
          <div>
            <span className="text-zinc-500">Cidade</span>
            <p>{filialSelecionada.cidade}</p>
          </div>
          <div>
            <span className="text-zinc-500">Estado</span>
            <p>{filialSelecionada.estado}</p>
          </div>
          <div>
            <span className="text-zinc-500">CEP</span>
            <p>{filialSelecionada.cep}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-sidebar text-sidebar-foreground">
      <span>Dados do cliente</span>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Dropdown de Cliente */}
        <div className="flex flex-col gap-2 w-[300px]">
          <label className="text-xs">Escolha um cliente</label>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center p-2 border rounded-md w-full">
              {clienteSelecionado?.nomeEmpresa || 'Selecionar cliente'}{' '}
              <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 border rounded-md bg-sidebar">
              {clientes.map((cliente) => (
                <DropdownMenuItem
                  key={cliente._id}
                  className="p-2 rounded-md"
                  onClick={() => handleClienteChange(cliente)}
                >
                  {cliente.nomeEmpresa}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Dropdown de Filial */}
        {clienteSelecionado && (
          <div className="flex flex-col gap-2 w-[300px]">
            <label className="text-xs">Escolha um CNPJ da filial</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-between items-center p-2 border rounded-md w-full">
                {filialSelecionada?.cnpjCpf || 'Selecionar CNPJ'}{' '}
                <ChevronDown size={16} />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="p-2 border rounded-md bg-sidebar">
                {Array.isArray(filiais) &&
                  filiais.map((filial) => (
                    <DropdownMenuItem
                      key={filial._id}
                      className="p-2 rounded-md"
                      onClick={() => handleFilialChange(filial)}
                    >
                      {filial.cnpjCpf}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Exibir dados da filial selecionada */}
      {filialSelecionada && renderFilialInfo()}
    </div>
  )
}
