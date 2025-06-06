import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllOrcamentos } from '@/api/Orcamento'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { OrcamentoPDF } from '@/components/pdf/OrcamentoPDF'
import { OrcamentoServicoPDF } from '@/components/pdf/OrcamentoServicoPDF'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Download } from 'lucide-react'

export default function Orcamento() {
  const { id: filialId } = useParams()
  const [orcamentos, setOrcamentos] = useState<any[]>([])

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getAllOrcamentos({ filialId })
        setOrcamentos(data)
      } catch (err) {
        console.error('Erro ao buscar orçamentos da filial:', err)
      }
    }

    fetch()
  }, [filialId])

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(dateStr))
  }

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`
  }

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo do orçamento</TableHead>
            <TableHead>Data de geração</TableHead>
            <TableHead>Custo</TableHead>
            <TableHead className="flex justify-center items-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orcamentos.map((orcamento) => {
            const tipo = orcamento.descricaoServico ? 'Serviço' : 'Material'
            const data = formatDate(orcamento.createdAt)
            const custo = formatCurrency(orcamento.custo ?? 0)

            return (
              <TableRow key={orcamento._id}>
                <TableCell>{tipo}</TableCell>
                <TableCell>{data}</TableCell>
                <TableCell>{custo}</TableCell>
                <TableCell className="flex justify-center gap-4 items-center">
                  <PDFDownloadLink
                    document={
                      orcamento.descricaoServico ? (
                        <OrcamentoServicoPDF orcamento={orcamento} />
                      ) : (
                        <OrcamentoPDF orcamento={orcamento} />
                      )
                    }
                    fileName={`orcamento-${tipo.toLowerCase()}-${orcamento._id}.pdf`}
                  >
                    {({ loading }) =>
                      loading ? (
                        <span className="text-xs">Gerando...</span>
                      ) : (
                        <Download
                          size={16}
                          className="cursor-pointer hover:text-primary"
                          title="Baixar PDF"
                        />
                      )
                    }
                  </PDFDownloadLink>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
