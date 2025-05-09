import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Download, Plus } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer'

import { getAllOrcamentos } from '@/api/Orcamento'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { OrcamentoServicoPDF } from '@/components/pdf/OrcamentoServicoPDF'

export function OrcamentoDeServicosLista() {
  const [orcamentos, setOrcamentos] = useState<any[]>([])

  useEffect(() => {
    async function fetchOrcamentos() {
      try {
        const data = await getAllOrcamentos()
        const servicos = data.filter((o) => !!o.descricaoServico)
        setOrcamentos(servicos)
      } catch (err) {
        console.error('Erro ao buscar orçamentos de serviço:', err)
      }
    }

    fetchOrcamentos()
  }, [])

  return (
    <>
      <Helmet title="Orçamentos" />

      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Orçamentos de serviços</h1>
        <NavLink to="/gerar-orcamento-servicos">
          <Button variant="outline">
            Gerar novo orçamento{' '}
            <Plus
              className="ml-2"
              size={16}
            />
          </Button>
        </NavLink>
      </div>

      <div className="flex flex-col gap-4 p-4 space-y-2.5 rounded-xl bg-sidebar text-sidebar-foreground">
        <form className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros:</span>
          <Input
            className="h-8 w-[320px]"
            placeholder="Nome do cliente"
          />
        </form>

        <Table className="border rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">ID</TableHead>
              <TableHead className="text-muted-foreground">Cliente</TableHead>
              <TableHead className="text-muted-foreground">Custo</TableHead>
              <TableHead className="text-muted-foreground text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orcamentos.map((orcamento) => (
              <TableRow key={orcamento._id}>
                <TableCell>{orcamento._id.slice(-4)}</TableCell>
                <TableCell>{orcamento.clienteId?.nomeEmpresa || '---'}</TableCell>
                <TableCell>
                  R$ {(orcamento.custo ?? 0).toFixed(2).replace('.', ',')}
                </TableCell>
                <TableCell className="flex items-center justify-center gap-4">
                  <PDFDownloadLink
                    document={<OrcamentoServicoPDF orcamento={orcamento} />}
                    fileName={`orcamento-servico-${orcamento._id}.pdf`}
                  >
                    {({ loading }) =>
                      loading ? (
                        <span className="text-xs">Gerando...</span>
                      ) : (
                        <Download
                          size={20}
                          className="cursor-pointer hover:text-primary"
                          title="Baixar PDF"
                        />
                      )
                    }
                  </PDFDownloadLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
