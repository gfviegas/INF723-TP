import * as React from 'react'

import Typography from '@mui/material/Typography'
import Title from './Title'

// Generate Data
function createData(label: string, value: number) {
  return { label, value }
}

const rows = [
  createData('Xesque', 929.33),
  createData('Dele', 1929.39),
  createData('Desque', 3442.95),
  createData('Xesque', 929.33),
  createData('Desque', 3442.95),
]
export default function CardExample() {
  return (
    <React.Fragment>
      <Title>Resumo Exemplo</Title>

      {rows.map((row) => (
        <>
          <Typography component='p' variant='h5'>
            {row.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
          </Typography>
          <Typography color='text.secondary' sx={{ flex: 1 }}>
            {row.label}
          </Typography>
        </>
      ))}
    </React.Fragment>
  )
}
