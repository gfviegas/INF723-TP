export const currencyFormatterMin = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: '2-digit',
  year: '2-digit',
})

export const dayFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
})

export const colors = [
    '#572b9e',
    '#069668',
    '#842411',
    '#fbbd13',
    '#9be0e6',
    '#214d4e',
    '#52ef99',
    '#d380d4',
    '#6c9999',
    '#add465',
    '#863563',
    '#e4ccf1',
    '#6108e8',
    '#ff3eb6',
    '#2282f5',
    '#9f89ab',
    '#4cf32c',
    '#efaa79',
    '#d6061a',
    '#21a708'
]
