import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { orange } from '@mui/material/colors'

import LoadingProvider from './providers/LoadingProvider'
import FundsProvider from './providers/FundsProvider'
import Dashboard from './Dashboard'

const mdTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: orange,
    secondary: {
      main: '#fbc02d',
    },
  },
})

export default function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <LoadingProvider>
        <FundsProvider>
          <CssBaseline />
          <Dashboard />
        </FundsProvider>
      </LoadingProvider>
    </ThemeProvider>
  )
}
