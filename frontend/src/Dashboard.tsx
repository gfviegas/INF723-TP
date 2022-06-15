import * as React from 'react'

import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import Navbar from './components/Navbar'
import Filters from './components/Filters'
import Copyright from './components/Copyright'

import { fetchAllFundsHistory, fetchFundsActives, fetchFundsActivesByUfs, fetchFundsActivesByUfsAndFunds } from './services/api'
import { LoadingContext, LoadingContextProp } from './providers/LoadingProvider'
import { FundsContext } from './contexts/FundsContext'

import { FundActive, FundActiveByUf, FundActiveByUfAndFund, FundHistory } from './types'
import ClosePriceOvertime from './components/ClosePriceOvertime'
import DividendOvertime from './components/DividendOvertime'
import DividendYieldOvertime from './components/DividendYieldOvertime'
import FundsTable from './components/FundsTable'
import FundsActivesTable from './components/FundsActivesTable'
import FundsActivesByUfHeatmap from './components/FundsActivesByUfHeatmap'
import FundsActivesByUfBarChart from './components/FundsActivesByUfBarChart'

const basePaperProps = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
}

export default function Dashboard() {
  const { setLoading } = React.useContext<LoadingContextProp>(LoadingContext)
  const { funds, setActiveFunds } = React.useContext(FundsContext)

  const [fundsHistory, setFundsHistory] = React.useState<FundHistory[]>()
  // eslint-disable-next-line no-unused-vars
  const [fundsActives, setFundsActives] = React.useState<FundActive[]>()
  // eslint-disable-next-line no-unused-vars
  const [fundsActivesByUfs, setFundsActivesByUfs] = React.useState<FundActiveByUf[]>()
  // eslint-disable-next-line no-unused-vars
  const [fundsActivesByUfsAndFund, setFundsActivesByUfsAndFund] = React.useState<FundActiveByUfAndFund[]>()

  const fetchData = async (af: string[] | null = null) => {
    const only = (af === null) ? [] : af

    setLoading(true)
    const [fundsHistory, fundsActivesByUfs, fundsActivesByUfsAndFunds, fundsActives] = await Promise.all([
      fetchAllFundsHistory(only),
      fetchFundsActivesByUfs(only),
      fetchFundsActivesByUfsAndFunds(only),
      fetchFundsActives(only),
    ])

    setFundsHistory(fundsHistory.data.funds_history)
    setFundsActivesByUfs(fundsActivesByUfs.data.funds_actives)
    setFundsActivesByUfsAndFund(fundsActivesByUfsAndFunds.data.funds_actives)
    setFundsActives(fundsActives.data.funds_actives)
    setLoading(false)
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const handleFiltersSubmit = (activeFunds: string[] | null) => {
    setActiveFunds(activeFunds)

    fetchData(activeFunds)
  }

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
          <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {funds && funds.length && <Filters onSubmit={handleFiltersSubmit} />}
              </Grid>

              {/* Preço da Cota ao Longo do Tempo */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    ...basePaperProps,
                    width: '100%',
                    height: 550,
                    pb: 20,
                  }}
                >
                  {fundsHistory && fundsHistory.length && <ClosePriceOvertime fundsHistory={fundsHistory} />}
                </Paper>
              </Grid>

              {/* Preço dos Dividendos ao Longo do Tempo */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    ...basePaperProps,
                    width: '100%',
                    height: 550,
                    pb: 20,
                  }}
                >
                  {fundsHistory && fundsHistory.length && <DividendOvertime fundsHistory={fundsHistory} />}
                </Paper>
              </Grid>

              {/* Preço do Dividend Yield ao Longo do Tempo */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    ...basePaperProps,
                    width: '100%',
                    height: 550,
                    pb: 20,
                  }}
                >
                  {fundsHistory && fundsHistory.length && <DividendYieldOvertime fundsHistory={fundsHistory} />}
                </Paper>
              </Grid>


              {/* Fundos */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {funds && funds.length && <FundsTable funds={funds} />}
                </Paper>
              </Grid>

              {/* Ativos dos Fundos */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {fundsActives && fundsActives.length && <FundsActivesTable actives={fundsActives} />}
                </Paper>
              </Grid>

              {/* Ativos dos Fundos por Estado */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    ...basePaperProps,
                    width: '100%',
                    height: 600,
                    pb: 10,
                  }}
                >
                  {fundsActivesByUfs && fundsActivesByUfs.length && <FundsActivesByUfBarChart fundsActivesByUfs={fundsActivesByUfs} />}
                </Paper>
              </Grid>

              {/* Ativos dos Fundos por Estado & Fundo */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    ...basePaperProps,
                    width: '100%',
                    height: 600,
                    pb: 10,
                  }}
                >
                  {fundsActivesByUfsAndFund && fundsActivesByUfsAndFund.length && <FundsActivesByUfHeatmap fundsActivesByUfsAndFund={fundsActivesByUfsAndFund} />}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  )
}
