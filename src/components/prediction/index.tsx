import React, { lazy, Suspense, useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'

import { usePredictionData } from './hook/usePredictionData'
import { PredictionStatus } from './status/PredictionStatus'

const LazyDocumentUpdateForm = lazy(() => import('./form/DocumentUpdateForm'))

interface Props {
  inputRefs: React.MutableRefObject<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>
}
export const PredictionInterface = ({ inputRefs }: Props) => {
  const { jobId, documentFields, data, error, status } = usePredictionData()
  const [tabValue, setTabValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  if (!jobId) {
    return (
      <Box display={'flex'} alignItems={'center'} height={'100%'}>
        <Typography>Your extracted data will display here</Typography>
      </Box>
    )
  }

  return (
    <>
      {documentFields.length ? (
        <>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Extracted data" />
            <Tab
              sx={{ textTransform: 'none' }}
              label={`API RESPONSE (${data?.document?.inference.processing_time?.toFixed(2)} s)`}
            />
          </Tabs>
          {tabValue === 0 && (
            <Suspense fallback={<div>...Loading</div>}>
              <LazyDocumentUpdateForm inputRefs={inputRefs} />
            </Suspense>
          )}
          {tabValue === 1 && (
            <Box
              width={'100%'}
              sx={{
                height: '70vh',
                overflow: 'scroll',
                textAlign: 'left',
                paddingLeft: '5rem',
              }}
            >
              <pre>{JSON.stringify(data?.document?.inference, null, 2)}</pre>
            </Box>
          )}
        </>
      ) : (
        <PredictionStatus predictionStatus={status} predictionError={error} />
      )}
    </>
  )
}
