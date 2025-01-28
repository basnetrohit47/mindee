import React, { useEffect, useState } from 'react'
import { Box, Button, Stack } from '@mui/material'
import { useAtom } from 'jotai'
import Dropzone from 'react-dropzone'
import { AnnotationViewer } from 'react-mindee-js'

import { CustomeAnnotationShape } from '../../common/types'
import { useAddDocument } from '../../hook/useAddDocument'
import { documentResponse } from '../../store/document.store'
import {
  predictionFields,
  predictionShapes,
} from '../../store/prediction.store'
import AnnotationPlaceholder from './AnnotationPlaceholder'
import { DocumentStatus } from './DocumentStatus'

interface Props {
  onShapeHover: (shape: CustomeAnnotationShape) => void
}
const DocumentInterface = React.memo(({ onShapeHover }: Props) => {
  const [document, setDocument] = useState<File | null>(null)
  const [, setDocumentUploadResponse] = useAtom(documentResponse)
  const [getPredictionShape, setPredictionShape] = useAtom(predictionShapes)
  // const [, setPredictionField] = useAtom(predictionFields)
  const [canPrediction, setCanPrediction] = useState<boolean>(false)

  const {
    mutateAsync: uploadDocument,
    data: documentUploadResponse,
    status: documentUploadStatus,
    error: documentUploadError,
  } = useAddDocument()

  useEffect(() => {
    if (document) {
      uploadDocument(document)
    }
  }, [document, uploadDocument])

  useEffect(() => {
    if (documentUploadStatus === 'success') {
      setCanPrediction(true)
    } else {
      setCanPrediction(false)
      setPredictionShape([])
      // setPredictionField([])
      setDocumentUploadResponse(undefined)
    }
  }, [documentUploadStatus])

  const handleDocumentUpload = (file: File) => {
    setDocument(file)
    // uploadDocument(file)
  }

  const handleGetPrediction = () => {
    if (canPrediction) {
      setDocumentUploadResponse(documentUploadResponse)
    }
  }
  console.log('document interface re-render')

  return (
    <Box sx={{ height: '100%' }}>
      <DocumentStatus
        documentStatus={documentUploadStatus}
        documentError={documentUploadError}
      />
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
                  <AnnotationViewer
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
