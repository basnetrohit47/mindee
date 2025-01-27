import React, { useState } from 'react'
import { Box, Button } from '@mui/material'

import { CustomeAnnotationShape } from '../../../common/types'
import { ChangeReview } from './ChangeReview'
import { DocumentTextField } from './DocumentTextField'

interface Props {
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
const DocumentUpdateForm = ({
  DocumentFields,
  handleMouseLeave,
  handleMouseHover,
  handleFieldChange,
  inputRefs,
}: Props) => {
  console.log('rendinf update')

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const showReview = () => {
    setOpen(true)
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
              key={field.id}
              field={field}
              handleMouseHover={handleMouseHover}
              handleMouseLeave={handleMouseLeave}
              inputRefs={inputRefs}
              handleFieldChange={handleFieldChange}
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
