import { useEffect, useState, useRef } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getOrcamento } from '@/api/Orcamento'
import { Button } from '@/components/ui/button'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Download, Edit } from 'lucide-react'

// Ajuste o caminho da imagem se estiver em public ou assets
import logo from '@/assets/logo.png'
import { Separator } from '@/components/ui/separator'

export function PrevisualizacaoOrcamentoDeMateriais() {
  const { id } = useParams()
  const [orcamento, setOrcamento] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOrcamento(id!)
        setOrcamento(data)
      } catch (err) {
        console.error('Erro ao buscar orçamento:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleExportPDF = async () => {
    if (!printRef.current) return
    const canvas = await html2canvas(printRef.current, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const width = pdf.internal.pageSize.getWidth()
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save(`orcamento-${orcamento._id}.pdf`)
  }

  if (loading || !orcamento) return <p className="p-4">Carregando...</p>

  return (
    <>
      <Helmet title={`Pré-Visualização Orçamento ${orcamento._id}`} />

      {/* Cabeçalho da tela */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold">Pré-Visualização: #{orcamento._id}</h1>
      </div>

      {/* Área A4 para exportação */}
      <div
        ref={printRef}
        className="bg-white text-black p-12 shadow border mt-6"
        style={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}
      >
        {/* Logo e título */}
        <div className="flex gap-12 items-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-auto"
          />
          <div className="">
            <h3 className="font-semibold text-2xl mb-2">
              {orcamento.prestadorId?.nomeEmpresa}
            </h3>
            <div className="flex gap-4">
              <div className="text-sm">
                <p>
                  <strong>CNPJ:</strong> {orcamento.prestadorId?.cnpj}
                </p>
                <p>
                  <strong>I.E:</strong> {orcamento.prestadorId?.ie}
                </p>
              </div>

              <div className="text-xs">
                <p>
                  <strong>E-mail:</strong> {orcamento.prestadorId?.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {orcamento.prestadorId?.telefone}
                </p>
              </div>
              <div className="text-xs">
                <p>
                  {orcamento.prestadorId?.endereco},{' '}
                  {orcamento.prestadorId?.numeroEndereco}
                </p>
                <p>
                  {orcamento.prestadorId?.cidade} - {orcamento.prestadorId?.estado}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        {/* Emitente e Cliente */}
        <div className="flex my-6">
          {/* Informações do Orçamento */}
          <div className="mb-2 border-r-1 pr-4">
            <h3 className="font-semibold mb-2 text-sm">Detalhes do Orçamento</h3>
            <div className="text-xs">
              <p>
                <strong>Data Início:</strong>{' '}
                {new Date(orcamento.dataInicio).toLocaleDateString('pt-BR')}
              </p>
              <p>
                <strong>Data Saída:</strong>{' '}
                {new Date(orcamento.dataSaida).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          <div className="pl-4">
            <h3 className="font-semibold mb-2 text-sm">Dados do Cliente</h3>
            <div className="flex gap-6">
              <div className="text-xs">
                <p>
                  <strong>CNPJ:</strong> {orcamento.clienteId?.cnpj}
                </p>
                <p>
                  <strong>I.E:</strong> {orcamento.clienteId?.ie}
                </p>
                <p>
                  <strong>Telefone:</strong> {orcamento.clienteId?.telefone}
                </p>
              </div>
              <div className="text-xs">
                <p>
                  <strong>E-mail:</strong> {orcamento.clienteId?.email}
                </p>
                <p>
                  <strong>Endereço:</strong> {orcamento.clienteId?.endereco},{' '}
                  {orcamento.clienteId?.numeroEndereco}
                </p>
                <p>
                  {orcamento.clienteId?.cidade} - {orcamento.clienteId?.estado}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Itens */}
        <div>
          {/* <h3 className="font-semibold mb-2 text-sm">Itens</h3> */}
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="border px-2 py-1">Imagem</th>
                <th className="border px-2 py-1">Material</th>
                <th className="border px-2 py-1">Medida</th>
                <th className="border px-2 py-1">Quantidade</th>
                <th className="border px-2 py-1">Preço Unit.</th>
                <th className="border px-2 py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {orcamento.itens?.map((item: any, i: number) => {
                const total = item.quantidade * item.precoUn
                return (
                  <tr key={i}>
                    <td className="border px-2 py-1">
                      <img
                        src={
                          item.imagem
                            ? item.imagem.startsWith('http')
                              ? item.imagem
                              : `${import.meta.env.VITE_API_URL}${item.imagem.startsWith('/uploads') ? '' : '/uploads/'}${item.imagem}`
                            : `${import.meta.env.VITE_API_URL}/fallback.png`
                        }
                        alt={item.nome}
                        className="w-16 h-16 object-contain"
                      />
                    </td>
                    <td className="border px-2 py-1">{item.nome}</td>
                    <td className="border px-2 py-1">{item.medida}</td>
                    <td className="border px-2 py-1">{item.quantidade}</td>
                    <td className="border px-2 py-1">
                      R$ {item.precoUn.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="border px-2 py-1">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* RESUMO FINAL */}
        <div className="mt-8 text-xs border border-black">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th
                  colSpan={11}
                  className="text-left px-2 py-1 border-b border-black"
                >
                  <strong>Totalizadores</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">Itens</td>
                <td className="border px-2 py-1">Quantidade</td>
                <td className="border px-2 py-1">Peso Brt kg</td>
                <td className="border px-2 py-1">ICMS R$</td>
                <td className="border px-2 py-1 font-bold">Total Itens R$</td>
                <td className="border px-2 py-1">Seguro R$</td>
                <td className="border px-2 py-1">Frete R$</td>
                <td className="border px-2 py-1">Total Subs. R$</td>
                <td className="border px-2 py-1">Total IPI R$</td>
                <td className="border px-2 py-1">Outras R$</td>
                <td className="border px-2 py-1 font-bold">Total Líquido R$</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">{orcamento.itens.length}</td>
                <td className="border px-2 py-1">
                  {orcamento.itens.reduce(
                    (acc: number, item: any) => acc + item.quantidade,
                    0
                  )}
                </td>
                <td className="border px-2 py-1">0,00</td>
                <td className="border px-2 py-1">0,00</td>
                <td className="border px-2 py-1 font-bold">
                  R$ {orcamento.custo.toFixed(2).replace('.', ',')}
                </td>
                <td className="border px-2 py-1">0,00</td>
                <td className="border px-2 py-1">0,00</td>
                <td className="border px-2 py-1">0,00</td>
                <td className="border px-2 py-1">0,00</td>
                <td className="border px-2 py-1">0,00</td>
                <td className="border px-2 py-1 font-bold">
                  R$ {orcamento.custo.toFixed(2).replace('.', ',')}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-t border-black mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th
                  colSpan={3}
                  className="text-left px-2 py-1 border-b border-black"
                >
                  <strong>Informações de Recebimento</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">Forma Pg</td>
                <td className="border px-2 py-1">Vencto</td>
                <td className="border px-2 py-1">Valor R$</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">Dinheiro</td>
                <td className="border px-2 py-1">
                  1º (0) {new Date().toLocaleDateString('pt-BR')}
                </td>
                <td className="border px-2 py-1 font-bold">
                  R$ {orcamento.custo.toFixed(2).replace('.', ',')}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-t border-black mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th
                  colSpan={5}
                  className="text-left px-2 py-1 border-b border-black"
                >
                  <strong>Aprovação / Conferência</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">Pedido: {orcamento._id.slice(-6)}</td>
                <td
                  className="border px-2 py-1"
                  colSpan={4}
                >
                  Data / Hora: ___/___/____ ____:____
                </td>
              </tr>
              <tr>
                <td className="border px-2 py-2 text-center">
                  Atendente
                  <br />
                  <br />
                  <strong>{orcamento.prestadorId?.nomeEmpresa}</strong>
                </td>
                <td className="border px-2 py-2 text-center">
                  Vendedor
                  <br />
                  <br />
                  <strong>{orcamento.prestadorId?.nomeEmpresa}</strong>
                </td>
                <td className="border px-2 py-2 text-center">
                  Cliente
                  <br />
                  <br />
                  <strong>{orcamento.clienteId?.nomeEmpresa}</strong>
                </td>
                <td className="border px-2 py-2 text-center">
                  Entregador
                  <br />
                  <br />
                  ________________________
                </td>
                <td className="border px-2 py-2 text-center">
                  Assinatura
                  <br />
                  <br />
                  ________________________
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-6 px-4">
        <NavLink to="/gerar-orcamento-materiais">
          <Button variant="outline">
            <Edit
              className="mr-2"
              size={16}
            />
            Editar
          </Button>
        </NavLink>
        <Button onClick={handleExportPDF}>
          <Download
            className="mr-2"
            size={16}
          />
          Exportar
        </Button>
      </div>
    </>
  )
}
