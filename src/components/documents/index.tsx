import { Box } from '@mui/material'

import { useDocumentProcessing } from '../../hook/useDocumentProcessing'
import DocumentInterface from './DocumentInterface'
import { PredictionInterface } from './PredictionInterface'
import { DocumentStatus } from './status/DocumentStatus'

const DocumentView = () => {
  const {
    document,
    shapes,
    inputRefs,
    handleDocumentUpload,
    getPrediction,
    handleFieldHover,
    handleMouseLeave,
    onShapeClick,
    documentUploadSuccess,
    documentError,
    documentStatus,
    predictionError,
    predictionResponse,
    handleFieldChange,
    predictionStatus,
    onShapeLave,
    fields,
  } = useDocumentProcessing()

  return (
    <>
      <Box sx={{ height: '80vh', margin: '1rem', maxWidth: '100%' }}>
        <DocumentStatus
          documentStatus={documentStatus}
          documentError={documentError}
        />

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
            <DocumentInterface
              onShapeClick={onShapeClick}
              document={document}
              shapes={shapes}
              documentUploadSuccess={documentUploadSuccess}
              onClickUpload={handleDocumentUpload}
              onClickPredict={getPrediction}
              onShapeLave={onShapeLave}
            />
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
            <PredictionInterface
              DocumentFields={fields}
              handleMouseHover={handleFieldHover}
              inputRefs={inputRefs}
              handleMouseLeave={handleMouseLeave}
              handleFieldChange={handleFieldChange}
              predictionResponse={predictionResponse}
              predictionStatus={predictionStatus}
              predictionError={predictionError}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DocumentView
