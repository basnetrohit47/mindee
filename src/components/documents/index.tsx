import { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'

import { useDocumentProcessing } from '../../hook/useDocumentProcessing'
import DocumentInterface from './DocumentInterface'
import DocumentUpdateForm from './form/DocumentUpdateForm'
import { PredictionResponse } from './form/PredictionResponse'
import { DocumentStatus } from './status/DocumentStatus'
import { PredictionStatus } from './status/PredictionStatus'

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
  } = useDocumentProcessing()
  const [tabValue, setTabValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

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
            {shapes.length ? (
              <>
                <Tabs value={tabValue} onChange={handleChange}>
                  <Tab label="Extracted data" />
                  <Tab
                    sx={{ textTransform: 'none' }}
                    label={`API RESPONSE (${predictionResponse?.document?.inference.processing_time?.toFixed(2)} s)`}
                  />
                </Tabs>
                {tabValue === 0 && (
                  <DocumentUpdateForm
                    DocumentFields={shapes}
                    handleMouseHover={handleFieldHover}
                    handleMouseLeave={handleMouseLeave}
                    inputRefs={inputRefs}
                    handleFieldChange={handleFieldChange}
                  />
                )}
                {tabValue === 1 && (
                  <PredictionResponse
                    predictionResponse={predictionResponse?.document?.inference}
                  />
                )}
              </>
            ) : (
              <PredictionStatus
                predictionStatus={predictionStatus}
                predictionError={predictionError}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DocumentView
