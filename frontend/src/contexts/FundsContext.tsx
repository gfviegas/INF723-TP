import React, { createContext } from 'react'
import { Fund } from '../types'

export interface FundsContextInterface {
  funds: Fund[]
  sectors: string[]
  activeFunds: string[] | null
  setActiveFunds: React.Dispatch<React.SetStateAction<string[] | null>>
}

export const FundsContext = createContext<FundsContextInterface>({} as FundsContextInterface)
