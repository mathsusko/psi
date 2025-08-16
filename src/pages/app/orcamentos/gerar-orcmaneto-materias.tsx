import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { MoveLeft, Plus, Delete } from 'lucide-react'
import { DadosPrestador } from './DadosPrestador'
import { DadosCliente } from './DadosCliente' // Alterado para DadosCliente
import { DialogAddMateriais } from './componentes/modal-gerar-orcamento-materias'

import { useMateriaisList } from '@/hooks/useMateriaisList'
import { createOrcamento, OrcamentoDTO } from '@/api/Orcamento'
import { createOrcamentoItem } from '@/api/OrcamentoItem'
import { Separator } from '@/components/ui/separator'

export function GerarOrcamentoMateriais() {
  const navigate = useNavigate()

  const [clienteId, setClienteId] = useState('')
  const [prestadorId, setPrestadorId] = useState('')
  const [custoBRL, setCustoBRL] = useState('R$ 0,00')
  const [custoNum, setCustoNum] = useState(0)
  const [dataInicio, setDataInicio] = useState('')
  const [dataSaida, setDataSaida] = useState('')
  const { itens, addItem, removeItem } = useMateriaisList()
  const [isSaving, setIsSaving] = useState(false)

  // Função para calcular o custo total
  const calculateCusto = () => {
    const total = itens.reduce((acc, item) => acc + item.quantidade * item.precoUn, 0)
    setCustoNum(total)
    setCustoBRL(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(total)
    )
  }

  // UseEffect para recalcular o custo sempre que os itens mudarem
  useEffect(() => {
    calculateCusto()
  }, [itens])

  const handleConcluir = async () => {
    if (!dataInicio || !dataSaida || itens.length === 0 || !clienteId || !prestadorId) {
      console.warn('Preencha todos os campos obrigatórios.')
      return
    }

    setIsSaving(true)
    try {
      const orcDto: OrcamentoDTO = {
        prestadorId,
        clienteId,
        custo: custoNum,
        dataInicio: new Date(dataInicio).toISOString(),
        dataSaida: new Date(dataSaida).toISOString()
      }

      const orc = await createOrcamento(orcDto)

      await Promise.all(
        itens.map((item) =>
          createOrcamentoItem({
            orcamentoId: orc._id!,
            materialId: item.id,
            nome: item.nome,
            medida: item.medida,
            quantidade: item.quantidade,
            precoUn: item.precoUn,
            imagem: item.imagem
          })
        )
      )

      navigate(`/previsualizacao-orcamento-materiais/${orc._id}`, {
        state: { orcamento: orc, itens }
      })
    } catch (err) {
      console.error('Erro ao salvar orçamento completo:', err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <Helmet title="Gerar Orçamento Materiais" />

      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground">
        <Link
          to="/orcamentos-de-materiais"
          className="text-xs flex gap-2"
        >
          <MoveLeft size={12} /> Voltar
        </Link>
        <h1 className="text-sm font-bold">Criar Orçamento Materiais</h1>
      </div>

      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground">
        <DadosPrestador onSelectPrestador={(id) => setPrestadorId(id)} />
        <Separator
          className="mt-[32px]"
          orientation="horizontal"
        />
        <DadosCliente onSelectCliente={(id) => setClienteId(id)} />
      </div>

      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground flex gap-4">
        <div className="flex flex-col w-full">
          <label
            htmlFor="custo"
            className="text-xs"
          >
            Custo
          </label>
          <Input
            id="custo"
            value={custoBRL}
            onChange={(e) => {}}
            placeholder="R$ 0,00"
            disabled
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="dataInicio"
            className="text-xs"
          >
            Data Início
          </label>
          <Input
            id="dataInicio"
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="dataSaida"
            className="text-xs"
          >
            Data Saída
          </label>
          <Input
            id="dataSaida"
            type="date"
            value={dataSaida}
            onChange={(e) => setDataSaida(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground">
        <span>Lista de Produtos</span>
        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Medida</TableHead>
              <TableHead>Qtd</TableHead>
              <TableHead>Preço Unit.</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itens.map((item, idx) => {
              const total = item.quantidade * item.precoUn
              return (
                <TableRow key={idx}>
                  <TableCell>
                    <img
                      src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${item.imagem}`}
                      alt={item.nome}
                      className="w-16 h-16 object-contain border rounded-sm"
                    />
                  </TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.medida}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>R$ {item.precoUn.toFixed(2).replace('.', ',')}</TableCell>
                  <TableCell>R$ {total.toFixed(2).replace('.', ',')}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(idx)}
                    >
                      <Delete size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="mt-4"
            >
              Adicionar <Plus size={16} />
            </Button>
          </DialogTrigger>
          <DialogAddMateriais onAdd={addItem} />
        </Dialog>
      </div>

      <div className="flex justify-end p-4">
        <Button
          onClick={handleConcluir}
          disabled={
            isSaving ||
            itens.length === 0 ||
            !dataInicio ||
            !dataSaida ||
            !clienteId ||
            !prestadorId
          }
        >
          {isSaving ? 'Salvando...' : 'Concluir'}
        </Button>
      </div>
    </>
  )
}
