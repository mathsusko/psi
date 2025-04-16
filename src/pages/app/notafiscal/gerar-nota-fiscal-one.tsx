import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'

import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { DatePickerDemo } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { X } from 'lucide-react'

export function GerarNotaFiscalOne() {
  return (
    <>
      <Helmet title="Gerar Nota Fiscal" />
      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Gerar nota fiscal</h1>

        <Progress
          value={25}
          className="w-[30%]"
        />
      </div>
      {/* primeira linha */}
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Dados do prestador</span>

        <div className="flex flex-col w-full">
          <label
            htmlFor="Nome/Razão Social"
            className="px-1"
          >
            Data de competência*
          </label>
          <DatePickerDemo />
        </div>
      </div>

      {/* segunda linha */}
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>EMITENTE DA NF°</span>
        <div className="flex justify-between gap-4">
          <div className="w-full flex flex-col gap-3">
            <label
              htmlFor="Nome/Razão Social"
              className="px-1"
            >
              Você irá emitir esta NF° como?
            </label>

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

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Cep"
              className="px-1"
            >
              Munícipio
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Endereço"
              className="px-1"
            >
              Inscrição municipal
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Cidade"
              className="px-1"
            >
              CNPJ
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Estado"
              className="px-1"
            >
              Razão social
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Cep"
              className="px-1"
            >
              Opção no Simples Nacional
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
      </div>

      {/* terceira linha */}
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>TOMADOR DO SERVIÇO</span>
        <div className="flex justify-between gap-4">
          <div className="w-full flex flex-col gap-3">
            <label
              htmlFor="Nome/Razão Social"
              className="px-1"
            >
              Onde está localizado o estabelecimento/domicílio?*
            </label>

            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-one"
                  id="option-one"
                />
                <Label htmlFor="option-one">Tomador não informado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-two"
                  id="option-two"
                />
                <Label htmlFor="option-two">Brasil</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-three"
                  id="option-three"
                />
                <Label htmlFor="option-three">Exterior</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      {/* quarta linha */}
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>INTERMEDIÁRIO DO SERVIÇO</span>
        <div className="flex justify-between gap-4">
          <div className="w-full flex flex-col gap-3">
            <label
              htmlFor="Nome/Razão Social"
              className="px-1"
            >
              Onde está localizado o estabelecimento/domicílio?*
            </label>

            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-one"
                  id="option-one"
                />
                <Label htmlFor="option-one">Tomador não informado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-two"
                  id="option-two"
                />
                <Label htmlFor="option-two">Brasil</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-three"
                  id="option-three"
                />
                <Label htmlFor="option-three">Exterior</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between">
        <NavLink to="/notas-fiscais-lista">
          <Button
            variant="outline"
            className="px-12"
          >
            Cancelar <X />
          </Button>
        </NavLink>
        <NavLink to="/gerar-nota-fiscal-two">
          <Button className="px-12">Avançar</Button>
        </NavLink>
      </div>
    </>
  )
}
