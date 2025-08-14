import { Plus } from 'lucide-react'
// Importando apenas o botão do react-day-picker
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DialogFinanceiro } from './componentes/modal-financeiro'
import { Button } from '@/components/ui/button'

export default function FuncionarioHoras() {
  // Função para adicionar item
  const addItem = () => {
    console.log('Novo orçamento adicionado')
  }

  return (
    <div>
      <div>
        <div>
          <h1 className="text-xl">Controle - Mão de Obra</h1>
          <p>
            Tenha um registro de controle de pagamento dos dias que seus funcionários
            trabalharam
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="mt-4"
            >
              Adicionar <Plus size={16} />
            </Button>
          </DialogTrigger>
          <DialogFinanceiro onAdd={addItem} />
        </Dialog>
      </div>

      {/* Resto do conteúdo */}
      <div className="rounded border mt-6">
        <p>Mais conteúdo relacionado...</p>
      </div>
    </div>
  )
}
