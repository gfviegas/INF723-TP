import React, { useState, createContext } from 'react'

import LoadingSpinner from '../components/LoadingSpinner'

export const LoadingContext = createContext<any>(null)

export interface LoadingContextProp {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingProvider = (props: { children: any }) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {props.children}

      {Boolean(loading) && <LoadingSpinner useBackdrop color='primary' />}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
