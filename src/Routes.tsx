import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import EstoquePage from './pages/app/estoque/estoque'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { NotFound } from './pages/app/404'
import { AddPecaPorKilo } from './pages/app/estoque/add-peca-por-kilo'
import { AddPecaPorMetro } from './pages/app/estoque/add-peca-por-metragem'
import { AddPecaPorQtd } from './pages/app/estoque/add-peca-por-qtd'
import { EditPecaPorQtd } from './pages/app/estoque/edit-peca-por-qtd'
import { OrcamentoDeMateriaisLista } from './pages/app/orcamentos/orcamentos-de-materiais-lista'
import { OrcamentoDeServicosLista } from './pages/app/orcamentos/orcamentos-de-servicos-lista'
import { GerarOrcamentoMateriais } from './pages/app/orcamentos/gerar-orcmaneto-materias'
import { PrevisualizacaoOrcamentoDeMateriais } from './pages/app/orcamentos/previsualizacao-orcamento-material'
import { GerarOrcamentoServicos } from './pages/app/orcamentos/gerar-orcmaneto-servicos'
import { PrevisualizacaoOrcamentoDeServicos } from './pages/app/orcamentos/previsualizacao-orcamento-servicos'
import { NotasFiscaisLista } from './pages/app/notafiscal/notas-fiscais-lista'
import { GerarNotaFiscalOne } from './pages/app/notafiscal/gerar-nota-fiscal-one'
import { GerarNotaFiscalTwo } from './pages/app/notafiscal/gerar-nota-fiscal-two'
import { GerarNotaFiscalThree } from './pages/app/notafiscal/gerar-nota-fiscal-three'
import { PreviewNotaFiscal } from './pages/app/notafiscal/preview-nota-fiscal'
import ItensDoCardPage from './pages/app/estoque/[id]'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/estoque', element: <EstoquePage /> },
      {
        path: '/app/estoque/:id',
        element: <ItensDoCardPage />
      },
      { path: '/add-peca-por-kilo', element: <AddPecaPorKilo /> },
      { path: '/add-peca-por-metro', element: <AddPecaPorMetro /> },
      { path: '/add-peca-por-qtd', element: <AddPecaPorQtd /> },
      { path: '/edit-peca-por-qtd', element: <EditPecaPorQtd /> },
      { path: '/orcamentos-de-materiais', element: <OrcamentoDeMateriaisLista /> },
      { path: '/orcamentos-de-servicos', element: <OrcamentoDeServicosLista /> },
      { path: '/gerar-orcamento-materiais', element: <GerarOrcamentoMateriais /> },
      { path: '/gerar-orcamento-servicos', element: <GerarOrcamentoServicos /> },
      {
        path: '/previsualizacao-orcamento-materiais',
        element: <PrevisualizacaoOrcamentoDeMateriais />
      },
      {
        path: '/previsualizacao-orcamento-servicos',
        element: <PrevisualizacaoOrcamentoDeServicos />
      },
      {
        path: '/notas-fiscais-lista',
        element: <NotasFiscaisLista />
      },
      {
        path: '/gerar-nota-fiscal-one',
        element: <GerarNotaFiscalOne />
      },
      {
        path: '/gerar-nota-fiscal-two',
        element: <GerarNotaFiscalTwo />
      },
      {
        path: '/gerar-nota-fiscal-three',
        element: <GerarNotaFiscalThree />
      },
      {
        path: '/preview-nota-fiscal',
        element: <PreviewNotaFiscal />
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> }
    ]
  }
])
