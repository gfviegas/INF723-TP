import React from 'react'
import { PointTooltipProps } from '@nivo/line'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function PointTooltip(props: PointTooltipProps) {
  const { point } = props

  return (
    <Box sx={{
      background: 'rgba(200,200,200,0.5)',
      p: 1,
    }}>
      <div style={{
        backgroundColor: point.color,
        width: 20,
        height: 20,
        position: 'absolute',
        borderRadius: '30%',
      }}></div>
      <Typography sx={{pl: 3, fontWeight: 'bold'}} variant="subtitle1"> {point.serieId} </Typography>
      <Typography variant="caption"> X: <strong>{point.data.xFormatted}</strong></Typography>
      <br/>
      <Typography variant="caption"> Y: <strong>{point.data.yFormatted}</strong></Typography>
    </Box>
  )

}
