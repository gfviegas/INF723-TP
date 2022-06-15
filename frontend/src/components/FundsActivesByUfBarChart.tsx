import React from 'react'
import { FundActiveByUf } from '../types'
import Title from './Title'
import nivoTheme from '../services/nivoTheme'
import { BarDatum, ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

interface FundsActivesByUfBarChartProps  {
  fundsActivesByUfs: FundActiveByUf[]
}

export default function FundsActivesByUfBarChart(props: FundsActivesByUfBarChartProps) {
  const { fundsActivesByUfs } = props

  const chartData = (fundsActivesByUfs.map((i) => ({ uf: i.uf, Ativos: i.count })).sort((a, b) => a.uf.localeCompare(b.uf)).sort((a, b) => b.Ativos - a.Ativos) as unknown) as BarDatum[]
  if (!chartData || !chartData.length) return <></>

  return (
    <React.Fragment>
      <Title>Ativos de Fundos por Estado</Title>
      <ResponsiveBar
        theme={nivoTheme}
        data={chartData}
        keys={['Ativos']}
        indexBy="uf"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'pink_yellowGreen' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Estado',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Quantidade de Ativos',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              1.6
            ]
          ]
        }}
      />
    </React.Fragment>
  )
}

