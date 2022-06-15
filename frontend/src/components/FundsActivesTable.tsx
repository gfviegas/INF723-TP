import * as React from 'react'

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'

import Title from './Title'
import { FundActive } from '../types'
import CustomPagination from './CustomPagination'

interface FundsActivesProps {
  actives: FundActive[]
}

export default function FundsActives(props: FundsActivesProps) {
  const { actives } = props

  const rows: GridRowsProp = (actives as GridRowsProp)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'code', headerName: 'Código', width: 100 },
    { field: 'uf', headerName: 'Estado', width: 80 },
    { field: 'city', headerName: 'Cidade', width: 200 },
    { field: 'neighborhood', headerName: 'Bairro', width: 180 },
    { field: 'address', headerName: 'Endereço', width: 400 },
  ]

  return (
    <React.Fragment>
      <Title>Ativos de fundos conhecidos</Title>

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Pagination: CustomPagination,
          }}
          initialState={{
            pagination: {
              pageSize: 25
            },
            sorting: {
              sortModel: [
                { field: 'code', sort: 'asc' },
              ]
            }
          }}
        />
      </div>
    </React.Fragment>
  )
}
