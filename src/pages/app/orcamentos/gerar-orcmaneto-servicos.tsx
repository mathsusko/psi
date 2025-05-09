// import { Button } from '@/components/ui/button'
// import { Dialog, DialogTrigger } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table'
// import { Eye, Download, Trash, Delete, Edit, Plus } from 'lucide-react'
// import { Helmet } from 'react-helmet-async'
// import { NavLink } from 'react-router-dom'
// import { DialogAddMateriais } from './componentes/modal-gerar-orcamento-materias'
// import { Textarea } from '@/components/ui/textarea'

// export function GerarOrcamentoServicos() {
//   return (
//     <>
//       <Helmet title="Gerar Orçamentos Matariais" />
//       <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
//         <h1 className="text-sm font-bold tracking-tight">Criar Orçamento Serviços</h1>
//       </div>
//       <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
//         <span>Dados do prestador</span>
//         <div className="flex justify-between gap-4">
//           <div className="w-full">
//             <label
//               htmlFor="Nome/Razão Social"
//               className="px-1"
//             >
//               Nome/Razão Social
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="CPF"
//               className="px-1"
//             >
//               CPF
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="I.E"
//               className="px-1"
//             >
//               I.E
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//         </div>
//         <div className="flex justify-between gap-4">
//           <div className="w-full">
//             <label
//               htmlFor="Cep"
//               className="px-1"
//             >
//               CEP
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="Endereço"
//               className="px-1"
//             >
//               Endereço
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="Cidade"
//               className="px-1"
//             >
//               Cidade
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="Estado"
//               className="px-1"
//             >
//               Estado
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//         </div>
//         <div className="flex justify-between gap-4">
//           <div className="w-full">
//             <label
//               htmlFor="Cep"
//               className="px-1"
//             >
//               Site
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="Endereço"
//               className="px-1"
//             >
//               Telefone
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="Cidade"
//               className="px-1"
//             >
//               Email
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
//         <span>Dados do cliente</span>
//         <div className="flex justify-between gap-4">
//           <div className="w-full">
//             <label
//               htmlFor="Nome/Razão Social"
//               className="px-1"
//             >
//               Nome/Razão Social
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="CPF"
//               className="px-1"
//             >
//               CPF
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="I.E"
//               className="px-1"
//             >
//               I.E
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//         </div>
//         <div className="flex justify-between gap-4">
//           <div className="w-full">
//             <label
//               htmlFor="Cep"
//               className="px-1"
//             >
//               CEP
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="Endereço"
//               className="px-1"
//             >
//               Endereço
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="Cidade"
//               className="px-1"
//             >
//               Cidade
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="Estado"
//               className="px-1"
//             >
//               Estado
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//         </div>
//         <div className="flex justify-between gap-4">
//           <div className="w-full">
//             <label
//               htmlFor="Cep"
//               className="px-1"
//             >
//               Site
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="Endereço"
//               className="px-1"
//             >
//               Telefone
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="Cidade"
//               className="px-1"
//             >
//               Email
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
//         <span>Dados do Orçamento de Produto</span>
//         <div className="flex justify-between gap-4">
//           <div className="w-full">
//             <label
//               htmlFor="Nome/Razão Social"
//               className="px-1"
//             >
//               Custo
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="CPF"
//               className="px-1"
//             >
//               Data Entra. Início
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//           <div className="w-full">
//             <label
//               htmlFor="I.E"
//               className="px-1"
//             >
//               Data Saída
//             </label>
//             <Input
//               id="cst"
//               defaultValue="00000"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
//         <span>Informações sobre o serviço</span>
//         <Textarea placeholder="Escreva aqui" />
//       </div>
//       <div className="w-full flex justify-end">
//         <NavLink to="/previsualizacao-orcamento-servicos">
//           <Button className="px-12">Concluir</Button>
//         </NavLink>
//       </div>
//     </>
//   )
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

import { DadosPrestador } from './DadosPrestador'
import { DadosCliente } from './DadosCliente'
import { createOrcamento, OrcamentoDTO } from '@/api/Orcamento'

export function GerarOrcamentoServicos() {
  const navigate = useNavigate()

  const [clienteId, setClienteId] = useState('')
  const [prestadorId, setPrestadorId] = useState('')
  const [descricaoServico, setDescricaoServico] = useState('')
  const [custoBRL, setCustoBRL] = useState('R$ 0,00')
  const [custoNum, setCustoNum] = useState(0)
  const [dataInicio, setDataInicio] = useState('')
  const [dataSaida, setDataSaida] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleCustoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '')
    const cents = parseInt(onlyDigits || '0', 10)
    const value = cents / 100
    setCustoNum(value)
    setCustoBRL(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)
    )
  }

  const handleConcluir = async () => {
    if (!dataInicio || !dataSaida || !clienteId || !prestadorId) {
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
        dataSaida: new Date(dataSaida).toISOString(),
        descricaoServico
      }

      const orc = await createOrcamento(orcDto)

      navigate(`/previsualizacao-orcamento-servicos/${orc._id}`, {
        state: { orcamento: orc }
      })
    } catch (err) {
      console.error('Erro ao salvar orçamento:', err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <Helmet title="Gerar Orçamento Serviços" />

      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground">
        <Link
          to="/orcamentos-de-servicos"
          className="text-xs flex gap-2"
        >
          <MoveLeft size={12} /> Voltar
        </Link>
        <h1 className="text-sm font-bold">Criar Orçamento Serviços</h1>
      </div>

      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground">
        <DadosPrestador onSelectPrestador={setPrestadorId} />
        <Separator className="mt-8 mb-4" />
        <DadosCliente onSelectCliente={setClienteId} />
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

      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground">
        <label
          htmlFor="descricaoServico"
          className="text-xs mb-1 block"
        >
          Descrição do Serviço
        </label>
        <Textarea
          id="descricaoServico"
          placeholder="Descreva o serviço a ser realizado..."
          rows={5}
          value={descricaoServico}
          onChange={(e) => setDescricaoServico(e.target.value)}
        />
      </div>

      <div className="flex justify-end p-4">
        <Button
          onClick={handleConcluir}
          disabled={isSaving || !dataInicio || !dataSaida || !clienteId || !prestadorId}
        >
          {isSaving ? 'Salvando...' : 'Concluir'}
        </Button>
      </div>
    </>
  )
}
