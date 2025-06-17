import { MoveLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import ListaFiliaisDoCliente from './filiaisDoCliente'

export default function Cliente() {
  return (
    <div className="flex flex-col gap-6 p-4">

      {/* Aqui entra a tabela de filiais e botão para adicionar */}
      <ListaFiliaisDoCliente />
    </div>
  )
}
