import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { useAddDocument } from '../../../hook/useAddDocument'
import { documentResponse } from '../../../store/document.store'
import {
  predictionFields,
  predictionShapes,
} from '../../../store/prediction.store'

export const useDocumentData = () => {
  const [document, setDocument] = useState<File | null>(null)
  const [, setDocumentUploadResponse] = useAtom(documentResponse)
  const [getPredictionShape, setPredictionShape] = useAtom(predictionShapes)
  const [, setPredictionField] = useAtom(predictionFields)
  const [canPrediction, setCanPrediction] = useState<boolean>(false)
  const { mutateAsync: uploadDocument, data, status, error } = useAddDocument()

  useEffect(() => {
    if (document) {
      uploadDocument(document)
    }
  }, [document, uploadDocument])

  useEffect(() => {
    if (status === 'success') {
      setCanPrediction(true)
    } else {
      setCanPrediction(false)
      setPredictionShape([])
      setPredictionField([])
      setDocumentUploadResponse(undefined)
    }
  }, [status])

  const handleDocumentUpload = (file: File) => {
    setDocument(file)
  }

  const handleGetPrediction = () => {
    if (canPrediction) {
      setDocumentUploadResponse(data)
    }
  }
  return {
    handleDocumentUpload,
    handleGetPrediction,
    document,
    getPredictionShape,
    canPrediction,
    status,
    error,
  }
}
