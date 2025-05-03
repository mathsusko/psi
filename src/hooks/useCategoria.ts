import { useState, useEffect } from 'react'
import { useCardsEstoque } from '@/hooks/useCardsEstoque'
import axios from 'axios' // Importar axios para fazer a requisição à API

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
  const [filteredCards, setFilteredCards] = useState<any[]>([])
  const [medidas, setMedidas] = useState<string[]>([]) // Estado para armazenar as medidas
  const [loadingMedidas, setLoadingMedidas] = useState(false) // Estado para controlar o carregamento das medidas

  const { cards } = useCardsEstoque() // Hook para pegar os cards

  // Filtrando os cards conforme a categoria selecionada
  useEffect(() => {
    if (selectedCategoria) {
      const filtered = cards.filter((card) => card.categoria === selectedCategoria)
      setFilteredCards(filtered)
    }
  }, [selectedCategoria, cards])

  // Função para buscar as medidas na API
  const fetchMedidas = async (cardId: string) => {
    setLoadingMedidas(true)
    try {
      const response = await axios.get(`http://localhost:3333/api/cards/${cardId}/itens`)
      const medidas = response.data.map((item: any) => item.medida) // Assume que a API retorna os itens com a propriedade "medida"
      setMedidas(medidas)
    } catch (error) {
      console.error('Erro ao carregar medidas:', error)
    } finally {
      setLoadingMedidas(false)
    }
  }

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

    // Se a categoria selecionada for válida, buscar as medidas do card
    if (categoria === 'Material por Kg' || categoria === 'Material por Metros') {
      const selectedCard = filteredCards.find((card) => card.categoria === categoria)
      if (selectedCard) {
        fetchMedidas(selectedCard._id)
      }
    }
  }

  // Função para atualizar os dados do material selecionado
  const handleMaterialChange = (card: any) => {
    setMaterialData({
      ...materialData,
      id: card._id,
      nome: card.nome,
      imagem: card.imagemUrl // Atualiza a imagem com a URL do card
    })
    // Após selecionar um material, buscar as medidas
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
    handleMaterialChange
  }
}
