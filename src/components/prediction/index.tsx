import React from 'react'
import { Box, Typography } from '@mui/material'
import { useAtom } from 'jotai'

import { documentResponse } from '../../store/document.store'
import { PredictionComponent } from './PredictionComponent'

interface Props {
  inputRefs: React.MutableRefObject<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>
}
export const PredictionInterface = ({ inputRefs }: Props) => {
  const [getDocumentResponse] = useAtom(documentResponse)

  return (
    <>
      <Typography>{getDocumentResponse?.job.id}</Typography>
      {getDocumentResponse ? (
        <PredictionComponent
          jobId={getDocumentResponse.job.id}
          inputRefs={inputRefs}
        />
      ) : (
        <Box display={'flex'} alignItems={'center'} height={'100%'}>
          <Typography>Your extracted data will display here</Typography>
        </Box>
      )}
    </>
  )
}
