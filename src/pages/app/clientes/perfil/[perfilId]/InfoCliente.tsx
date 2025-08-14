import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClientesService } from '@/api/clientes'
import Info from '@/pages/app/clientes/info/Info'

const InfoCliente = () => {
  const { clienteId } = useParams()
  const [cliente, setCliente] = useState<any>(null)

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const fetchedCliente = await ClientesService.buscarPorId(clienteId!)
        setCliente(fetchedCliente)
      } catch (error) {
        console.error('Erro ao carregar dados do cliente:', error)
      }
    }

    if (clienteId) {
      fetchCliente()
    }
  }, [clienteId])

  if (!cliente) return <div>Carregando perfil...</div>

  return (
    <div>
      <h1>Dados gerais do cliente:</h1>
      <Info cliente={cliente} /> {/* Passando os dados para o Info */}
    </div>
  )
}

export default InfoCliente
