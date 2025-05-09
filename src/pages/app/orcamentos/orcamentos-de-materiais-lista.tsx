// import { Helmet } from 'react-helmet-async'
// import { useEffect, useState } from 'react'
// import { NavLink } from 'react-router-dom'
// import { PDFDownloadLink } from '@react-pdf/renderer'

// import { Input } from '@/components/ui/input'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table'

// import { Download, Eye, Plus } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { OrcamentoPDF } from '@/components/pdf/OrcamentoPDF'
// import { getAllOrcamentos } from '@/api/Orcamento'

// export function OrcamentoDeMateriaisLista() {
//   const [orcamentos, setOrcamentos] = useState<any[]>([])

//   useEffect(() => {
//     async function fetchOrcamentos() {
//       try {
//         const data = await getAllOrcamentos()
//         setOrcamentos(data)
//       } catch (err) {
//         console.error('Erro ao buscar orçamentos:', err)
//       }
//     }

//     fetchOrcamentos()
//   }, [])

//   return (
//     <>
//       <Helmet title="Orçamentos" />

//       <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
//         <h1 className="text-sm font-bold tracking-tight">Orçamentos de materiais</h1>
//         <NavLink to="/gerar-orcamento-materiais">
//           <Button variant="outline">
//             Gerar novo orçamento{' '}
//             <Plus
//               className="ml-2"
//               size={16}
//             />
//           </Button>
//         </NavLink>
//       </div>

//       <div className="flex flex-col gap-4 p-4 space-y-2.5 rounded-xl bg-sidebar text-sidebar-foreground">
//         <form className="flex items-center gap-2">
//           <span className="text-sm font-semibold">Filtros:</span>
//           <Input
//             className="h-8 w-[320px]"
//             placeholder="Nome do cliente"
//           />
//         </form>

//         <Table className="border rounded-md">
//           <TableHeader>
//             <TableRow>
//               <TableHead className="text-muted-foreground">ID orçamento</TableHead>
//               <TableHead className="text-muted-foreground">Nome Cliente</TableHead>
//               <TableHead className="text-muted-foreground">Custo</TableHead>
//               <TableHead className="text-muted-foreground text-center">Ações</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {orcamentos.map((orcamento) => (
//               <TableRow key={orcamento._id}>
//                 <TableCell>{orcamento._id.slice(-4)}</TableCell>
//                 <TableCell>
//                   {orcamento.clienteId?.nomeEmpresa || 'Cliente não encontrado'}
//                 </TableCell>
//                 <TableCell>
//                   R$ {(orcamento.custo ?? 0).toFixed(2).replace('.', ',')}
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center justify-center gap-4">
//                     <PDFDownloadLink
//                       document={<OrcamentoPDF orcamento={orcamento} />}
//                       fileName={`orcamento-${orcamento._id}.pdf`}
//                     >
//                       {({ loading }) =>
//                         loading ? (
//                           <span className="text-xs">Gerando...</span>
//                         ) : (
//                           <Download
//                             size={20}
//                             className="cursor-pointer hover:text-primary"
//                           />
//                         )
//                       }
//                     </PDFDownloadLink>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   )
// }

import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Download, Eye, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { OrcamentoPDF } from '@/components/pdf/OrcamentoPDF'
import { getAllOrcamentos, getOrcamento } from '@/api/Orcamento'

export function OrcamentoDeMateriaisLista() {
  const [orcamentos, setOrcamentos] = useState<any[]>([])
  const [selectedOrcamento, setSelectedOrcamento] = useState<any | null>(null)
  const [loadingOrcamentoId, setLoadingOrcamentoId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrcamentos() {
      try {
        const data = await getAllOrcamentos()
        setOrcamentos(data)
      } catch (err) {
        console.error('Erro ao buscar orçamentos:', err)
      }
    }

    fetchOrcamentos()
  }, [])

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
            placeholder="Nome do cliente"
          />
        </form>

        <Table className="border rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">ID orçamento</TableHead>
              <TableHead className="text-muted-foreground">Nome Cliente</TableHead>
              <TableHead className="text-muted-foreground">Custo</TableHead>
              <TableHead className="text-muted-foreground text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orcamentos.map((orcamento) => (
              <TableRow key={orcamento._id}>
                <TableCell>{orcamento._id.slice(-4)}</TableCell>
                <TableCell>
                  {orcamento.clienteId?.nomeEmpresa || 'Cliente não encontrado'}
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
                    {/* Exibe link de download apenas se o orçamento carregado for o atual */}
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
