import { Button, Stack } from '@mui/material'
import Dropzone from 'react-dropzone'
import { AnnotationShape, AnnotationViewer } from 'react-mindee-js'

import AnnotationPlaceholder from './AnnotationPlaceholder'

type DocumentInterfaceProps = {
  onShapeClick: (shape: AnnotationShape) => void
  document: File | null
  onClickUpload: (file: File) => void
  onClickPredict: () => void
  shapes?: object[] | []
  documentUploadSuccess: boolean
}

export default function DocumentInterface({
  document,
  onClickUpload,
  onClickPredict,
  onShapeClick,
  shapes = [],
  documentUploadSuccess,
}: DocumentInterfaceProps) {
  return (
    <Stack sx={{ height: '100%' }}>
      <Dropzone onDrop={(files) => onClickUpload(files[0])} multiple={false}>
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
                  onShapeMouseEnter={onShapeClick}
                  data={{
                    image: URL.createObjectURL(document),
                    shapes: shapes,
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
              {documentUploadSuccess && (
                <Button
                  variant="contained"
                  onClick={() => onClickPredict()}
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
  )
}
