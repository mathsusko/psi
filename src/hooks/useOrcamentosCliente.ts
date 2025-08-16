import { useEffect, useState } from 'react'
import { listOrcamentosCliente } from '@/api/OrcamentosCliente'

export const useOrcamentoCliente = (clienteId: string) => {
  const [orcamentosMateriais, setOrcamentosMateriais] = useState<any[]>([])
  const [orcamentosServicos, setOrcamentosServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!clienteId) return

    const fetchOrcamentos = async () => {
      try {
        setLoading(true)
        // Buscando orçamentos de materiais
        const materiais = await listOrcamentosCliente({ clienteId, tipo: 'material' })
        setOrcamentosMateriais(materiais)

        // Buscando orçamentos de serviços
        const servicos = await listOrcamentosCliente({ clienteId, tipo: 'servico' })
        setOrcamentosServicos(servicos)
      } catch (err) {
        console.error('Erro ao carregar orçamentos:', err)
        setError('Erro ao carregar os orçamentos.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrcamentos()
  }, [clienteId])

  return { orcamentosMateriais, orcamentosServicos, loading, error }
}
