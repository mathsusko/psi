import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'

import { Progress } from '@/components/ui/progress'
// ❌ Removido: import { Textarea } from '@/components/ui/textarea'
// ❌ Removido: import { DatePickerDemo } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function GerarNotaFiscalThree() {
  return (
    <>
      <Helmet title="Gerar Nota Fiscal Three" />
      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Gerar nota fiscal</h1>
        <Progress
          value={75}
          className="w-[30%]"
        />
      </div>

      {/* primeira linha */}
      <div className="flex flex-col p-4 gap-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Valores do serviço prestado</span>
        <div className="flex gap-4 *:justify-between">
          <div className="w-full">
            <label className="px-1">Valor do serviço prestado</label>
            <Input />
          </div>
          <div className="w-full">
            <label className="px-1">Valor recebido pelo intermediário</label>
            <Input />
          </div>
          <div className="w-full">
            <label className="px-1">Desconto incondicionado</label>
            <Input />
          </div>
          <div className="w-full">
            <label className="px-1">Desconto condicionado</label>
            <Input />
          </div>
        </div>
      </div>

      {/* segunda linha */}
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Serviço prestado</span>

        <div className="flex gap-4 *:justify-between">
          <div className="w-full">
            <label className="px-1">Tributação do ISSQN sobre o serviço prestado</label>
            <Input />
          </div>
          <div className="w-full">
            <label className="px-1">Regime especial de tributação</label>
            <Input />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          {[
            'A exigibilidade do recolhimento do ISSQN devido nesta operação está suspensa?',
            'Há retenção do ISSQN pelo Tomador ou pelo Intermediário?',
            'Este serviço prestado está amparado por algum benefício municipal?',
            'Será aplicado algum tipo de Dedução/Redução à base de cálculo do ISSQN?'
          ].map((label, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-4"
            >
              <label className="px-1">{label}</label>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="option-one"
                    id={`option-no-${index}`}
                  />
                  <Label htmlFor={`option-no-${index}`}>Não</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="option-two"
                    id={`option-yes-${index}`}
                  />
                  <Label htmlFor={`option-yes-${index}`}>Sim</Label>
                </div>
              </RadioGroup>
            </div>
          ))}

          <div className="flex gap-4 *:justify-between">
            <div className="w-full">
              <label className="px-1">Alíquota</label>
              <Input />
            </div>
            <div className="w-full">
              <label className="px-1">BC ISSQN</label>
              <Input />
            </div>
            <div className="w-full">
              <label className="px-1">Valor ISSQN</label>
              <Input />
            </div>
          </div>
        </div>
      </div>

      {/* terceira linha */}
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Tributação federal</span>
        <div className="flex flex-col gap-4 justify-between">
          <div className="w-full flex flex-col gap-2">
            <label className="px-1">Situação tributária do PIS/CONFINS</label>
            <Input />
          </div>

          <div className="flex justify-between gap-4">
            <div className="w-full flex flex-col gap-2">
              <label className="px-1">Valor Retido IRRF</label>
              <Input />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="px-1">Valor Retido CSLL</label>
              <Input />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="px-1">Valor Retido CP</label>
              <Input />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Valor aproximado dos tributos</span>
        <div className="w-full flex flex-col gap-4">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-one"
                id="option-one"
              />
              <Label htmlFor="option-one">
                Preencher os valores monetários em cada NF° emitida
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-two"
                id="option-two"
              />
              <Label htmlFor="option-two">
                Configurar os valores percentuais correspondentes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-three"
                id="option-three"
              />
              <Label htmlFor="option-three">
                Não informar nenhum valor emitido para os Tributos (Decreto 8.264/2014)
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="w-full flex justify-between">
        <NavLink to="/gerar-nota-fiscal-two">
          <Button
            variant="outline"
            className="px-12"
          >
            Voltar
          </Button>
        </NavLink>
        <NavLink to="/preview-nota-fiscal">
          <Button className="px-12">Avançar</Button>
        </NavLink>
      </div>
    </>
  )
}
