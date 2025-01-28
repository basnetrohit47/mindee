import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material'

import { CustomeAnnotationShape } from '../../common/types'
import { PredictionModal } from '../../core/entities/models/prediction.model'
import DocumentUpdateForm from './form/DocumentUpdateForm'
import { PredictionResponse } from './form/PredictionResponse'
import { PredictionStatus } from './status/PredictionStatus'

interface Props {
  predictionResponse: PredictionModal | null | undefined
  predictionStatus: 'idle' | 'pending' | 'error' | 'success'
  predictionError: Error | null
  DocumentFields: CustomeAnnotationShape[]
  handleMouseLeave: () => void
  handleMouseHover: (field: CustomeAnnotationShape) => void
  handleFieldChange: (
    field: CustomeAnnotationShape,
    newValue: string,
    listName?: string,
  ) => void

  inputRefs: React.MutableRefObject<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>
}
export const PredictionInterface = ({
  DocumentFields,
  handleMouseLeave,
  handleMouseHover,
  handleFieldChange,
  inputRefs,
  predictionStatus,
  predictionResponse,
  predictionError,
}: Props) => {
  const [tabValue, setTabValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  return (
    <>
      {DocumentFields.length ? (
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
              DocumentFields={DocumentFields}
              handleMouseHover={handleMouseHover}
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
    </>
  )
}
