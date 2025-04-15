import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Edit } from 'lucide-react'
import photo from '@/assets/photo.png'

import { DropdownMenuDemo } from './button-dropdown'
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
import { NavLink } from 'react-router-dom'
import { Separator } from '@radix-ui/react-separator'
import { Pagination } from '@/components/pagination'

export function Estoque() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const data = [
    {
      id: 1,
      codigo: '01',
      descricao: 'Cotovelo Fe.',
      medida: '6',
      ncm: '6000',
      codFabrica: '5006',
      quantidade: 12,
      preco: 10,
      total: 120
    },
    {
      id: 2,
      codigo: '01',
      descricao: 'Curva',
      medida: '4',
      ncm: '6000',
      codFabrica: '5006',
      quantidade: 10,
      preco: 10,
      total: 100
    }
  ]

  const toggleRow = (index: number) => {
    setExpandedRow((prev) => (prev === index ? null : index))
  }

  return (
    <>
      <Helmet title="Estoque" />

      <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar text-sidebar-foreground">
        <h1 className="text-sm font-bold tracking-tight">Estoque</h1>
        <DropdownMenuDemo />
      </div>

      <div className="flex flex-col gap-4 p-4 space-y-2.5 rounded-xl bg-sidebar text-sidebar-foreground">
        <form className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros:</span>
          <Input
            className="h-8 w-[320px]"
            placeholder="Nome do produto"
          />
        </form>
        <Table className="border rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Descrição</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <React.Fragment key={item.id}>
                <TableRow className="flex flex-col p-3 ">
                  <div className="flex justify-between">
                    <TableCell className="flex items-center font-medium text-xs font-mono">
                      {item.descricao}
                    </TableCell>

                    <TableCell>
                      <button
                        type="button"
                        onClick={() => toggleRow(index)}
                        className="flex items-center text-gray-500 hover:text-black transition"
                      >
                        {expandedRow === index ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </TableCell>
                  </div>

                  <AnimatePresence>
                    {expandedRow === index && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-2 p-2 bg-sidebar rounded-xl">
                          <div className="flex gap-4 justify-between">
                            <img
                              className="rounded-xl w-auto h-[150px]"
                              src={photo}
                              alt="photo"
                            />

                            <div className="w-full">
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
                                    <TableCell align="end">120,00</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>01</TableCell>
                                    <TableCell>Cotovelo Fe.</TableCell>
                                    <TableCell>6"</TableCell>
                                    <TableCell>6000</TableCell>
                                    <TableCell>5006</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell>10,00</TableCell>
                                    <TableCell align="end">120,00</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>01</TableCell>
                                    <TableCell>Cotovelo Fe.</TableCell>
                                    <TableCell>6"</TableCell>
                                    <TableCell>6000</TableCell>
                                    <TableCell>5006</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell>10,00</TableCell>
                                    <TableCell align="end">120,00</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>01</TableCell>
                                    <TableCell>Cotovelo Fe.</TableCell>
                                    <TableCell>6"</TableCell>
                                    <TableCell>6000</TableCell>
                                    <TableCell>5006</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell>10,00</TableCell>
                                    <TableCell align="end">120,00</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>01</TableCell>
                                    <TableCell>Cotovelo Fe.</TableCell>
                                    <TableCell>6"</TableCell>
                                    <TableCell>6000</TableCell>
                                    <TableCell>5006</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell>10,00</TableCell>
                                    <TableCell align="end">120,00</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>01</TableCell>
                                    <TableCell>Cotovelo Fe.</TableCell>
                                    <TableCell>6"</TableCell>
                                    <TableCell>6000</TableCell>
                                    <TableCell>5006</TableCell>
                                    <TableCell>12</TableCell>
                                    <TableCell>10,00</TableCell>
                                    <TableCell align="end">120,00</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                              <Separator className="my-2 border-t" />
                              <div className="flex w-full justify-between p-2">
                                <span>Total</span>
                                <span>300,00</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col border gap-4 rounded-xl p-4">
                            <div className="space-y-4">
                              <h2 className="text-lg font-semibold">Descrição geral</h2>

                              <Table className="bg-muted/40 rounded-md">
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>CST</TableHead>
                                    <TableHead>CFOP</TableHead>
                                    <TableHead>Base de Cálculo ICMS</TableHead>
                                    <TableHead>VALOR ICMS</TableHead>
                                    <TableHead>ALIQ. ICMS</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>00000</TableCell>
                                    <TableCell>00</TableCell>
                                    <TableCell>Lorem</TableCell>
                                    <TableCell>00000</TableCell>
                                    <TableCell>00</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>

                            <Button variant="outline">
                              <NavLink
                                to="/edit-peca-por-qtd"
                                className="flex gap-2 items-center"
                              >
                                Editar <Edit />
                              </NavLink>
                            </Button>
                          </div>
                        </div>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <Pagination />
      </div>
    </>
  )
}
