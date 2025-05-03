// src/components/DadosPrestador.tsx
import { useEffect, useState } from 'react'
import DadoPsiService from '@/api/dadoPsi'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'

export function DadosPrestador() {
  const [dadosPsi, setDadosPsi] = useState([]) // Estado para os dados das empresas (dadoPsi)
  const [selectedCnpj, setSelectedCnpj] = useState('') // CNPJ selecionado

  useEffect(() => {
    const fetchDadoPsi = async () => {
      try {
        const response = await DadoPsiService.listar() // Requisição para pegar os dados da API
        setDadosPsi(response) // Armazenar os dados
      } catch (error) {
        console.error('Erro ao carregar dados do prestador:', error)
      }
    }

    fetchDadoPsi() // Chamada à função
  }, []) // Carrega quando o componente for montado

  const handleCnpjChange = (cnpj: string) => {
    setSelectedCnpj(cnpj) // Atualiza o CNPJ selecionado
  }

  // Função para renderizar os dados do prestador
  const renderEmpresaInfo = () => {
    const empresa = dadosPsi.find((dado) => dado.cnpj === selectedCnpj)
    if (!empresa) return null // Se não encontrar a empresa, não renderiza nada
    return (
      <div className="flex gap-6 w-full px-4">
        <div className="flex flex-col gap-2 text-xs">
          <div>
            <span className="text-zinc-500">Nome</span>
            <p>{empresa.nomeEmpresa}</p>
          </div>
          <div>
            <span className="text-zinc-500">CNPJ</span>
            <p>{empresa.cnpj}</p>
          </div>
          <div>
            <span className="text-zinc-500">E-mail</span>
            <p>{empresa.email}</p>
          </div>
          <div>
            <span className="text-zinc-500">Telefone</span>
            <p>{empresa.telefone}</p>
          </div>
          <div>
            <span className="text-zinc-500">Categoria</span>
            <p>{empresa.categoria}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs">
          <div>
            <span className="text-zinc-500">Endereço</span>
            <p>{empresa.endereco}</p>
          </div>
          <div>
            <span className="text-zinc-500">Número</span>
            <p>{empresa.numeroEndereco}</p>
          </div>
          <div>
            <span className="text-zinc-500">Cidade</span>
            <p>{empresa.cidade}</p>
          </div>
          <div>
            <span className="text-zinc-500">Estado</span>
            <p>{empresa.estado}</p>
          </div>
          <div>
            <span className="text-zinc-500">CEP</span>
            <p>{empresa.cep}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
      <span>Dados do prestador</span>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2 w-[400px]">
          <label
            htmlFor="Escolha um CNPJ"
            className="px-1 text-xs"
          >
            Escolha um CNPJ
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between w-[300px] items-center p-2 border rounded-md">
              {selectedCnpj ? selectedCnpj : 'Selecione um CNPJ'}{' '}
              <ChevronDown size="16" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="p-2 border rounded-md bg-sidebar"
            >
              {dadosPsi.map((empresa) => (
                <DropdownMenuItem
                  className="p-2 rounded-md"
                  key={empresa._id}
                  onClick={() => handleCnpjChange(empresa.cnpj)}
                >
                  {empresa.cnpj}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Exibindo as informações do prestador */}
        {selectedCnpj && renderEmpresaInfo()}
      </div>
    </div>
  )
}
