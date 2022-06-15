/* eslint-disable no-unused-vars */
import * as React from 'react'
import Title from './Title'

import { FundHistory } from '../types'
import { currencyFormatter, currencyFormatterMin, dateFormatter } from '../services/formatter'
import { ResponsiveLine, Serie } from '@nivo/line'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import nivoTheme from '../services/nivoTheme'
import SliceTooltip from './SliceTooltip'

export interface ClosePriceOvertimeProps {
  fundsHistory: FundHistory[]
}

export default function ClosePriceOvertime(props: ClosePriceOvertimeProps) {
  const { fundsHistory } = props

  if (!fundsHistory || !fundsHistory.length) return <></>

  const xSorted = fundsHistory.map(d => (new Date(d.date).valueOf() as number)).sort((a, b) => a - b)
  const minX = xSorted[0]
  const maxX = xSorted[xSorted.length - 1]

  const firstDayPrediction = Math.min(...fundsHistory.filter(d => d.prediction).map(d => (new Date(d.date).valueOf())))
  const [graphRange, setGraphRange] = React.useState<[number, number]>([minX, maxX])

  const groupedData = fundsHistory.reduce((acc, current) => {
    // const key = current.prediction ? `${current.code}_pred` : current.code
    const key = current.code

    if (acc[key]) {
      return { ...acc, [key]: [...acc[key], current] }
    }

    return { ...acc, [key]: [current] }
  }, {} as { [code: string]: FundHistory[] })

  const chartData: Serie[] = Object.keys(groupedData).slice(0, 10).map((fundCode) => {
    const isPrediction = Boolean(fundCode.includes('_pred'))

    return {
      id: fundCode,
      isPrediction,
      data: groupedData[fundCode]
        .map((fh) => ({ x: new Date(fh.date).toISOString(), y: fh.close_price }))
        .filter(d => (new Date(d.x).valueOf() >= graphRange[0]) && (new Date(d.x).valueOf() <= graphRange[1]))
    }
  })

  if (!chartData || !chartData.length) return <></>

  return (
    <React.Fragment>
      <Title>Preço da Cota ao Longo dos Meses</Title>
      <Box height={500} width="100%">
        <ResponsiveLine
          sliceTooltip={SliceTooltip}
          theme={nivoTheme}
          data={chartData}
          margin={{ top: 20, right: 160, bottom: 100, left: 60 }}
          xScale={{ format: "%Y-%m-%dT%H:%M:%S.%L%Z", type: "time" }}
          xFormat="time:%m/%y"
          yScale={{ type: 'linear' }}
          yFormat={(v) => v ? currencyFormatter.format(parseFloat(v.toString())): ':2f'}
          curve="monotoneX"
          axisTop={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: '%m/%y',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: currencyFormatterMin.format,
          }}
          enableGridX={false}
          colors={{ scheme: 'spectral' }}
          lineWidth={2}
          enablePoints={true}
          pointSize={4.5}
          useMesh={false}
          enableSlices="x"
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 140,
              translateY: 0,
              itemsSpacing: 2,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 12,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              toggleSerie: true,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .5)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          markers={[
            {
              axis: 'x',
              value: firstDayPrediction,
              lineStyle: {stroke: '#b0413e', strokeWidth: 2, strokeOpacity: 0.8, strokeDasharray: 3 },
              legend: 'Predições',
              legendPosition: 'top-right',
              textStyle: {
                fontSize: 12,
                fill: '#eee',
              },
            }
          ]}
        />
      </Box>

      <Box sx={{ px: 20, mt: 0, position: 'relative', top: -60 }} display='flex' justifyContent='center'>
        <Slider
          value={graphRange}
          onChange={(_e, newValue) => setGraphRange([(newValue as number[])[0], (newValue as number[])[1]])}
          max={maxX}
          min={minX}
          getAriaValueText={(v) => dateFormatter.format(new Date(v))}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => dateFormatter.format(new Date(v))}
          marks={[
            { value: minX, label: dateFormatter.format(new Date(minX)) },
            { value: maxX, label: dateFormatter.format(new Date(maxX)) },
          ]}
        />
      </Box>
    </React.Fragment>
  )
}

