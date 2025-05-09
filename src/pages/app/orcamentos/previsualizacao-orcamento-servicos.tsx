import { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Download, X } from 'lucide-react' // ✅ Edit removido
import { getOrcamento } from '@/api/Orcamento'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { OrcamentoServicoPDF } from '@/components/pdf/OrcamentoServicoPDF'

export function PrevisualizacaoOrcamentoDeServicos() {
  const { id } = useParams()
  const [orcamento, setOrcamento] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      try {
        const data = await getOrcamento(id)
        setOrcamento(data)
      } catch (err) {
        console.error('Erro ao buscar orçamento:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading || !orcamento) return <p className="p-4">Carregando...</p>

  return (
    <>
      <Helmet title="Orçamentos" />

      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">
          Pré-visualização orçamento de serviços
        </h1>
      </div>

      <div className="flex flex-col gap-4 p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        {/* Prestador */}
        <div className="w-full flex flex-col gap-4 rounded-xl border p-4">
          <span>Informações do emitente</span>
          <div className="flex gap-4">
            <div className="w-full flex flex-col items-end space-y-2.5 text-sm">
              <p>Nome/Razão Social</p>
              <p>CPF/CNPJ</p>
              <p>Endereço</p>
              <p>Cidade</p>
              <p>Estado</p>
              <p>CEP</p>
              <p>Telefone</p>
              <p>E-mail</p>
            </div>
            <div className="w-full flex flex-col space-y-2.5 text-sm">
              <p>{orcamento.prestadorId?.nomeEmpresa}</p>
              <p>{orcamento.prestadorId?.cnpj}</p>
              <p>
                {orcamento.prestadorId?.endereco}, {orcamento.prestadorId?.numeroEndereco}
              </p>
              <p>{orcamento.prestadorId?.cidade}</p>
              <p>{orcamento.prestadorId?.estado}</p>
              <p>{orcamento.prestadorId?.cep}</p>
              <p>{orcamento.prestadorId?.telefone}</p>
              <p>{orcamento.prestadorId?.email}</p>
            </div>
          </div>
        </div>

        {/* Cliente */}
        <div className="w-full flex flex-col gap-4 rounded-xl border p-4">
          <span>Informações do cliente</span>
          <div className="flex gap-4">
            <div className="w-full flex flex-col items-end space-y-2.5 text-sm">
              <p>Nome/Razão Social</p>
              <p>CPF/CNPJ</p>
              <p>Endereço</p>
              <p>Cidade</p>
              <p>Estado</p>
              <p>CEP</p>
              <p>Telefone</p>
              <p>E-mail</p>
            </div>
            <div className="w-full flex flex-col space-y-2.5 text-sm">
              <p>{orcamento.clienteId?.nomeEmpresa}</p>
              <p>{orcamento.clienteId?.cnpj}</p>
              <p>
                {orcamento.clienteId?.endereco}, {orcamento.clienteId?.numeroEndereco}
              </p>
              <p>{orcamento.clienteId?.cidade}</p>
              <p>{orcamento.clienteId?.estado}</p>
              <p>{orcamento.clienteId?.cep}</p>
              <p>{orcamento.clienteId?.telefone}</p>
              <p>{orcamento.clienteId?.email}</p>
            </div>
          </div>
        </div>

        {/* Dados do orçamento */}
        <div className="w-full flex flex-col gap-4 rounded-xl border p-4">
          <span>Dados do orçamento</span>
          <div className="flex gap-4">
            <div className="w-full flex flex-col items-end space-y-2.5 text-sm">
              <p>Custo</p>
              <p>Data Entrada (Início)</p>
              <p>Data Saída</p>
            </div>
            <div className="w-full flex flex-col space-y-2.5 text-sm">
              <p>R$ {(orcamento.custo ?? 0).toFixed(2).replace('.', ',')}</p>
              <p>{new Date(orcamento.dataInicio).toLocaleDateString('pt-BR')}</p>
              <p>{new Date(orcamento.dataSaida).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </div>

        {/* Descrição do serviço */}
        <div className="w-full flex flex-col gap-2 rounded-xl border p-4">
          <span>Descrição do Serviço</span>
          <Textarea
            disabled
            value={orcamento.descricaoServico || '---'}
            className="resize-none text-sm"
          />
        </div>
      </div>

      {/* Ações */}
      <div className="w-full flex justify-between px-4 pb-4">
        <NavLink to="/orcamentos-de-servicos">
          <Button
            variant="outline"
            className="px-12"
          >
            Cancelar <X />
          </Button>
        </NavLink>

        <PDFDownloadLink
          document={<OrcamentoServicoPDF orcamento={orcamento} />}
          fileName={`orcamento-servico-${orcamento._id}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <Button className="px-12 btn-disabled">Gerando PDF...</Button>
            ) : (
              <Button className="px-12">
                Gerar PDF <Download />
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </>
  )
}
