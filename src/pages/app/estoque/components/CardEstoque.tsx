// src/pages/app/estoque/components/CardEstoque.tsx
import { Link } from 'react-router-dom'

interface CardEstoqueProps {
  id: string
  nome: string
  imagemUrl: string
}

export function CardEstoque({ id, nome, imagemUrl }: CardEstoqueProps) {
  return (
    <Link
      to={`/app/estoque/${id}`}
      className="..."
    >
      <img
        src={imagemUrl}
        alt={nome}
      />
      <span>{nome}</span>
    </Link>
  )
}
