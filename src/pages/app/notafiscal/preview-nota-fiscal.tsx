import { Helmet } from 'react-helmet-async'

import { Progress } from '@/components/ui/progress'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'

export function PreviewNotaFiscal() {
  return (
    <>
      <Helmet title="Previsualização nota fiscal" />
      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Pré-visualização nota fiscal</h1>

        <Progress
          value={100}
          className="w-[30%]"
        />
      </div>
      <div className="flex flex-col gap-4 p-4 space-y-2.5 rounded-xl bg-sidebar text-sidebar-foreground">
        <div className="w-full flex flex-col gap-4 rounded-xl border p-4">
          <span>Informações do emitente</span>
          <div className="flex gap-4">
            <div className="w-full flex flex-col items-end space-y-2.5 text-sm">
              <p>Você irá emitir está NF° como:</p>
              <p>CNPJ:</p>
              <p>Nome/razão social:</p>
            </div>
            <div className="w-full flex flex-col space-y-2.5 text-sm">
              <p>Prestador</p>
              <p>41.000.000/0001-90</p>
              <p>Empresa X</p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <NavLink to="/gerar-orcamento-servicos">
              <Button
                variant="outline"
                className="px-12"
              >
                Edit campos <Edit />
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 rounded-xl border p-4">
          <span>Informações do cliente</span>

          <div className="flex gap-4">
            <div className="w-full flex flex-col items-end space-y-2.5 text-sm">
              <p>Data de competência:</p>
              <p>Código completo do serviço:</p>
              <p>Descrição do serviço:</p>
              <p>-</p>
              <p>Município da prestação:</p>
              <p>Município da incidência do ISSQN:</p>
              <p>Descrição do serviço:</p>
              <p>Item da NBS correpondente ao serviço prestado:</p>
            </div>
            <div className="w-full flex flex-col space-y-2.5 text-sm">
              <p>30/03/2025</p>
              <p>01.03.01.000</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam officia
                blanditiis, unde aliquid, quo molestias, nulla quia quas tenetur veritatis
                alias quisquam? Repudiandae architecto tempore obcaecati qui, illum velit
                error.
              </p>
              <p>CURITIBA/PR</p>
              <p>CURITIBA/PR</p>
              <p>Instalação</p>
              <p>Não informado</p>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <NavLink to="/gerar-orcamento-servicos">
              <Button
                variant="outline"
                className="px-12"
              >
                Editar campos <Edit />
              </Button>
            </NavLink>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 rounded-xl border p-4">
          <span>Valor do serviço</span>
          <div className="flex gap-4">
            <div className="w-full flex flex-col items-end space-y-2.5 text-sm">
              <p>Valor do serviço:</p>
            </div>
            <div className="w-full flex flex-col space-y-2.5 text-sm">
              <p>R$ 10.000,00</p>
            </div>
          </div>
          <span>Tributação Municípal</span>
          <div className="flex gap-4">
            <div className="w-full flex flex-col items-end space-y-2.5 text-sm">
              <p>Tributação do ISSQN sobre o serviço prestado:</p>
              <p>Regime Especial de Tributação:</p>
              <p>
                A exigibilidade do recolhimento do ISSQN devido nesta operação está
                suspensa?
              </p>
              <p>Há retenção do ISSQN pelo Tomador ou pelo intermediário?</p>
              <p>Este serviço prestado está amparado por algum benefício municípal?</p>
              <p>
                Será aplicado algum tipo de Dedução/Redução à base de cálculo do ISSQN?
              </p>
            </div>
            <div className="w-full flex flex-col space-y-2.5 text-sm">
              <p>Operação Tributável</p>
              <p>Nenhum</p>
              <p>Não</p>
              <p>Não</p>
              <p>Não</p>
              <p>Não</p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <NavLink to="/gerar-orcamento-servicos">
              <Button
                variant="outline"
                className="px-12"
              >
                Editar campos <Edit />
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <NavLink to="/gerar-nota-fiscal-three">
          <Button
            variant="outline"
            className="px-12"
          >
            Voltar
          </Button>
        </NavLink>
        <NavLink to="/notas-fiscais-lista">
          <Button className="px-12">Concluir geração de NF°</Button>
        </NavLink>
      </div>
    </>
  )
}
