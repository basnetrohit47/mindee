import React, { lazy, Suspense } from 'react'
import { Box, Button, Stack } from '@mui/material'
import Dropzone from 'react-dropzone'

import { CustomeAnnotationShape } from '../../../common/types'
import { useDocumentData } from '../hook/useDocumentData'
import AnnotationPlaceholder from './AnnotationPlaceholder'
import { DocumentStatus } from './DocumentStatus'

const LazyAnnotationViewer = lazy(() =>
  import('react-mindee-js').then((module) => ({
    default: module.AnnotationViewer,
  })),
)

interface Props {
  onShapeHover: (shape: CustomeAnnotationShape) => void
}
const DocumentInterface = React.memo(({ onShapeHover }: Props) => {
  console.log('document interface re-render')
  const {
    canPrediction,
    getPredictionShape,
    document,
    status,
    error,
    handleDocumentUpload,
    handleGetPrediction,
  } = useDocumentData()

  return (
    <Box sx={{ height: '100%' }}>
      <DocumentStatus documentStatus={status} documentError={error} />
      <Stack sx={{ height: '100%' }}>
        <Dropzone
          onDrop={(files) => handleDocumentUpload(files[0])}
          multiple={false}
        >
          {({ getRootProps, getInputProps, open }) => (
            <>
              <Stack
                sx={{
                  flexGrow: 1,
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  backgroundColor: document ? '#179a57' : '',
                }}
              >
                {document ? (
                  <Suspense fallback={<div>....Loading</div>}>
                    <LazyAnnotationViewer
                      onShapeMouseEnter={onShapeHover}
                      data={{
                        image: URL.createObjectURL(document),
                        shapes: getPredictionShape,
                      }}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 4,
                        background: '#179a57',
                      }}
                    />
                  </Suspense>
                ) : (
                  <Stack
                    sx={{ position: 'relative', flexGrow: 1 }}
                    {...getRootProps()}
                  >
                    <AnnotationPlaceholder />
                  </Stack>
                )}

                <input {...getInputProps()} />
              </Stack>

              <Stack
                direction="row"
                columnGap={2}
                sx={{ marginTop: 2, justifyContent: 'center' }}
              >
                <Button
                  variant="outlined"
                  onClick={() => open()}
                  sx={{ paddingInline: 2, textTransform: 'none' }}
                >
                  Upload document
                </Button>
                {canPrediction && (
                  <Button
                    onClick={handleGetPrediction}
                    variant="contained"
                    sx={{ paddingInline: 2, textTransform: 'none' }}
                  >
                    Make prediction
                  </Button>
                )}
              </Stack>
            </>
          )}
        </Dropzone>
      </Stack>
    </Box>
  )
})

export default DocumentInterface
