import React, { useEffect, useState } from 'react'
import { Link, useParams, Outlet, useLocation } from 'react-router-dom'
import { ClientesService } from '@/api/clientes'
import { Button } from '@/components/ui/button'

const PerfilCliente = () => {
  const { clienteId } = useParams<{ clienteId: string }>()
  const [cliente, setCliente] = useState<any>(null)

  const location = useLocation()

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        if (clienteId) {
          const fetchedCliente = await ClientesService.buscarPorId(clienteId)
          setCliente(fetchedCliente)
        }
      } catch (error) {
        console.error('Erro ao carregar dados do cliente:', error)
      }
    }

    fetchCliente()
  }, [clienteId])

  if (!cliente) return <div>Carregando perfil...</div>

  const isActive = (path: string) =>
    location.pathname.includes(path)
      ? 'text-blue-500 border-b-2 border-blue-500'
      : 'text-gray-500 hover:text-blue-500'

  return (
    <div>
      <div className="mb-4">
        <Link
          to="/clientes"
          className="text-blue-500 hover:text-blue-700"
        >
          Voltar para Clientes
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">{cliente.nomeEmpresa}</h1>

      <div className="flex space-x-4 border-b-2 pb-2">
        <Link
          to="perfil"
          className={`${isActive('perfil')} px-4 py-2 transition-all duration-200`}
        >
          <Button
            variant="link"
            className="text-sm"
          >
            Informações
          </Button>
        </Link>
        <Link
          to="documentos"
          className={`${isActive('documentos')} px-4 py-2 transition-all duration-200`}
        >
          <Button
            variant="link"
            className="text-sm"
          >
            Documentos
          </Button>
        </Link>
        <Link
          to="orcamentos"
          className={`${isActive('orcamentos')} px-4 py-2 transition-all duration-200`}
        >
          <Button
            variant="link"
            className="text-sm"
          >
            Orçamentos
          </Button>
        </Link>
      </div>

      {/* Renderiza as sub-rotas dentro do Outlet */}
      <Outlet />
    </div>
  )
}

export default PerfilCliente
