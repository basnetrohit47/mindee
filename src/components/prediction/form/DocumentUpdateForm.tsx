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
}
const DocumentUpdateForm = ({ inputRefs }: Props) => {
  const [open, setOpen] = useState(false)
  const [DocumentFields] = useAtom(predictionFields)

  return (
    <>
      <Box width={'100%'}>
        <Box display={'flex'} sx={{ paddingBottom: '2rem', width: '90%' }}>
          <Box sx={{ marginLeft: 'auto' }} display={'flex'} gap={2}>
            <Button
              variant="contained"
              sx={{ marginLeft: 'auto' }}
              onClick={() => setOpen(true)}
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
              inputRefs={inputRefs}
            />
          ))}
        </Box>
        {open && (
          <ChangeReview
            handleClose={() => setOpen(false)}
            changeLog={DocumentFields}
          />
        )}
      </Box>
    </>
  )
}

export default DocumentUpdateForm
