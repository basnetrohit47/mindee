import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { CustomeAnnotationShape } from '../../../common/types'
import { useDebounce } from '../../../hook/useDebounce'
import {
  predictionFields,
  predictionShapes,
} from '../../../store/prediction.store'
import { createUpdatedShapes } from '../../../utils/creatUpdateShapes'

export const useFieldUpdate = (
  field: CustomeAnnotationShape,
  itemValue: string,
  itemName?: string,
) => {
  const [value, setValue] = useState(itemValue)
  const debouncedValue = useDebounce(value)
  const [documentFields, setPredictionField] = useAtom(predictionFields)
  const [, setPredictionShape] = useAtom(predictionShapes)

  useEffect(() => {
    if (debouncedValue) {
      handleFieldChange(field, debouncedValue, itemName)
    }
  }, [debouncedValue])

  const handleFieldChange = (
    item: CustomeAnnotationShape,
    newValue: string,
    listName?: string,
  ) => {
    const updatedFields = documentFields.map((f) =>
      f.id === item.id
        ? {
            ...f,
            value: newValue,
            ChangedlistName: listName,
            isChanged: f.original !== newValue,
          }
        : f,
    )
    setPredictionField(updatedFields)
  }

  const handleFieldHover = (hoveredShape: CustomeAnnotationShape) => {
    setPredictionShape((prevShapes) =>
      createUpdatedShapes(prevShapes, hoveredShape.id),
    )
  }

  return {
    value,
    setValue,
    handleFieldHover,
  }
}
