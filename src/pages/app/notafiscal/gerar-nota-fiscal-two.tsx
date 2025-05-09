import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'

import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
// ✅ DatePickerDemo removido
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function GerarNotaFiscalTwo() {
  return (
    <>
      <Helmet title="Gerar Nota Fiscal Two" />
      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Gerar nota fiscal</h1>
        <Progress
          value={50}
          className="w-[30%]"
        />
      </div>

      <div className="flex flex-col p-4 gap-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Local da prestação do serviço</span>
        <div className="flex gap-4 *:justify-between">
          <div className="w-full">
            <label className="px-1">País</label>
            <Input />
          </div>
          <div className="w-full">
            <label className="px-1">Munícipio</label>
            <Input />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Serviço prestado</span>
        <div className="flex justify-between gap-4">
          <div className="w-full flex flex-col gap-3">
            <label className="px-1">Código de Tributação Nacional</label>
            <Input />
          </div>
        </div>

        <div className="flex justify-between gap-6">
          <div className="w-full flex flex-col gap-4">
            <label className="px-1">Munícipio</label>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-one"
                  id="option-one"
                />
                <Label htmlFor="option-one">Prestador</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-two"
                  id="option-two"
                />
                <Label htmlFor="option-two">Tomador</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-three"
                  id="option-three"
                />
                <Label htmlFor="option-three">Intermediário</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <label className="px-1">Descrição do serviço</label>
        <Textarea />
      </div>

      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Informações complementares</span>
        <div className="flex flex-col gap-4 justify-between">
          <div className="w-full flex flex-col gap-2">
            <label className="px-1">
              Número do documento de responsabilidade técnica
            </label>
            <Input />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="px-1">Documento de referência</label>
            <Input />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="px-1">Informações complementares</label>
            <Textarea />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between">
        <NavLink to="/gerar-nota-fiscal-one">
          <Button
            variant="outline"
            className="px-12"
          >
            Voltar
          </Button>
        </NavLink>
        <NavLink to="/gerar-nota-fiscal-three">
          <Button className="px-12">Avançar</Button>
        </NavLink>
      </div>
    </>
  )
}
