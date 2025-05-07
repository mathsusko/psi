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

interface Props {
  onSelectPrestador: (prestadorId: string) => void
}

export function DadosPrestador({ onSelectPrestador }: Props) {
  const [dadosPsi, setDadosPsi] = useState<any[]>([])
  const [selectedCnpj, setSelectedCnpj] = useState('')

  useEffect(() => {
    DadoPsiService.listar().then(setDadosPsi).catch(console.error)
  }, [])

  const handleCnpjChange = (cnpj: string) => {
    setSelectedCnpj(cnpj)
    const empresa = dadosPsi.find((d) => d.cnpj === cnpj)
    if (empresa) onSelectPrestador(empresa._id)
  }

  const renderEmpresaInfo = () => {
    const empresa = dadosPsi.find((d) => d.cnpj === selectedCnpj)
    if (!empresa) return null
    return (
      <div className="flex flex-col gap-12 w-full px-4">
        <div className="flex gap-12 gap-2 text-xs">
          <div>
            <span className="text-zinc-500">Nome</span>
            <p>{empresa.nomeEmpresa}</p>
          </div>
          <div>
            <span className="text-zinc-500">CNPJ</span>
            <p>{empresa.cnpj}</p>
          </div>
          <div>
            <span className="text-zinc-500">Inscrição Estadual</span>
            <p>{empresa.ie}</p>
          </div>
          <div>
            <span className="text-zinc-500">Categoria</span>
            <p>{empresa.categoria}</p>
          </div>
          <div>
            <span className="text-zinc-500">E-mail</span>
            <p>{empresa.email}</p>
          </div>
          <div>
            <span className="text-zinc-500">Telefone</span>
            <p>{empresa.telefone}</p>
          </div>
        </div>
        <div className="flex gap-12 text-xs">
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
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-sidebar text-sidebar-foreground">
      <span>Dados do prestador</span>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2 w-[400px]">
          <label className="px-1 text-xs">Escolha um CNPJ</label>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center p-2 border rounded-md w-full">
              {selectedCnpj || 'Selecione um CNPJ'} <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="p-2 border rounded-md bg-sidebar"
            >
              {dadosPsi.map((empresa) => (
                <DropdownMenuItem
                  key={empresa._id}
                  className="p-2 rounded-md"
                  onClick={() => handleCnpjChange(empresa.cnpj)}
                >
                  {empresa.cnpj}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {selectedCnpj && renderEmpresaInfo()}
      </div>
    </div>
  )
}
