import { useEffect } from 'react'
import { useAtom } from 'jotai'

import { useGetPredictions } from '../../../hook/useGetPrediction'
import { documentResponse } from '../../../store/document.store'
import {
  predictionFields,
  predictionShapes,
} from '../../../store/prediction.store'
import { getDocumentPrediction } from '../../../utils/documentCordination'

export const usePredictionData = () => {
  const [getDocumentResponse] = useAtom(documentResponse)
  const jobId = getDocumentResponse?.job.id

  const { data, error, isSuccess, status } = useGetPredictions(jobId)
  const [, setPredictionShape] = useAtom(predictionShapes)
  const [documentFields, setPredictionField] = useAtom(predictionFields)

  useEffect(() => {
    if (isSuccess && data) {
      const shapes = getDocumentPrediction(data.document?.inference.prediction)
      setPredictionShape(shapes)
      setPredictionField(JSON.parse(JSON.stringify(shapes))) // Deep clone using JSON methods
    }
  }, [data, isSuccess, setPredictionShape, setPredictionField])

  return {
    jobId,
    documentFields,
    data,
    error,
    status,
  }
}
