import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Orcamento from './orcamento'
import NotasFiscais from './notasFiscais'
import DadosCliente from './dadosDaEmpresa'

const API_URL = 'http://localhost:3333/api/clientes'

const fetchCliente = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

export default function Cliente() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['cliente', id],
    queryFn: () => fetchCliente(id!),
    enabled: !!id
  })

  const handleNavigation = (section: string) => {
    navigate(`/clientes/${id}/${section}`)
  }

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro ao carregar dados do cliente</div>

  return (
    <div className="flex flex-col gap-1 space-y-6">
      <div className="flex flex-col gap-6 p-2">
        <Link
          to="/clientes"
          className="flex gap-2 items-center text-xs"
        >
          <MoveLeft size="12" />
          Voltar
        </Link>

        <h1 className="text-2xl">{data?.nomeEmpresa}</h1>

        <div className="flex gap-2">
          <Button onClick={() => handleNavigation('orcamento')}>Orçamentos</Button>
          <Button onClick={() => handleNavigation('notas-fiscais')}>Notas Fiscais</Button>
          <Button onClick={() => handleNavigation('dados-da-empresa')}>
            Dados do cliente
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-md p-4 bg-sidebar">
        <Routes>
          <Route
            path="orcamento"
            element={<Orcamento />}
          />
          <Route
            path="notas-fiscais"
            element={<NotasFiscais />}
          />
          <Route
            path="dados-da-empresa"
            element={<DadosCliente />}
          />
        </Routes>
      </div>
    </div>
  )
}
