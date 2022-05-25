import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'

// Generate Data
function createData(date: string, name: string, a: string, b: string, value: number) {
  return { date, name, a, b, value }
}

const rows = [
  createData('11/05/2022', 'Xesque', 'Sim', 'Algum', 2939.33),
  createData('12/05/2022', 'Dele', 'Sim', 'Algum', 3494.48),
  createData('13/05/2022', 'Xesque', 'Não', 'Algum', 6782.75),
  createData('14/05/2022', 'Xesque', 'Sim', 'Algum', 9023.32),
  createData('15/05/2022', 'Xesque', 'Não', 'Nenhum', 5683.45),
  createData('16/05/2022', 'Xesque', 'Não', 'Nenhum', 94510.03),
]

export default function TableExample() {
  return (
    <React.Fragment>
      <Title>Alguma Informação</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Data</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Nome</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Tem algo?</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Tipo</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align='right'>
              Valor
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.a}</TableCell>
              <TableCell>{row.b}</TableCell>
              <TableCell align='right'>
                {row.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
