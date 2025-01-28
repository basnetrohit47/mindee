import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { useAtom } from 'jotai'

import { CustomeAnnotationShape } from '../../../common/types'
import { predictionFields } from '../../../store/prediction.store'
import { ChangeReview } from './ChangeReview'
import { DocumentTextField } from './DocumentTextField'

interface Props {
  inputRefs: React.MutableRefObject<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>
  handleFieldHover: (shape: CustomeAnnotationShape) => void
}
const DocumentUpdateForm = ({ inputRefs, handleFieldHover }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const showReview = () => {
    setOpen(true)
  }

  const [DocumentFields, setPredictionField] = useAtom(predictionFields)
  const handleFieldChange = (
    item: CustomeAnnotationShape,
    newValue: string,
    listName?: string,
  ) => {
    const updatedFields = DocumentFields.map((field) =>
      field.id === item.id
        ? {
            ...field,
            value: newValue,
            ChangedlistName: listName,
            isChanged: field.original !== newValue,
          }
        : field,
    )
    setPredictionField(updatedFields)
  }

  return (
    <>
      <Box width={'100%'}>
        <Box display={'flex'} sx={{ paddingBottom: '2rem', width: '90%' }}>
          <Box sx={{ marginLeft: 'auto' }} display={'flex'} gap={2}>
            <Button
              variant="contained"
              sx={{ marginLeft: 'auto' }}
              onClick={showReview}
            >
              Update
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: '60vh', overflow: 'scroll', paddingTop: '1rem' }}>
          {DocumentFields.map((field: CustomeAnnotationShape) => (
            <DocumentTextField
              handleFieldHover={handleFieldHover}
              handleFieldChange={handleFieldChange}
              key={field.id}
              field={field}
              inputRefs={inputRefs}
            />
          ))}
        </Box>
        {open && (
          <ChangeReview handleClose={handleClose} changeLog={DocumentFields} />
        )}
      </Box>
    </>
  )
}

export default DocumentUpdateForm
