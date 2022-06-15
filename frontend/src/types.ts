export interface Fund {
  id: number
  code: string
  sector: string
}

export interface FundActive {
  address: string
  area?: string
  city?: string
  code: string
  id: number
  neighborhood: string
  uf: string
}

export interface FundActiveByUf {
  uf: string
  count: number
}

export interface FundActiveByUfAndFund {
  uf: string
  count: number
  code: string
}

export interface FundHistory {
  close_price: number
  code: string
  date: string | Date | number,
  dividend: number
  dividend_yield: number
  prediction: boolean
}

export interface FundMetric {
  assets_quality: number
  code: string
  current_price: number
  daily_liquidity: number
  dividend: number
  dividend_yield: number
  dy_12m_accumulated: number
  dy_12m_average: number
  dy_3m_accumulated: number
  dy_3m_average: number
  dy_6m_accumulated: number
  dy_6m_average: number
  dy_year: number
  equity_dy: number
  equity_return_accumulated: number
  equity_return_period: number
  equity_variation: number
  financial_vacancy: number
  id: number
  income_accumulated: number
  income_period: number
  net_worth: number
  p_vpa: number
  physical_vacancy: number
  price_variation: number
  sector: string
  vpa: number
}
