import * as React from 'react'

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'

import Title from './Title'
import { Fund } from '../types'
import CustomPagination from './CustomPagination'

interface FundsTableProps {
  funds: Fund[]
}

export default function FundsTable(props: FundsTableProps) {
  const { funds } = props

  const rows: GridRowsProp = (funds as GridRowsProp)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'code', headerName: 'Código', width: 150 },
    { field: 'sector', headerName: 'Setor', width: 200 },
  ]

  return (
    <React.Fragment>
      <Title>Fundos conhecidos</Title>

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Pagination: CustomPagination,
          }}
          initialState={{
            sorting: {
              sortModel: [
                { field: 'sector', sort: 'asc' },
              ]
            }
          }}
        />
      </div>
    </React.Fragment>
  )
}
