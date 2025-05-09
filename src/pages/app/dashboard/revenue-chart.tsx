import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import colors from 'tailwindcss/colors'

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  CartesianGrid,
  Line,
  Tooltip,
  YAxis
} from 'recharts'

const data = [
  { data: '10/12', revenue: 1200 },
  { data: '11/12', revenue: 800 },
  { data: '12/12', revenue: 900 },
  { data: '13/12', revenue: 400 },
  { data: '14/12', revenue: 2300 },
  { data: '15/12', revenue: 800 },
  { data: '16/12', revenue: 640 }
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer
          width="100%"
          height={240}
        >
          <LineChart
            data={data}
            style={{ fontSize: 12 }}
          >
            <XAxis
              dataKey="data"
              tickLine={false}
              axisLine={false}
              dy={16}
            />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
              }
            />
            <CartesianGrid
              vertical={false}
              className="stroke-muted"
            />
            <Tooltip />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.red[400]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
