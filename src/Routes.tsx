import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'

import { SignIn } from './pages/auth/sign-in'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { NotFound } from './pages/app/404'

import { RequireAuth } from './components/RequireAuth'

// Estoque
import EstoquePage from './pages/app/estoque/estoque'
import ItensDoCardPage from './pages/app/estoque/itens-do-card'
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
import ClienteDetalhe from './pages/app/clientes/paginaCliente/cliente-detalhe'

import FiliaisDoCliente from './pages/app/clientes/paginaCliente/filiaisDoCliente'

// Filial do Cliente
import FilialProfile from './pages/app/clientes/paginaCliente/filial/[filialId]/perfil-filial'

import FilialOrcamento from './pages/app/clientes/paginaCliente/filial/[filialId]/orcamento'

import FilialNotasFiscais from './pages/app/clientes/paginaCliente/filial/[filialId]/notasFiscais'
import FilialDados from './pages/app/clientes/paginaCliente/filial/[filialId]/dadosDaFilial'

// Funcionários
import FuncionariosList from './pages/app/funcionarios/index'
import NovoFuncionarioPage from './pages/app/funcionarios/novo'
import FuncionarioProfileLayout from './pages/app/funcionarios/funcionario-profile'
import FuncionarioDados from './pages/app/funcionarios/funcionario-dados'
import FuncionarioHoras from './pages/app/funcionarios/funcionario-horas'
import FuncionarioPagamentos from './pages/app/funcionarios/funcionario-pagamentos'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/sign-in"
            replace
          />
        )
      },
      { path: 'sign-in', element: <SignIn /> }
    ]
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    errorElement: <NotFound />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },

      // Estoque
      { path: 'estoque', element: <EstoquePage /> },
      { path: 'estoque/:id', element: <ItensDoCardPage /> },
      { path: 'add-peca-por-kilo', element: <AddPecaPorKilo /> },
      { path: 'add-peca-por-metro', element: <AddPecaPorMetro /> },
      { path: 'add-peca-por-qtd', element: <AddPecaPorQtd /> },
      { path: 'edit-peca-por-qtd', element: <EditPecaPorQtd /> },

      // Clientes
      { path: 'clientes', element: <Clientes /> },
      {
        path: 'clientes/:id',
        element: <ClienteDetalhe />,
        children: [{ path: 'filiais', element: <FiliaisDoCliente /> }]
      },
      {
        path: 'clientes/filial/:filialId',
        element: <FilialProfile />,
        children: [
          { path: 'orcamento', element: <FilialOrcamento /> },
          { path: 'notas-fiscais', element: <FilialNotasFiscais /> },
          { path: 'dados-da-filial', element: <FilialDados /> }
        ]
      },

      // Funcionários
      { path: 'funcionarios', element: <FuncionariosList /> },
      { path: 'funcionarios/novo', element: <NovoFuncionarioPage /> },
      {
        path: 'funcionarios/:id',
        element: <FuncionarioProfileLayout />,
        children: [
          { path: 'dados', element: <FuncionarioDados /> },
          { path: 'horas', element: <FuncionarioHoras /> },
          { path: 'pagamentos', element: <FuncionarioPagamentos /> }
        ]
      },

      // Orçamentos
      { path: 'orcamentos-de-materiais', element: <OrcamentoDeMateriaisLista /> },
      { path: 'orcamentos-de-servicos', element: <OrcamentoDeServicosLista /> },
      { path: 'gerar-orcamento-materiais', element: <GerarOrcamentoMateriais /> },
      { path: 'gerar-orcamento-servicos', element: <GerarOrcamentoServicos /> },
      {
        path: 'previsualizacao-orcamento-materiais/:id',
        element: <PrevisualizacaoOrcamentoDeMateriais />
      },
      {
        path: 'previsualizacao-orcamento-servicos/:id',
        element: <PrevisualizacaoOrcamentoDeServicos />
      },
      {
        path: 'previsualizacao-orcamento-servicos',
        element: <PrevisualizacaoOrcamentoDeServicos />
      },

      // Notas Fiscais
      { path: 'notas-fiscais-lista', element: <NotasFiscaisLista /> },
      { path: 'gerar-nota-fiscal-one', element: <GerarNotaFiscalOne /> },
      { path: 'gerar-nota-fiscal-two', element: <GerarNotaFiscalTwo /> },
      { path: 'gerar-nota-fiscal-three', element: <GerarNotaFiscalThree /> },
      { path: 'preview-nota-fiscal', element: <PreviewNotaFiscal /> }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
