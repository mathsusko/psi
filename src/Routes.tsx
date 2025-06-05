import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'

import { SignIn } from './pages/auth/sign-in'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { NotFound } from './pages/app/404'

// Estoque
import EstoquePage from './pages/app/estoque/estoque'
import ItensDoCardPage from './pages/app/estoque/[id]'
import { AddPecaPorKilo } from './pages/app/estoque/add-peca-por-kilo'
import { AddPecaPorMetro } from './pages/app/estoque/add-peca-por-metragem'
import { AddPecaPorQtd } from './pages/app/estoque/add-peca-por-qtd'
import { EditPecaPorQtd } from './pages/app/estoque/edit-peca-por-qtd'

// Orçamentos
import { OrcamentoDeMateriaisLista } from './pages/app/orcamentos/orcamentos-de-materiais-lista'
import { OrcamentoDeServicosLista } from './pages/app/orcamentos/orcamentos-de-servicos-lista'
import { GerarOrcamentoMateriais } from './pages/app/orcamentos/gerar-orcmaneto-materias'
import { GerarOrcamentoServicos } from './pages/app/orcamentos/gerar-orcmaneto-servicos'
import { PrevisualizacaoOrcamentoDeMateriais } from './pages/app/orcamentos/previsualizacao-orcamento-material'
import { PrevisualizacaoOrcamentoDeServicos } from './pages/app/orcamentos/previsualizacao-orcamento-servicos'

// Notas Fiscais
import { NotasFiscaisLista } from './pages/app/notafiscal/notas-fiscais-lista'
import { GerarNotaFiscalOne } from './pages/app/notafiscal/gerar-nota-fiscal-one'
import { GerarNotaFiscalTwo } from './pages/app/notafiscal/gerar-nota-fiscal-two'
import { GerarNotaFiscalThree } from './pages/app/notafiscal/gerar-nota-fiscal-three'
import { PreviewNotaFiscal } from './pages/app/notafiscal/preview-nota-fiscal'

// Clientes
import Clientes from './pages/app/clientes/clientes'
import Cliente from './pages/app/clientes/paginaCliente/[id]'
import FiliaisDoCliente from './pages/app/clientes/paginaCliente/FiliaisDoCliente'

// Filial do Cliente
import FilialProfile from './pages/app/clientes/paginaCliente/filial/[filialId]/index'
import FilialOrcamento from './pages/app/clientes/paginaCliente/filial/[filialId]/orcamento'
import FilialNotasFiscais from './pages/app/clientes/paginaCliente/filial/[filialId]/notasFiscais'
import FilialDados from './pages/app/clientes/paginaCliente/filial/[filialId]/dadosDaFilial'

// Funcionários
import FuncionariosList from './pages/app/funcionarios/index'
import NovoFuncionarioPage from './pages/app/funcionarios/novo'
import FuncionarioProfileLayout from './pages/app/funcionarios/[id]/index'
import FuncionarioDados from './pages/app/funcionarios/[id]/dados'
import FuncionarioHoras from './pages/app/funcionarios/[id]/horas'
import FuncionarioPagamentos from './pages/app/funcionarios/[id]/pagamentos'

export const router = createBrowserRouter([
  // ROTAS PROTEGIDAS
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },

      // ESTOQUE
      { path: '/estoque', element: <EstoquePage /> },
      { path: '/app/estoque/:id', element: <ItensDoCardPage /> },
      { path: '/add-peca-por-kilo', element: <AddPecaPorKilo /> },
      { path: '/add-peca-por-metro', element: <AddPecaPorMetro /> },
      { path: '/add-peca-por-qtd', element: <AddPecaPorQtd /> },
      { path: '/edit-peca-por-qtd', element: <EditPecaPorQtd /> },

      // CLIENTES
      { path: '/clientes', element: <Clientes /> },
      {
        path: '/clientes/:id',
        element: <Cliente />,
        children: [{ path: 'filiais', element: <FiliaisDoCliente /> }]
      },

      // FILIAL DO CLIENTE
      {
        path: '/clientes/filial/:filialId',
        element: <FilialProfile />,
        children: [
          { path: 'orcamento', element: <FilialOrcamento /> },
          { path: 'notas-fiscais', element: <FilialNotasFiscais /> },
          { path: 'dados-da-filial', element: <FilialDados /> }
        ]
      },

      // FUNCIONÁRIOS
      { path: '/funcionarios', element: <FuncionariosList /> },
      { path: '/funcionarios/novo', element: <NovoFuncionarioPage /> },
      {
        path: '/funcionarios/:id',
        element: <FuncionarioProfileLayout />,
        children: [
          { path: 'dados', element: <FuncionarioDados /> },
          { path: 'horas', element: <FuncionarioHoras /> },
          { path: 'pagamentos', element: <FuncionarioPagamentos /> }
        ]
      },

      // ORÇAMENTOS
      { path: '/orcamentos-de-materiais', element: <OrcamentoDeMateriaisLista /> },
      { path: '/orcamentos-de-servicos', element: <OrcamentoDeServicosLista /> },
      { path: '/gerar-orcamento-materiais', element: <GerarOrcamentoMateriais /> },
      { path: '/gerar-orcamento-servicos', element: <GerarOrcamentoServicos /> },
      {
        path: '/previsualizacao-orcamento-materiais/:id',
        element: <PrevisualizacaoOrcamentoDeMateriais />
      },
      {
        path: '/previsualizacao-orcamento-servicos/:id',
        element: <PrevisualizacaoOrcamentoDeServicos />
      },
      {
        path: '/previsualizacao-orcamento-servicos',
        element: <PrevisualizacaoOrcamentoDeServicos />
      },

      // NOTAS FISCAIS
      { path: '/notas-fiscais-lista', element: <NotasFiscaisLista /> },
      { path: '/gerar-nota-fiscal-one', element: <GerarNotaFiscalOne /> },
      { path: '/gerar-nota-fiscal-two', element: <GerarNotaFiscalTwo /> },
      { path: '/gerar-nota-fiscal-three', element: <GerarNotaFiscalThree /> },
      { path: '/preview-nota-fiscal', element: <PreviewNotaFiscal /> }
    ]
  },

  // ROTAS PÚBLICAS (Auth)
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }]
  }
])
