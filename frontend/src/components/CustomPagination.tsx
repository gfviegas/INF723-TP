import React from 'react'
import {
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import TablePagination from '@mui/material/TablePagination'


export default function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)
  const rowsPerPage = useGridSelector(apiRef, gridPageSizeSelector)

  return (
    <TablePagination
      color="primary"
      count={pageCount}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={(event, value) => apiRef.current.setPage(value - 1)}
      labelRowsPerPage='Linhas por página:'
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
    />
  )
}
