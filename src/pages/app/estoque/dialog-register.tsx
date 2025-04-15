import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export function DialogRegister() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar Item</DialogTitle>
        <DialogDescription>Aqui você poderá adicionar item á categória</DialogDescription>
      </DialogHeader>
      <form className="grid gap-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="codigo">Código</label>
            <Input
              id="codigo"
              placeholder="Ex: 01"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="descricao">Descrição</label>
            <Input
              id="descricao"
              placeholder="Ex: Cotovelo Fe."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="medida">Medida</label>
            <Input
              id="medida"
              placeholder='Ex: 6"'
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ncm">NCM/SH</label>
            <Input
              id="ncm"
              placeholder="Ex: 6000"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cod-fabrica">Cód. Fábrica</label>
            <Input
              id="cod-fabrica"
              placeholder="Ex: 5006"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="quantidade">Quantidade</label>
            <Input
              id="quantidade"
              type="number"
              placeholder="Ex: 12"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="preco">Preço Unitário</label>
            <Input
              id="preco"
              type="text"
              placeholder="Ex: 10,00"
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
