// src/pages/app/estoque/ItensDoCardPage.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useItensDoCard } from '@/hooks/useItensDoCard'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export default function ItensDoCardPage() {
  const { id } = useParams() // Pega o ID do card na URL
  const navigate = useNavigate()
  const { data: itens, isLoading, isError } = useItensDoCard(id!)

  if (isError) return <div>Erro ao carregar os itens.</div>
  if (isLoading) return <div>Carregando...</div>

  console.log('Itens recebidos no frontend:', itens) // Verificando os itens no frontend

  return (
    <div className="p-6 space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          {itens?.[0]?.cardNome ?? 'Itens do Card'}
        </h1>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/estoque')}>
            Voltar
          </Button>

          <Dialog>
            <DialogContent>
              <p className="text-sm text-foreground">Formulário para cadastrar novo item</p>
            </DialogContent>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              + Adicionar Linha à tabela
            </Button>
          </Dialog>
        </div>
      </div>

      {/* Tabela de Itens */}
      <div className="rounded-xl border bg-background shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Medida</TableHead>
              <TableHead>NCM/SH</TableHead>
              <TableHead>Cód. Fábrica</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço Un.</TableHead>
              <TableHead>Custo Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {itens?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.descricao}</TableCell>
                <TableCell>{item.medida}</TableCell>
                <TableCell>{item.ncm}</TableCell>
                <TableCell>{item.codigoFabrica}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell>R$ {item.precoUnitario?.toFixed(2)}</TableCell>
                <TableCell>R$ {item.custoTotal?.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
