import { useCallback, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { useAtom } from 'jotai'

import { CustomeAnnotationShape } from '../../common/types'
import { documentResponse } from '../../store/document.store'
import { predictionShapes } from '../../store/prediction.store'
import { createUpdatedShapes } from '../../utils/creatUpdateShapes'
import DocumentInterface from './DocumentInterface'
import { PredictionInterface } from './PredictionInterface'

const DocumentView = () => {
  const [getDocumentResponse] = useAtom(documentResponse)
  const inputRefs = useRef<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>({})

  const onShapeHover = useCallback((shape: CustomeAnnotationShape) => {
    const element = inputRefs.current[shape.id]
    console.log('ele', element?.tagName)
    if (element) {
      if (element.tagName === 'TEXTAREA') {
        element.focus()
      } else if (element.tagName === 'DIV') {
        element.style.backgroundColor = shape.colorSet?.fill || 'blue'
      }
    }
  }, [])

  const [, setPredictionShape] = useAtom(predictionShapes)

  const handleFieldHover = useCallback(
    (hoveredShape: CustomeAnnotationShape) => {
      setPredictionShape((prevShapes) =>
        createUpdatedShapes(prevShapes, hoveredShape.id),
      )
    },
    [setPredictionShape], // Dependency for the callback
  )

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
            <DocumentInterface onShapeHover={onShapeHover} />
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
              <PredictionInterface
                jobId={getDocumentResponse.job.id}
                inputRefs={inputRefs}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DocumentView
