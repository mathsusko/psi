import { useState, useEffect } from 'react'
import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import { useCategoria } from '@/hooks/useCategoria' // Importando o hook
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

export function DialogAddMateriais() {
  const {
    selectedCategoria,
    materialData,
    filteredCards,
    medidas,
    loadingMedidas,
    handleCategoriaChange,
    handleMaterialChange,
    fetchMedidas
  } = useCategoria()

  const [materialDataState, setMaterialData] = useState(materialData)

  // Função para renderizar os campos com base na categoria selecionada
  const renderFieldsByCategory = () => {
    return (
      <div>
        <div className="flex justify-between gap-2 w-full mb-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="imagem"
            >
              Imagem
            </label>
            {materialDataState.imagem ? (
              <img
                src={`http://localhost:3333${materialDataState.imagem}`}
                alt={materialDataState.nome || 'Imagem do material'}
                className="w-[227px] h-[227px] object-contain border border-sidebar rounded-sm"
              />
            ) : (
              <Skeleton
                className="w-[227px] h-[227px] bg-gray-300 rounded-sm"
                alt="Carregando imagem..."
              />
            )}
          </div>
          <div className="space-y-2 w-[227px]">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="material"
            >
              Material
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-between w-full items-center p-2 border rounded-md">
                {materialDataState.nome || 'Escolha um material'}
                <ChevronDown size="16" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="p-2 border rounded-md bg-sidebar"
              >
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <DropdownMenuItem
                      key={card._id}
                      className="p-2 rounded-md"
                      onClick={() => {
                        setMaterialData({
                          ...materialDataState,
                          nome: card.nome,
                          imagem: card.imagemUrl,
                          id: card._id // Atualiza o ID para buscar as medidas
                        })
                        // Após selecionar o material, carregar as medidas
                        fetchMedidas(card._id)
                      }}
                    >
                      <span>{card.nome}</span>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem
                    disabled
                    className="p-2 rounded-md"
                  >
                    Nenhum material disponível
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Dropdown de Medidas */}
        <div className="space-y-2 w-full mb-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="medida"
          >
            Medida
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between w-full items-center p-2 border rounded-md">
              {materialDataState.medida || 'Escolha uma medida'} <ChevronDown size="16" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="p-2 border rounded-md bg-sidebar"
            >
              {loadingMedidas ? (
                <DropdownMenuItem
                  disabled
                  className="p-2 rounded-md"
                >
                  Carregando medidas...
                </DropdownMenuItem>
              ) : medidas.length > 0 ? (
                medidas.map((medida, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="p-2 rounded-md"
                    onClick={() => {
                      // Atualiza a medida selecionada no estado de materialData
                      setMaterialData({
                        ...materialDataState,
                        medida
                      })
                    }}
                  >
                    {medida}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem
                  disabled
                  className="p-2 rounded-md"
                >
                  Nenhuma medida disponível
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Campos de Quantidade e Preço */}
        <div className="space-y-2 w-full mb-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="quantidade"
          >
            Quantidade
          </label>
          <Input
            id="quantidade"
            value={materialDataState.quantidade}
            onChange={(e) =>
              setMaterialData({
                ...materialDataState,
                quantidade: e.target.value
              })
            }
            placeholder="10"
          />
        </div>

        <div className="space-y-2 w-full mb-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="preco"
          >
            Preço Unitário
          </label>
          <Input
            id="preco"
            value={materialDataState.precoUn}
            onChange={(e) =>
              setMaterialData({
                ...materialDataState,
                precoUn: e.target.value
              })
            }
            placeholder="R$ 10,00"
          />
        </div>

        {/* Cálculo automático de Preço Total */}
        <div className="space-y-2 w-full mb-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="precoTotal"
          >
            Preço Total
          </label>
          <Input
            id="precoTotal"
            value={materialDataState.precoTotal}
            disabled
            placeholder={`R$ ${(
              Number(materialDataState.precoUn) * Number(materialDataState.quantidade)
            ).toFixed(2)}`} // Calculando o preço total
          />
        </div>
      </div>
    )
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar Item</DialogTitle>
        <DialogDescription>
          Adicione um item à sua lista orçamentária, escolha entre os três tipos de
          produto de seu estoque.
        </DialogDescription>
      </DialogHeader>

      <form className="grid gap-4 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-between w-[200px] items-center p-2 border rounded-md">
            {selectedCategoria ? selectedCategoria : 'Escolha uma categoria'}
            <ChevronDown size="16" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="p-2 border rounded-md bg-sidebar"
          >
            <DropdownMenuItem
              className="p-2 rounded-md"
              onClick={() => handleCategoriaChange('Un')}
            >
              Material por Un.
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-2 rounded-md"
              onClick={() => handleCategoriaChange('Kg')}
            >
              Material por Kg
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-2 rounded-md"
              onClick={() => handleCategoriaChange('Metros')}
            >
              Material por Metros
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator className="bg-sidebar border-b" />

        <div className="flex flex-col gap-2">{renderFieldsByCategory()}</div>

        <div className="flex justify-end pt-4">
          <Button type="submit">Adicionar</Button>
        </div>
      </form>
    </DialogContent>
  )
}
