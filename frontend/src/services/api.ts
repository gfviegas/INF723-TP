import axios from 'axios'

export const API_URL = 'http://localhost:81'

export async function fetchAllFunds() {
  return axios.get(`${API_URL}/funds`)
}

export async function fetchAllFundsMetrics() {
  return axios.get(`${API_URL}/funds_metrics`)
}
