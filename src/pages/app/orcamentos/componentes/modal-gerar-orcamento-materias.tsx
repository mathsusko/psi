import { useState } from 'react'
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
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { MaterialItem } from '@/hooks/useMateriaisList'
import { useCategoria } from '@/hooks/useCategoria'

interface DialogAddMateriaisProps {
  onAdd: (item: MaterialItem) => void
}

export function DialogAddMateriais({ onAdd }: DialogAddMateriaisProps) {
  const {
    selectedCategoria,
    materialData,
    filteredCards,
    medidas,
    loadingMedidas,
    handleCategoriaChange,
    fetchMedidas
  } = useCategoria()

  const [state, setState] = useState({
    id: materialData.id || '',
    nome: materialData.nome || '',
    imagem: materialData.imagem || '',
    medida: materialData.medida || '',
    quantidade: materialData.quantidade || '',
    precoUn: materialData.precoUn || ''
  })

  const handlePrecoUnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^\d,]/g, '')
    const p = v.split(',')
    if (p.length > 2) v = p[0] + ',' + p.slice(1).join('')
    if (p[1]?.length > 2) p[1] = p[1].slice(0, 2)
    setState((prev) => ({ ...prev, precoUn: v }))
  }

  const parseBr = (s: string) => Number(s.replace(/\./g, '').replace(/,/g, '.')) || 0

  function renderFields() {
    const qtd = Number(state.quantidade) || 0
    const unit = parseBr(state.precoUn)
    const tot = qtd * unit

    return (
      <div>
        {/* IMAGEM + MATERIAL */}
        <div className="flex justify-between gap-2 mb-4">
          <div className="space-y-2 w-[227px]">
            <label
              htmlFor="imagem"
              className="text-sm font-medium text-gray-700"
            >
              Imagem
            </label>
            {state.imagem ? (
              <img
                src={`http://localhost:3333${state.imagem}`}
                alt={state.nome || 'Imagem do material'}
                className="w-[227px] h-[227px] object-contain border rounded-sm"
              />
            ) : (
              <Skeleton className="w-[227px] h-[227px] bg-gray-300 rounded-sm" />
            )}
          </div>
          <div className="space-y-2 w-[227px]">
            <label
              htmlFor="material"
              className="text-sm font-medium text-gray-700"
            >
              Material
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-between w-full p-2 border rounded-md">
                {state.nome || 'Escolha um material'}
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="p-2 border rounded-md bg-sidebar"
              >
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <DropdownMenuItem
                      key={card._id}
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          id: card._id,
                          nome: card.nome,
                          imagem: card.imagemUrl || '' // corrigido para garantir string
                        }))
                        fetchMedidas(card._id)
                      }}
                    >
                      {card.nome}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>Nenhum material disponível</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* MEDIDA */}
        <div className="space-y-2 mb-4">
          <label
            htmlFor="medida"
            className="text-sm font-medium text-gray-700"
          >
            Medida
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between w-full p-2 border rounded-md">
              {state.medida || 'Escolha uma medida'} <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="p-2 border rounded-md bg-sidebar"
            >
              {loadingMedidas ? (
                <DropdownMenuItem disabled>Carregando medidas...</DropdownMenuItem>
              ) : medidas.length > 0 ? (
                medidas.map((m, i) => (
                  <DropdownMenuItem
                    key={i}
                    onClick={() => setState((prev) => ({ ...prev, medida: m }))}
                  >
                    {m}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>Nenhuma medida disponível</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* QUANTIDADE */}
        <div className="space-y-2 mb-4">
          <label
            htmlFor="quantidade"
            className="text-sm font-medium text-gray-700"
          >
            Quantidade
          </label>
          <Input
            id="quantidade"
            value={state.quantidade}
            onChange={(e) =>
              setState((prev) => ({ ...prev, quantidade: e.target.value }))
            }
            placeholder="10"
          />
        </div>

        {/* PREÇO UNITÁRIO */}
        <div className="space-y-2 mb-4">
          <label
            htmlFor="precoUn"
            className="text-sm font-medium text-gray-700"
          >
            Preço Unitário
          </label>
          <Input
            id="precoUn"
            value={state.precoUn}
            onChange={handlePrecoUnChange}
            placeholder="10,00"
          />
        </div>

        {/* PREÇO TOTAL */}
        <div className="space-y-2 mb-4">
          <label
            htmlFor="precoTotal"
            className="text-sm font-medium text-gray-700"
          >
            Preço Total
          </label>
          <Input
            id="precoTotal"
            disabled
            value={`R$ ${tot.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          />
        </div>

        {/* Botão Adicionar */}
        <div className="flex justify-end pt-4">
          <Button
            type="button"
            onClick={() => {
              onAdd({
                id: state.id,
                nome: state.nome,
                imagem: state.imagem || '', // força tipo string
                medida: state.medida,
                quantidade: Number(state.quantidade),
                precoUn: parseBr(state.precoUn)
              })
              setState({
                id: '',
                nome: '',
                imagem: '',
                medida: '',
                quantidade: '',
                precoUn: ''
              })
            }}
          >
            Adicionar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar Item</DialogTitle>
        <DialogDescription>Preencha os campos e clique em “Adicionar”</DialogDescription>
      </DialogHeader>
      <form className="grid gap-4 py-4">
        {/* Categoria */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-between w-[200px] p-2 border rounded-md">
            {selectedCategoria || 'Escolha uma categoria'}
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="p-2 border rounded-md bg-sidebar"
          >
            <DropdownMenuItem onClick={() => handleCategoriaChange('Un')}>
              Material por Un.
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCategoriaChange('Kg')}>
              Material por Kg
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCategoriaChange('Metros')}>
              Material por Metros
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator className="bg-sidebar border-b" />

        <div className="flex flex-col gap-2">{renderFields()}</div>
      </form>
    </DialogContent>
  )
}
