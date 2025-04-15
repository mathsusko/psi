import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { DropdownModal } from './button-dropdown-modal'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

export function DialogAddMateriais() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar Item</DialogTitle>
        <DialogDescription>
          Adicione um item a sua lista orçamentaria, escolha entre os três tipo de produto
          de seu estoque.
        </DialogDescription>
      </DialogHeader>
      <form className="grid gap-4 py-4">
        <DropdownModal />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="codigo">Material</label>
            <Input
              id="codigo"
              placeholder="Desabilitar"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="descricao">Especificação</label>
            <Input
              id="descricao"
              placeholder='Ex: 6"'
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="medida">Qtd. Un.</label>
            <Input
              id="medida"
              placeholder="10"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ncm">Preço Un.</label>
            <Input
              id="ncm"
              placeholder="R$ 10,00"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cod-fabrica">Preço total</label>
            <Input
              id="cod-fabrica"
              placeholder="Trazer dados automaticamente"
            />
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="codigo">Material</label>
            <Input
              id="codigo"
              placeholder="Desabilitar"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="descricao">Especificação</label>
            <Input
              id="descricao"
              placeholder='Ex: 6"'
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="medida">Qtd. Kg</label>
            <Input
              id="medida"
              placeholder="10"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ncm">Preço Kg</label>
            <Input
              id="ncm"
              placeholder="R$ 10,00"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cod-fabrica">Preço total</label>
            <Input
              id="cod-fabrica"
              placeholder="Trazer dados automaticamente"
            />
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="codigo">Material</label>
            <Input
              id="codigo"
              placeholder="Desabilitar"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="descricao">Especificação</label>
            <Input
              id="descricao"
              placeholder='Ex: 6"'
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="medida">Qtd. Metros</label>
            <Input
              id="medida"
              placeholder="10"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ncm">Preço Metros</label>
            <Input
              id="ncm"
              placeholder="R$ 10,00"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cod-fabrica">Preço total</label>
            <Input
              id="cod-fabrica"
              placeholder="Trazer dados automaticamente"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">Adicionar</Button>
        </div>
      </form>
    </DialogContent>
  )
}
