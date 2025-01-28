import React from 'react'
import { Box, Typography } from '@mui/material'

interface Props {
  predictionStatus: 'pending' | 'error' | 'success'
  predictionError: Error | null
}
export const PredictionStatus = React.memo(
  ({ predictionStatus, predictionError }: Props) => {
    console.log('prediction re-rendered')

    return (
      <Box display={'flex'} alignItems={'center'} height={'100%'}>
        {predictionStatus === 'pending' && (
          <Typography>Data Extracting .... </Typography>
        )}

        {predictionStatus === 'error' && (
          <Typography>{predictionError?.message}</Typography>
        )}
      </Box>
    )
  },
)
