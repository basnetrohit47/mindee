import { Box, Typography } from '@mui/material'
import { useAtom } from 'jotai'

import { documentResponse } from '../../store/document.store'
import DocumentInterface from './DocumentInterface'
import { PredictionInterface } from './PredictionInterface'

const DocumentView = () => {
  const [getDocumentResponse] = useAtom(documentResponse)

  return (
    <>
      <Box sx={{ height: '80vh', margin: '1rem', maxWidth: '100%' }}>
        <Box
          display="flex"
          sx={{ width: '100%', height: '80vh' }}
          position="relative"
        >
          <Box
            position="relative"
            sx={{
              margin: '10px',
              width: '50%',
            }}
          >
            <DocumentInterface />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
            position="relative"
            gap={2}
            sx={{
              width: '50%',
              padding: '1rem',
              paddingTop: '1rem',
            }}
          >
            <Typography>jobid:{getDocumentResponse?.job.id}</Typography>
            {getDocumentResponse && (
              <PredictionInterface jobId={getDocumentResponse.job.id} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DocumentView
