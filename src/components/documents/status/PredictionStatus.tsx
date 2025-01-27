import React from 'react'
import { Box, Typography } from '@mui/material'

interface Props {
  predictionStatus: 'idle' | 'pending' | 'error' | 'success'
  predictionError: Error | null
}
export const PredictionStatus = ({
  predictionStatus,
  predictionError,
}: Props) => {
  return (
    <Box display={'flex'} alignItems={'center'} height={'100%'}>
      {predictionStatus === 'idle' && (
        <Typography>Your Extracted Data will display here</Typography>
      )}
      {predictionStatus === 'pending' && (
        <Typography>Data Extracting .... </Typography>
      )}

      {predictionStatus === 'error' && (
        <Typography>{predictionError?.message}</Typography>
      )}
    </Box>
  )
}
