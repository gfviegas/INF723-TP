import React, { ReactNode, useState } from 'react'
import { FundsContext } from '../contexts/FundsContext'
import { fetchAllFunds } from '../services/api'
import { Fund } from '../types'
import { LoadingContext, LoadingContextProp } from './LoadingProvider'

interface Props {
  children: ReactNode
}

export const FundsProvider = ({ children }: Props) => {
  const { setLoading } = React.useContext<LoadingContextProp>(LoadingContext)
  const [activeFunds, setActiveFunds] = useState<string[] | null>(null)
  const [funds, setFunds] = useState<Fund[]>([])

  const fetchData = async () => {
    console.warn('FETCHING INITIAL DATA')
    setLoading(true)
    const fundsResponse = await fetchAllFunds()
    setFunds(fundsResponse.data.funds as Fund[])
    setLoading(false)
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const sectors = ([...new Set(funds?.map(f => f.sector))] as string[]).sort((a, b) => a.localeCompare(b))

  return <FundsContext.Provider value={{
    activeFunds,
    setActiveFunds,
    funds,
    sectors,
  }}>
    {children}
  </FundsContext.Provider>
}

export default FundsProvider
