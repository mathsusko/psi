import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useOrcamentoCliente } from '@/hooks/useOrcamentosCliente'

const Orcamentos = () => {
  const [searchParams] = useSearchParams()
  const clienteId = searchParams.get('clienteId') || ''

  const { orcamentosMateriais, orcamentosServicos, loading, error } =
    useOrcamentoCliente(clienteId)

  const handleDownload = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank') // Funcionalidade de download do PDF
  }

  if (loading) {
    return <div>Carregando...</div> // Exibição enquanto carrega os dados
  }

  if (error) {
    return <div>{error}</div> // Exibição de erro
  }

  return (
    <div>
      <h2>Orçamentos do Cliente</h2>

      {/* Tabela de Orçamentos de Materiais */}
      <h3>Orçamentos de Materiais</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Orçamento</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>PDF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orcamentosMateriais.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>Nenhum orçamento de materiais encontrado</TableCell>
            </TableRow>
          ) : (
            orcamentosMateriais.map((orcamento) => (
              <TableRow key={orcamento._id}>
                <TableCell>{orcamento.nome}</TableCell>
                <TableCell>
                  {new Date(orcamento.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDownload(orcamento.pdfUrl)}>
                    Baixar PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Tabela de Orçamentos de Serviços */}
      <h3>Orçamentos de Serviços</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Orçamento</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>PDF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orcamentosServicos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>Nenhum orçamento de serviços encontrado</TableCell>
            </TableRow>
          ) : (
            orcamentosServicos.map((orcamento) => (
              <TableRow key={orcamento._id}>
                <TableCell>{orcamento.nome}</TableCell>
                <TableCell>
                  {new Date(orcamento.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDownload(orcamento.pdfUrl)}>
                    Baixar PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Orcamentos
