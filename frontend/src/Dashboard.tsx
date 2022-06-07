import * as React from 'react'

import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import Navbar from './components/Navbar'
import ChartExample from './components/ChartExample'
import CardExample from './components/CardExample'
import Copyright from './components/Copyright'
import TableExample from './components/TableExample'

import { fetchAllFunds, fetchAllFundsMetrics } from './services/api'
import { LoadingContext, LoadingContextProp } from './providers/Loading'

import { Fund, FundMetric } from './types'

export default function Dashboard() {
  const { setLoading } = React.useContext<LoadingContextProp>(LoadingContext)
  const [funds, setFunds] = React.useState<Fund[]>()
  const [fundsMetrics, setFundsMetrics] = React.useState<FundMetric[]>()

  const fetchData = async () => {
    setLoading(true)
    const [fundsResponse, fundsMetrics] = await Promise.all([
      fetchAllFunds(),
      fetchAllFundsMetrics(),
    ])
    setFunds(fundsResponse.data.funds)
    setFundsMetrics(fundsMetrics.data.funds_metrics)
    setLoading(false)
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
      <Box sx={{ display: 'flex' }}>
        <Navbar />

        <Box
          component='main'
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* ChartExample */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 480,
                  }}
                >
                  {fundsMetrics && fundsMetrics.length && <ChartExample fundsMetrics={fundsMetrics} />}
                </Paper>
              </Grid>
              {/* CardExample */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 480,
                  }}
                >
                  <CardExample />
                </Paper>
              </Grid>
              {/* TableExample */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {funds && funds.length && <TableExample funds={funds} />}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  )
}
