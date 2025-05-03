import { useState, useEffect } from 'react'
import { useCardsEstoque } from '@/hooks/useCardsEstoque'

interface MaterialData {
  codigo: string
  descricao: string
  medida: string
  precoUn: string
  precoTotal: string
  imagem: string
}

export function useCategoria() {
  const [selectedCategoria, setSelectedCategoria] = useState<string>('')
  const [materialData, setMaterialData] = useState<MaterialData>({
    codigo: '',
    descricao: '',
    medida: '',
    precoUn: '',
    precoTotal: '',
    imagem: ''
  })

  const { cards } = useCardsEstoque() // Hook para pegar os cards
  const [filteredCards, setFilteredCards] = useState<any[]>([])

  // Filtrando os cards conforme a categoria selecionada
  useEffect(() => {
    if (selectedCategoria) {
      const filtered = cards.filter((card) => card.categoria === selectedCategoria)
      setFilteredCards(filtered)
    }
  }, [selectedCategoria, cards])

  // Função para atualizar a categoria selecionada
  const handleCategoriaChange = (categoria: string) => {
    setSelectedCategoria(categoria)

    // Limpar ou atualizar os campos de acordo com a categoria
    setMaterialData({
      ...materialData,
      medida: categoria === 'Material por Un.' ? '' : materialData.medida,
      precoUn: categoria === 'Material por Un.' ? '' : materialData.precoUn,
      precoTotal: categoria === 'Material por Un.' ? '' : materialData.precoTotal,
      imagem:
        categoria === 'Material por Un.'
          ? '/images/unidade.jpg'
          : categoria === 'Material por Kg'
            ? '/images/kg.jpg'
            : '/images/metro.jpg' // Exemplo de imagens para cada categoria
    })
  }

  // Função para atualizar os dados do material selecionado
  const handleMaterialChange = (card: any) => {
    setMaterialData({
      ...materialData,
      id: card._id,
      nome: card.nome,
      imagem: card.imagemUrl // Atualiza a imagem com a URL do card
    })
  }

  return {
    selectedCategoria,
    setSelectedCategoria,
    materialData,
    setMaterialData,
    filteredCards,
    handleCategoriaChange,
    handleMaterialChange
  }
}
