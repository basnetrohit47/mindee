import { useCallback, useEffect, useRef, useState } from 'react'

import { CustomeAnnotationShape } from '../common/types'
import { createUpdatedShapes } from '../utils/creatUpdateShapes'
import { getDocumentPrediction } from '../utils/documentCordination'
import { useAddDocument } from './useAddDocument'
import { useGetPrediction } from './useGetPrediction'

export const useDocumentProcessing = () => {
  const [document, setDocument] = useState<File | null>(null)
  const [shapes, setShapes] = useState<CustomeAnnotationShape[]>([])
  const inputRefs = useRef<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>({})
  const {
    mutate: uploadDocument,
    data: documentUploadResponse,
    error: documentError,
    status: documentStatus,
    isSuccess: documentUploadSuccess,
  } = useAddDocument()

  const {
    mutate: getPredict,
    data: predictionResponse,
    error: predictionError,
    isSuccess: predictionSuccess,
    status: predictionStatus,
  } = useGetPrediction()

  // Document Upload Handler
  const handleDocumentUpload = useCallback((file: File) => {
    setDocument(file)
    uploadDocument(file)
  }, [])

  // Prediction Request Handler
  const getPrediction = () => {
    if (documentUploadResponse) {
      getPredict(documentUploadResponse.job.id)
    }
  }
  const handleFieldChange = (
    item: CustomeAnnotationShape,
    newValue: string,
    listName?: string,
  ) => {
    const updatedFields = shapes.map((field) =>
      field.id === item.id
        ? {
            ...field,
            value: newValue,
            ChangedlistName: listName,
            isChanged: field.original !== newValue,
          }
        : field,
    )
    // const ssh = shapes.map((field) => {

    //   return field.id === item.id
    //     ? { ...field, value: newValue, isChanged: field.original !== newValue }
    //     : field
    // })

    setShapes(updatedFields)
  }
  // Prediction Response Update
  useEffect(() => {
    if (predictionResponse) {
      const shapes = getDocumentPrediction(
        predictionResponse.document?.inference.prediction,
      )
      setShapes(shapes)
    }
  }, [predictionResponse])

  // Shape Hover Handling
  const handleFieldHover = useCallback(
    (hoveredShape: CustomeAnnotationShape) => {
      setShapes((prevShapes) =>
        createUpdatedShapes(prevShapes, hoveredShape.id),
      )
    },
    [],
  )

  // Mouse Leave Handler
  const handleMouseLeave = useCallback(() => {
    setShapes((prevShapes) => createUpdatedShapes(prevShapes))
  }, [])

  const onShapeClick = useCallback((shape: CustomeAnnotationShape) => {
    const element = inputRefs.current[shape.id]

    if (element) {
      console.log('ele', element.tagName)
      if (element.tagName === 'INPUT') {
        element.focus()
      } else if (element.tagName === 'DIV') {
        console.log('its div')
        element.style.backgroundColor = shape.colorSet?.fill || 'blue'
      }
    }
  }, [])

  const onShapeLave = useCallback((shape: CustomeAnnotationShape) => {
    const element = inputRefs.current[shape.id]

    if (element) {
      console.log('ele', element.tagName)
      if (element.tagName === 'DIV') {
        console.log('its div')
        element.style.backgroundColor = 'transparent'
      }
    }
  }, [])
  return {
    document,
    shapes,
    inputRefs,
    handleDocumentUpload,
    getPrediction,
    handleFieldHover,
    handleMouseLeave,
    onShapeClick,
    documentUploadSuccess,
    documentUploadResponse,
    documentError,
    predictionSuccess,
    predictionError,
    predictionResponse,
    handleFieldChange,
    predictionStatus,
    documentStatus,
    onShapeLave,
  }
}
