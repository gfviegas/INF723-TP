import * as React from 'react'
// import { useTheme } from '@mui/material/styles'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts'
import Title from './Title'

import { FundMetric } from '../types'

export interface ChartExampleProps {
  fundsMetrics: FundMetric[]
}

export default function ChartExample(props: ChartExampleProps) {
  const { fundsMetrics } = props
  // const theme = useTheme()

  const data = fundsMetrics.sort((a, b) => b.dy_12m_average - a.dy_12m_average).slice(0, 10)

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <React.Fragment>
      <Title>Exemplo</Title>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          // width={500}
          height={450}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="code" />
          <YAxis tickFormatter={(value) => currencyFormatter.format(value)} />
          <Tooltip formatter={(value: any) => currencyFormatter.format(value)} />
          <Legend />
          <Bar name="Média 12M" dataKey="dy_12m_average" fill="#12492f" />
          <Bar name="Média 3M" dataKey="dy_3m_average" fill="#f7a325" />
        </BarChart>
      </ResponsiveContainer>

      {/* <ResponsiveContainer>
        <BarChart
          height={450}
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey='code' stroke={theme.palette.text.secondary} style={theme.typography.body2} />
          <YAxis stroke={theme.palette.text.secondary} style={theme.typography.body2}>
            <Label
              angle={270}
              position='left'
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Alguma Coisa
            </Label>
          </YAxis>
          <Bar dataKey='net_worth' fill={theme.palette.primary.main} />
          <Bar dataKey='income_accumulated' fill={theme.palette.secondary.main} />
        </BarChart>
      </ResponsiveContainer> */}
    </React.Fragment>
  )
}
