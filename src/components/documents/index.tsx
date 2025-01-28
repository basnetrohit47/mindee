import { useCallback, useRef } from 'react'
import { Box } from '@mui/material'

import { CustomeAnnotationShape } from '../../common/types'
import { PredictionInterface } from '../prediction'
import DocumentInterface from './DocumentInterface'

const DocumentView = () => {
  const inputRefs = useRef<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>({})

  const onShapeHover = useCallback((shape: CustomeAnnotationShape) => {
    const element = inputRefs.current[shape.id]
    if (element) {
      if (element.tagName === 'TEXTAREA') {
        element.focus()
      } else if (element.tagName === 'DIV') {
        element.style.backgroundColor = shape.colorSet?.fill || 'blue'
      }
    }
  }, [])

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
            <PredictionInterface inputRefs={inputRefs} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DocumentView
