import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' // ✅ Removido NavLink
import { Helmet } from 'react-helmet-async'
import { getOrcamento } from '@/api/Orcamento'
import { Download } from 'lucide-react' // ✅ Removido Edit
import { PDFDownloadLink } from '@react-pdf/renderer'
import { OrcamentoPDF } from '@/components/pdf/OrcamentoPDF'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export function PrevisualizacaoOrcamentoDeMateriais() {
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

  const renderDadoPsiInfo = (label: string, value?: string) => (
    <p>
      <strong>{label}:</strong> {value || '-'}
    </p>
  )

  return (
    <>
      <Helmet title={`Pré-Visualização Orçamento ${orcamento._id}`} />

      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground mb-4">
        <h1 className="text-sm font-bold mb-2">Pré-Visualização: #{orcamento._id}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-3 rounded bg-muted">
            <h2 className="font-semibold text-sm mb-2">Cliente</h2>
            {renderDadoPsiInfo('Empresa', orcamento.clienteId?.nomeEmpresa)}
            {renderDadoPsiInfo('Email', orcamento.clienteId?.email)}
            {renderDadoPsiInfo('Telefone', orcamento.clienteId?.telefone)}
            {renderDadoPsiInfo('CPF/CNPJ', orcamento.clienteId?.cnpj)}
            {renderDadoPsiInfo(
              'Endereço',
              `${orcamento.clienteId?.endereco}, ${orcamento.clienteId?.numeroEndereco}`
            )}
            {renderDadoPsiInfo(
              'Cidade',
              `${orcamento.clienteId?.cidade} - ${orcamento.clienteId?.estado}`
            )}
            {renderDadoPsiInfo('CEP', orcamento.clienteId?.cep)}
            {renderDadoPsiInfo('IE', orcamento.clienteId?.ie)}
          </div>

          <div className="border p-3 rounded bg-muted">
            <h2 className="font-semibold text-sm mb-2">Prestador</h2>
            {renderDadoPsiInfo('Empresa', orcamento.prestadorId?.nomeEmpresa)}
            {renderDadoPsiInfo('Email', orcamento.prestadorId?.email)}
            {renderDadoPsiInfo('Telefone', orcamento.prestadorId?.telefone)}
            {renderDadoPsiInfo('CPF/CNPJ', orcamento.prestadorId?.cnpj)}
            {renderDadoPsiInfo(
              'Endereço',
              `${orcamento.prestadorId?.endereco}, ${orcamento.prestadorId?.numeroEndereco}`
            )}
            {renderDadoPsiInfo(
              'Cidade',
              `${orcamento.prestadorId?.cidade} - ${orcamento.prestadorId?.estado}`
            )}
            {renderDadoPsiInfo('CEP', orcamento.prestadorId?.cep)}
            {renderDadoPsiInfo('IE', orcamento.prestadorId?.ie)}
          </div>
        </div>

        <div className="mt-4">
          <p>
            <strong>Data Início:</strong>{' '}
            {new Date(orcamento.dataInicio).toLocaleDateString('pt-BR')}
          </p>
          <p>
            <strong>Data Saída:</strong>{' '}
            {new Date(orcamento.dataSaida).toLocaleDateString('pt-BR')}
          </p>
          <p className="mt-2">
            <strong>Total:</strong> R${' '}
            {orcamento.itens
              ?.reduce(
                (acc: number, item: any) => acc + item.quantidade * item.precoUn,
                0
              )
              .toFixed(2)
              .replace('.', ',')}
          </p>
        </div>
      </div>

      <div className="p-4 bg-sidebar rounded-xl text-sidebar-foreground mb-4">
        <span className="text-sm font-semibold">Itens do Orçamento</span>
        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Medida</TableHead>
              <TableHead>Qtd</TableHead>
              <TableHead>Preço Unit.</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orcamento.itens?.map((item: any, idx: number) => {
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
                  <TableCell>R$ {total.toFixed(2).replace('.', ',')}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2 p-4">
        <PDFDownloadLink
          document={<OrcamentoPDF orcamento={orcamento} />}
          fileName={`orcamento-${orcamento._id}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <Button className="btn-disabled">Gerando PDF...</Button>
            ) : (
              <Button
                variant="default"
                className="btn-primary"
              >
                <Download
                  size={16}
                  className="mr-1"
                />{' '}
                Baixar PDF
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </>
  )
}
