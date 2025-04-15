import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Eye, Download, Trash, Delete, Edit, Plus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { DialogAddMateriais } from './modal-gerar-orcamento-materias'
import { Textarea } from '@/components/ui/textarea'

export function GerarOrcamentoServicos() {
  return (
    <>
      <Helmet title="Gerar Orçamentos Matariais" />
      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Criar Orçamento Serviços</h1>
      </div>
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Dados do prestador</span>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Nome/Razão Social"
              className="px-1"
            >
              Nome/Razão Social
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="CPF"
              className="px-1"
            >
              CPF
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="I.E"
              className="px-1"
            >
              I.E
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
              htmlFor="Cep"
              className="px-1"
            >
              CEP
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
              Endereço
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
              Cidade
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Estado"
              className="px-1"
            >
              Estado
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
              htmlFor="Cep"
              className="px-1"
            >
              Site
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
              Telefone
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
              Email
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Dados do cliente</span>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Nome/Razão Social"
              className="px-1"
            >
              Nome/Razão Social
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="CPF"
              className="px-1"
            >
              CPF
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="I.E"
              className="px-1"
            >
              I.E
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
              htmlFor="Cep"
              className="px-1"
            >
              CEP
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
              Endereço
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
              Cidade
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="Estado"
              className="px-1"
            >
              Estado
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
              htmlFor="Cep"
              className="px-1"
            >
              Site
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
              Telefone
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
              Email
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Dados do Orçamento de Produto</span>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="Nome/Razão Social"
              className="px-1"
            >
              Custo
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="CPF"
              className="px-1"
            >
              Data Entra. Início
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="I.E"
              className="px-1"
            >
              Data Saída
            </label>
            <Input
              id="cst"
              defaultValue="00000"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <span>Informações sobre o serviço</span>
        <Textarea placeholder="Escreva aqui" />
      </div>
      <div className="w-full flex justify-end">
        <NavLink to="/previsualizacao-orcamento-servicos">
          <Button className="px-12">Concluir</Button>
        </NavLink>
      </div>
    </>
  )
}
