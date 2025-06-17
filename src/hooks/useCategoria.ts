import { useState, useEffect } from 'react'
import { useCardsEstoque } from '@/hooks/useCardsEstoque'
import axios from 'axios'

interface MaterialData {
  codigo: string
  materialName: string
  medida: string
  precoUn: string
  precoTotal: string
  imagem: string
  id?: string
  nome?: string
}

interface CardData {
  _id: string
  nome: string
  categoria: string
  imagemUrl?: string
}

export function useCategoria() {
  const [selectedCategoria, setSelectedCategoria] = useState<string>('')
  const [materialData, setMaterialData] = useState<MaterialData>({
    codigo: '',
    materialName: '',
    medida: '',
    precoUn: '',
    precoTotal: '',
    imagem: ''
  })
  const [filteredCards, setFilteredCards] = useState<CardData[]>([])
  const [medidas, setMedidas] = useState<string[]>([])
  const [loadingMedidas, setLoadingMedidas] = useState(false)

  const { cards } = useCardsEstoque()

  useEffect(() => {
    if (selectedCategoria && cards) {
      const filtered = cards.filter(
        (card: CardData) => card.categoria === selectedCategoria
      )
      setFilteredCards(filtered)
    }
  }, [selectedCategoria, cards])

  const fetchMedidas = async (cardId: string) => {
    setLoadingMedidas(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cards/${cardId}/itens`
      )
      const medidas = response.data.map((item: { medida: string }) => item.medida)
      setMedidas(medidas)
    } catch (error) {
      console.error('Erro ao carregar medidas:', error)
    } finally {
      setLoadingMedidas(false)
    }
  }

  const handleCategoriaChange = (categoria: string) => {
    setSelectedCategoria(categoria)

    setMaterialData((prev) => ({
      ...prev,
      medida: categoria === 'Material por Un.' ? '' : prev.medida,
      precoUn: categoria === 'Material por Un.' ? '' : prev.precoUn,
      precoTotal: categoria === 'Material por Un.' ? '' : prev.precoTotal,
      imagem:
        categoria === 'Material por Un.'
          ? '/images/unidade.jpg'
          : categoria === 'Material por Kg'
            ? '/images/kg.jpg'
            : '/images/metro.jpg'
    }))

    if (categoria === 'Material por Kg' || categoria === 'Material por Metros') {
      const selectedCard = cards.find((card: CardData) => card.categoria === categoria)
      if (selectedCard) {
        fetchMedidas(selectedCard._id)
      }
    }
  }

  const handleMaterialChange = (card: CardData) => {
    setMaterialData((prev) => ({
      ...prev,
      id: card._id,
      nome: card.nome,
      imagem: card.imagemUrl || ''
    }))
    fetchMedidas(card._id)
  }

  return {
    selectedCategoria,
    setSelectedCategoria,
    materialData,
    setMaterialData,
    filteredCards,
    medidas,
    loadingMedidas,
    handleCategoriaChange,
    handleMaterialChange,
    fetchMedidas
  }
}
