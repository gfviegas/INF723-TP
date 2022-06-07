import * as React from 'react'

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'

import Title from './Title'
import { Fund } from '../types'

interface TableExampleProps {
  funds: Fund[]
}

export default function TableExample(props: TableExampleProps) {
  const { funds } = props

  const rows: GridRowsProp = (funds as GridRowsProp)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'code', headerName: 'Código', width: 100 },
    { field: 'uf', headerName: 'Estado', width: 100 },
    { field: 'city', headerName: 'Cidade', width: 200 },
    { field: 'neighborhood', headerName: 'Bairro', width: 200 },
    { field: 'address', headerName: 'Endereço', width: 400 },
  ]

  return (
    <React.Fragment>
      <Title>Fundos conhecidos</Title>

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </React.Fragment>
  )
}
