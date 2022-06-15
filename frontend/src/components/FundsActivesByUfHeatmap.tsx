import React from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { FundActiveByUfAndFund } from '../types'
import Title from './Title'
import nivoTheme from '../services/nivoTheme'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

interface FundsActivesByUfHeatmapProps  {
  fundsActivesByUfsAndFund: FundActiveByUfAndFund[]
}

export default function FundsActivesByUfHeatmap(props: FundsActivesByUfHeatmapProps) {
  const { fundsActivesByUfsAndFund } = props

  const groupedData = fundsActivesByUfsAndFund.reduce((acc, current) => {
    if (acc[current.uf]) {
      return { ...acc, [current.uf]: [...acc[current.uf], current] }
    }

    return { ...acc, [current.uf]: [current] }
  }, {} as { [uf: string]: FundActiveByUfAndFund[] })

  const chartData = Object.keys(groupedData).map((uf) => {
    return {
      id: uf,
      data: groupedData[uf].map((f) => ({ x: f.code, y: f.count }))
    }
  })

  const allCounts = fundsActivesByUfsAndFund.map(v => v.count)

  if (!chartData || !chartData.length) return <></>

  return (
    <React.Fragment>
      <Title>Ativos de Fundos por Estado</Title>
      <ResponsiveHeatMap
        theme={nivoTheme}
        data={chartData}
        forceSquare
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: '',
          legendOffset: 46
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'UF',
          legendPosition: 'middle',
          legendOffset: -72
        }}
        colors={{
          type: 'quantize',
          scheme: 'yellow_orange_red',
          minValue: Math.min(...allCounts),
          maxValue: Math.max(...allCounts),
          steps: 8,
        }}
        emptyColor="#000"
        legends={[
          {
            anchor: 'bottom',
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: 'row',
            tickPosition: 'after',
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: '>-.2s',
            title: 'Valor →',
            titleAlign: 'end',
            titleOffset: 4
          }
        ]}
      />
    </React.Fragment>
  )
}

