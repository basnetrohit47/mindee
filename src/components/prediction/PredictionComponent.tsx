import React, { useCallback, useEffect, useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { useAtom } from 'jotai'

import { CustomeAnnotationShape } from '../../common/types'
import { useGetPredictions } from '../../hook/useGetPrediction'
import {
  predictionFields,
  predictionShapes,
} from '../../store/prediction.store'
import { createUpdatedShapes } from '../../utils/creatUpdateShapes'
import { getDocumentPrediction } from '../../utils/documentCordination'
import DocumentUpdateForm from './form/DocumentUpdateForm'
import { PredictionResponse } from './PredictionResponse'
import { PredictionStatus } from './PredictionStatus'

interface Props {
  jobId: string
  inputRefs: React.MutableRefObject<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>
}
export const PredictionComponent = ({ jobId, inputRefs }: Props) => {
  const { data, error, isSuccess, status } = useGetPredictions(jobId)

  const [, setPredictionShape] = useAtom(predictionShapes)
  const [DocumentFields, setPredictionField] = useAtom(predictionFields)

  useEffect(() => {
    if (isSuccess && data) {
      const shapes = getDocumentPrediction(data.document?.inference.prediction)
      setPredictionShape(shapes)
      setPredictionField(JSON.parse(JSON.stringify(shapes))) // Deep clone using JSON methods
    }
  }, [data, isSuccess, setPredictionShape, setPredictionField])

  const [tabValue, setTabValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

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
      {DocumentFields.length ? (
        <>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Extracted data" />
            <Tab
              sx={{ textTransform: 'none' }}
              label={`API RESPONSE (${data?.document?.inference.processing_time?.toFixed(2)} s)`}
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
              predictionResponse={data?.document?.inference}
            />
          )}
        </>
      ) : (
        <PredictionStatus predictionStatus={status} predictionError={error} />
      )}
    </>
  )
}
