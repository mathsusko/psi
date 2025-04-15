import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

export function MonthRevenueCard() {
  return (
    <Card>
      <CardHeader className="flex w-full items-center justify-between pb-2">
        <CardTitle className="text-base text-semibold">Receita Total</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">R$ 1.000.000,00</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+2%</span> em relação
          ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
