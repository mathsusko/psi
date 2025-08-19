import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink, useSearchParams } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Trash2, Download, Plus } from 'lucide-react'

import { deleteOrcamento, getAllOrcamentos, getOrcamento } from '@/api/Orcamento'

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
import { OrcamentoPDF } from '@/components/pdf/OrcamentoPDF'

export function OrcamentoDeMateriaisLista() {
  const [orcamentos, setOrcamentos] = useState<any[]>([])
  const [selectedOrcamento, setSelectedOrcamento] = useState<any | null>(null)
  const [loadingOrcamentoId, setLoadingOrcamentoId] = useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const clienteId = searchParams.get('clienteId')

  useEffect(() => {
    async function fetchOrcamentos() {
      try {
        const params = clienteId ? { clienteId } : {}
        const data = await getAllOrcamentos(params)
        setOrcamentos(data)
      } catch (err) {
        console.error('Erro ao buscar orçamentos:', err)
      }
    }

    fetchOrcamentos()
  }, [clienteId])

  const handleDownload = async (id: string) => {
    try {
      setLoadingOrcamentoId(id)
      const orcamentoCompleto = await getOrcamento(id)
      setSelectedOrcamento(orcamentoCompleto)
      setLoadingOrcamentoId(null)
    } catch (err) {
      console.error('Erro ao carregar orçamento completo:', err)
      setLoadingOrcamentoId(null)
    }
  }

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este orçamento?')
    if (!confirm) return

    try {
      await deleteOrcamento(id)
      setOrcamentos((prev) => prev.filter((orc) => orc._id !== id))
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error)
      alert('Erro ao excluir. Tente novamente.')
    }
  } 

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(dateStr))
  }

  const formatDocumento = (valor: string) => {
    const doc = valor.replace(/\D/g, '')

    if (doc.length === 14) {
      return doc.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5') // CNPJ
    }

    if (doc.length === 11) {
      return doc.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4') // CPF
    }

    return valor
  }

  return (
    <>
      <Helmet title="Orçamentos" />
                                                                                                                 
      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Orçamentos de materiais</h1>
        <NavLink to="/gerar-orcamento-materiais">
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
            placeholder="Nome da filial"
            disabled
          />
        </form>

        <Table className="border rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Data de criação</TableHead>
              <TableHead className="text-muted-foreground">Filial</TableHead>
              <TableHead className="text-muted-foreground">Custo</TableHead>
              <TableHead className="text-muted-foreground text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orcamentos.map((orcamento) => (
              <TableRow key={orcamento._id}>
                <TableCell>{formatDate(orcamento.createdAt)}</TableCell>
                <TableCell>
                  {orcamento.clienteId?.nomeEmpresa ?? 'Sem nome'} <br />
                  <span className="text-xs text-muted-foreground">
                    {orcamento.clienteId?.cnpjCpf
                      ? formatDocumento(orcamento.clienteId.cnpjCpf)
                      : 'Sem CNPJ'}
                  </span>
                </TableCell>
                <TableCell>
                  R$ {(orcamento.custo ?? 0).toFixed(2).replace('.', ',')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleDownload(orcamento._id)}
                      disabled={loadingOrcamentoId === orcamento._id}
                      className="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      {loadingOrcamentoId === orcamento._id ? (
                        'Carregando...'
                      ) : (
                        <Download size={20} />
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleDelete(orcamento._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Excluir orçamento"
                    >
                      <Trash2 size={20} />
                    </button>

                    {selectedOrcamento?._id === orcamento._id && (
                      <PDFDownloadLink
                        document={<OrcamentoPDF orcamento={selectedOrcamento} />}
                        fileName={`orcamento-${orcamento._id}.pdf`}
                      >
                        {({ loading }) =>
                          loading ? (
                            <span className="text-xs">Gerando PDF...</span>
                          ) : (
                            <span className="text-xs text-green-600 underline cursor-pointer">
                              Baixar PDF
                            </span>
                          )
                        }
                      </PDFDownloadLink>
                    )}                    
                  </div>
                </TableCell>
              </TableRow>
            ))}             
          </TableBody>
        </Table>
      </div>
    </>               
  )
}
