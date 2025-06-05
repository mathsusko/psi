import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getFilialPorId } from '@/api/filiais'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PerfilFilial() {
  const { filialId } = useParams()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['filial', filialId],
    queryFn: () => getFilialPorId(filialId!),
    enabled: !!filialId
  })

  useEffect(() => {
    if (filialId) {
      navigate('orcamento', { replace: true })
    }
  }, [filialId, navigate])

  if (isLoading) return <p>Carregando dados da filial...</p>
  if (isError || !data?.data) return <p>Erro ao carregar a filial</p>

  const filial = data.data

  return (
    <div className="p-6 space-y-4">
      <Link
        to="/clientes"
        className="flex gap-2 items-center text-xs"
      >
        <MoveLeft size={12} />
        Voltar
      </Link>

      <h2 className="text-2xl font-bold">{filial.nomeEmpresa}</h2>

      <div className="flex gap-4 mt-6">
        <Button onClick={() => navigate('orcamento')}>Orçamentos</Button>
        <Button onClick={() => navigate('notas-fiscais')}>Notas Fiscais</Button>
        <Button onClick={() => navigate('dados-da-filial')}>Gerenciar Dados</Button>
      </div>

      <div className="pt-6">
        <Outlet />
      </div>
    </div>
  )
}
