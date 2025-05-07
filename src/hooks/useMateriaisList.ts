// src/hooks/useMateriaisList.ts
import { useState, useCallback } from 'react'

export interface MaterialItem {
  id: string
  nome: string
  imagem: string
  medida: string
  quantidade: number
  precoUn: number
}

export function useMateriaisList() {
  const [itens, setItens] = useState<MaterialItem[]>([])

  const addItem = useCallback((item: MaterialItem) => {
    setItens((prev) => [...prev, item])
  }, [])

  const removeItem = useCallback((index: number) => {
    setItens((prev) => prev.filter((_, i) => i !== index))
  }, [])

  return { itens, addItem, removeItem }
}
