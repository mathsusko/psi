import { useNavigate } from 'react-router-dom'

interface CardEstoqueProps {
  id: string
  nome: string
  imagemUrl: string
}

export function CardEstoque({ id, nome, imagemUrl }: CardEstoqueProps) {
  const navigate = useNavigate()

  // Função que será chamada ao clicar no botão "Ver mais"
  const handleVerMais = () => {
    navigate(`/app/estoque/${id}`)
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-transform duration-200">
      {/* Imagem do card */}
      <div className="h-40 w-full bg-gray-100">
        <img
          src={imagemUrl || '/placeholder.png'}
          alt={nome}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nome do card e botão de navegação */}
      <div className="p-3 flex flex-col items-center gap-2">
        <span className="text-center text-sm font-semibold text-gray-800">
          {nome}
        </span>
        <button
          onClick={handleVerMais}  // Navegação ao clicar
          className="px-4 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Ver mais
        </button>
      </div>
    </div>
  )
}
