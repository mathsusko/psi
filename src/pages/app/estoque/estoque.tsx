// src/pages/app/estoque/estoque.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCardsEstoque } from '../../../hooks/useCardsEstoque'
import { CardEstoque } from './components/CardEstoque'
import { ModalNovoCard } from './components/ModalNovoCard'

export default function Estoque() {
  const { cards, isLoading, isError } = useCardsEstoque()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Configuração da URL base da API
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333'

  // Condição para exibir mensagens de carregamento ou erro
  if (isLoading) return <p>Carregando...</p>
  if (isError) return <p>Erro ao carregar cards</p>

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Novo Card</Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 ">
        {cards?.map((card) => (
          <CardEstoque
            key={card._id}
            id={card._id}
            nome={card.nome}
            // Construção dinâmica da URL da imagem
            imagemUrl={`${apiUrl}${card.imagemUrl}`}
            categoria={card.categoria}
          />
        ))}
      </div>

      <ModalNovoCard
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}
