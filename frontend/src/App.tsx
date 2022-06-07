import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { deepPurple } from '@mui/material/colors'

import LoadingProvider from './providers/Loading'
import Dashboard from './Dashboard'

const mdTheme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: {
      main: '#fbc02d',
    },
  },
})

export default function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <LoadingProvider>
        <CssBaseline />
        <Dashboard />
      </LoadingProvider>
    </ThemeProvider>
  )
}
