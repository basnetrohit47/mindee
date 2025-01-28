import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { useAtom } from 'jotai'

import { CustomeAnnotationShape } from '../../common/types'
import { useGetPredictions } from '../../hook/useGetPrediction'
import {
  predictionFields,
  predictionShapes,
} from '../../store/prediction.store'
import { getDocumentPrediction } from '../../utils/documentCordination'
import DocumentUpdateForm from './form/DocumentUpdateForm'
import { PredictionResponse } from './form/PredictionResponse'
import { PredictionStatus } from './status/PredictionStatus'

interface Props {
  jobId: string
  inputRefs: React.MutableRefObject<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>
  handleFieldHover: (shape: CustomeAnnotationShape) => void
}
export const PredictionInterface = ({
  jobId,
  inputRefs,
  handleFieldHover,
}: Props) => {
  const {
    data: predictionResponse,
    error: predictionError,
    isSuccess: predictionSuccess,
    status: predictionStatus,
  } = useGetPredictions(jobId)

  const [, setPredictionShape] = useAtom(predictionShapes)
  const [DocumentFields, setPredictionField] = useAtom(predictionFields)

  useEffect(() => {
    if (predictionSuccess && predictionResponse) {
      const shapes = getDocumentPrediction(
        predictionResponse.document?.inference.prediction,
      )
      setPredictionShape(shapes)
      setPredictionField(JSON.parse(JSON.stringify(shapes))) // Deep clone using JSON methods
    }
  }, [
    predictionResponse,
    predictionSuccess,
    setPredictionShape,
    setPredictionField,
  ])

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
              handleFieldHover={handleFieldHover}
              inputRefs={inputRefs}
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
