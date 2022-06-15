import axios from 'axios'

export const API_URL = 'http://localhost:81'

export async function fetchAllFunds() {
  return axios.get(`${API_URL}/funds`)
}

export async function fetchAllFundsMetrics() {
  return axios.get(`${API_URL}/funds_metrics`)
}

export async function fetchFundsActives(only: string[] | null) {
  return axios.get(`${API_URL}/funds_actives`, {
    params: {
      only: (only && only.length) ? only.join(',') : undefined
    }
  })
}

export async function fetchFundsActivesByUfs(only: string[] | null) {
  return axios.get(`${API_URL}/funds_actives_by_ufs`, {
    params: {
      only: (only && only.length) ? only.join(',') : undefined
    }
  })
}

export async function fetchFundsActivesByUfsAndFunds(only: string[] | null) {
  return axios.get(`${API_URL}/funds_actives_by_ufs_and_funds`, {
    params: {
      only: (only && only.length) ? only.join(',') : undefined
    }
  })
}

export async function fetchAllFundsHistory(only: string[] | null) {
  return axios.get(`${API_URL}/funds_history`, {
    params: {
      only: (only && only.length) ? only.join(',') : undefined
    }
  })
}
