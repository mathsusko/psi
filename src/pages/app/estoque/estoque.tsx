// src/pages/app/estoque/estoque.tsx
import { useState } from 'react'
import { Button } from 'react-day-picker'
import { useCardsEstoque } from '../../../hooks/useCardsEstoque'
import { CardEstoque } from './components/CardEstoque'
import { ModalNovoCard } from './components/ModalNovoCard'

export default function EstoquePage() {
  const { cards } = useCardsEstoque()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Novo Card</Button>

      <div className="grid grid-cols-4 gap-4">
        {cards?.map((card) => (
          <CardEstoque
            key={card.id}
            {...card}
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
