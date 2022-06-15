import React from 'react'
import { SliceTooltipProps } from '@nivo/line'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function SliceTooltip(props: SliceTooltipProps) {
  const { slice } = props

  return (
    <Box sx={{
      background: '#111',
      fontSize: 12,
      color: '#eee',
      p: 1,
    }}>
      <Typography variant="caption" style={{fontWeight: 'bold'}}>{slice.points[0].data.xFormatted}</Typography>

      {slice.points.map((point) => (
        <div key={point.id} style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: 5,
          paddingRight: 5,
        }}>
          <div style={{
            backgroundColor: point.color,
            maxWidth: 20,
            maxHeight: 20,
            width: 15,
            height: 15,
            marginRight: 10,
          }}></div>

          <Typography variant="caption">{point.serieId}</Typography>
          <Typography variant="caption" style={{ width:'100%', marginLeft: 10, fontWeight: 'bold', textAlign: 'right' }} >{point.data.yFormatted}</Typography>
        </div>
      ))}
    </Box>
  )

}
