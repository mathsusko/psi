import { useState } from 'react'
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
import { DadosCliente } from './DadosCliente'
import { DialogAddMateriais } from './componentes/modal-gerar-orcamento-materias'

import { useMateriaisList } from '@/hooks/useMateriaisList'
import { createOrcamento, OrcamentoDTO } from '@/api/Orcamento'
import { createOrcamentoItem } from '@/api/OrcamentoItem'
import { Separator } from '@/components/ui/separator'

export function GerarOrcamentoMateriais() {
  const navigate = useNavigate()

  // Estados para IDs dinâmicos
  const [clienteId, setClienteId] = useState('')
  const [prestadorId, setPrestadorId] = useState('')

  // BRL formatter state
  const [custoBRL, setCustoBRL] = useState('R$ 0,00')
  const [custoNum, setCustoNum] = useState(0)

  // datas de início e saída
  const [dataInicio, setDataInicio] = useState('')
  const [dataSaida, setDataSaida] = useState('')

  // lista de itens
  const { itens, addItem, removeItem } = useMateriaisList()

  const [isSaving, setIsSaving] = useState(false)

  // atualiza custo em BRL e número
  const handleCustoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '')
    if (!onlyDigits) {
      setCustoBRL('R$ 0,00')
      setCustoNum(0)
      return
    }
    const cents = parseInt(onlyDigits, 10)
    const value = cents / 100
    setCustoNum(value)
    setCustoBRL(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)
    )
  }

  // cria orçamento e itens, depois redireciona
  const handleConcluir = async () => {
    if (!dataInicio || !dataSaida || itens.length === 0 || !clienteId || !prestadorId) {
      // aqui pode exibir um toast
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

      {/* cabeçalho */}
      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground">
        <Link
          to="/orcamentos-de-materiais"
          className="text-xs flex gap-2"
        >
          <MoveLeft size={12} /> Voltar
        </Link>
        <h1 className="text-sm font-bold">Criar Orçamento Materiais</h1>
      </div>

      {/* dados prestador / cliente */}
      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground">
        <DadosPrestador onSelectPrestador={(id) => setPrestadorId(id)} />
        <Separator
          className="mt-[32px]"
          orientation="horizontal"
        />
        <DadosCliente onSelectCliente={(id) => setClienteId(id)} />
      </div>

      {/* cabeçalho do orçamento (custo + datas) */}
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
            onChange={handleCustoChange}
            placeholder="R$ 0,00"
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

      {/* tabela de itens */}
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
                      src={`http://localhost:3333${item.imagem}`}
                      alt={item.nome}
                      className="w-16 h-16 object-contain border rounded-sm"
                    />
                  </TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.medida}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>R$ {item.precoUn.toFixed(2).replace('.', ',')}</TableCell>
                  <TableCell>
                    R$ {(item.quantidade * item.precoUn).toFixed(2).replace('.', ',')}
                  </TableCell>
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

      {/* concluir */}
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
  