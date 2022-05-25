import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'
import Title from './Title'

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount }
}

const data = [
  createData('11/05', 0),
  createData('12/05', 200),
  createData('13/05', 300),
  createData('14/05', 340),
  createData('15/05', 400),
  createData('16/05', 650),
  createData('17/05', 625),
  createData('18/05', 800),
  createData('19/05', 832),
  createData('20/05', 890),
  createData('21/05', 877),
  createData('22/05', 949),
  createData('23/05', 1000),
  createData('24/05', undefined),
]

export default function ChartExample() {
  const theme = useTheme()

  return (
    <React.Fragment>
      <Title>Exemplo</Title>
      <ResponsiveContainer>
        <LineChart
          height={450}
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey='time' stroke={theme.palette.text.secondary} style={theme.typography.body2} />
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
          <Line isAnimationActive={false} type='monotone' dataKey='amount' stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
