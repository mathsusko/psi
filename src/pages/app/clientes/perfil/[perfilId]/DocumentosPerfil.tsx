import React from 'react'
import { useParams } from 'react-router-dom'
import Documentos from '@/pages/app/clientes/documentos/Documentos'

const DocumentosPerfil = () => {
  const { clienteId } = useParams<{ clienteId: string }>()
  if (!clienteId) return <div>Cliente inválido.</div>

  return <Documentos clienteId={clienteId} />
}

export default DocumentosPerfil
