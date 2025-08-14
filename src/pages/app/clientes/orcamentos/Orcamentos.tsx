// src/pages/app/clientes/orcamentos/Orcamentos.tsx

import React, { useState, useEffect } from 'react'
import { ClientesService } from '@/api/clientes' // Aqui você pode fazer a requisição para pegar os orçamentos

const Orcamentos = () => {
  const [orcamentos, setOrcamentos] = useState<any[]>([])

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const response = await ClientesService.getOrcamentos() // Supondo que o serviço seja esse
        setOrcamentos(response.data)
      } catch (error) {
        console.error('Erro ao carregar orçamentos', error)
      }
    }

    fetchOrcamentos()
  }, [])

  const handleDownload = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank') // Funcionalidade de download do PDF
  }

  return (
    <div>
      <h2>Orçamentos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome do Orçamento</th>
            <th>Data de Criação</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {orcamentos.map((orcamento) => (
            <tr key={orcamento.id}>
              <td>{orcamento.nome}</td>
              <td>{new Date(orcamento.dataCriacao).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDownload(orcamento.pdfUrl)}>
                  Baixar PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orcamentos
