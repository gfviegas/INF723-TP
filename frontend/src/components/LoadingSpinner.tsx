import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

interface LoadingSpinnerProps {
  useBackdrop?: boolean
  color?: "inherit" | "primary" | "secondary" | undefined
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { useBackdrop, color } = props
  const style = {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3000,
  }

  if (useBackdrop) {
    return (
      <Backdrop open style={style}>
        <CircularProgress color={color || 'primary'} />
      </Backdrop>
    )
  }

  return (
    <div style={style}>
      <CircularProgress color={color || 'primary'} />
    </div>
  )

}


export default LoadingSpinner
