import { Helmet } from 'react-helmet-async'
import { Plus, X } from 'lucide-react'
import photo from '@/assets/photo.png'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { NavLink } from 'react-router-dom'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DialogRegister } from './dialog-register'

export function AddPecaPorQtd() {
  return (
    <>
      <Helmet title="Adicione Peça por QTD." />

      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Adicione Peça por QTD.</h1>
      </div>

      <div className="flex flex-col gap-8 p-4 bg-sidebar rounded-xl">
        <div className="flex gap-4 justify-between">
          <img
            className="rounded-xl w-auto h-[150px]"
            src={photo}
            alt="photo"
          />
          <div className="bg-sidebar-foregound flex w-full flex-col gap-2 p-2 border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Medida</TableHead>
                  <TableHead>NCM/SH</TableHead>
                  <TableHead>Cód. Fábrica</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Preço Un.</TableHead>
                  <TableHead>Custo Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>01</TableCell>
                  <TableCell>Cotovelo Fe.</TableCell>
                  <TableCell>6"</TableCell>
                  <TableCell>6000</TableCell>
                  <TableCell>5006</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>10,00</TableCell>
                  <TableCell>120,00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Adicionar <Plus />
                </Button>
              </DialogTrigger>

              <DialogRegister />
            </Dialog>
          </div>
        </div>

        <Card className="w-full bg-muted/40">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Descrição geral</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label htmlFor="cst">CST</label>
                <Input
                  id="cst"
                  defaultValue="00000"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="cfop">CFOP</label>
                <Input
                  id="cfop"
                  defaultValue="00"
                />
              </div>

              <div className="space-y-1 md:col-span-2 lg:col-span-1">
                <label htmlFor="base-icms">Base de Cálculo ICMS</label>
                <Input
                  id="base-icms"
                  defaultValue="Lorem"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="valor-icms">VALOR ICMS</label>
                <Input
                  id="valor-icms"
                  defaultValue="00000"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="aliq-icms">ALIQ. ICMS</label>
                <Input
                  id="aliq-icms"
                  defaultValue="00"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full flex justify-between">
        <Button variant="outline">
          <NavLink
            to="/estoque"
            className="flex gap-2 items-center"
          >
            Cancelar <X />
          </NavLink>
        </Button>
        <Button variant="default">Concluir</Button>
      </div>
    </>
  )
}
