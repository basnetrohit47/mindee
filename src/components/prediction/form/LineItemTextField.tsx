import { useEffect, useState } from 'react'
import { Box, TextField } from '@mui/material'

import { CustomeAnnotationShape } from '../../../common/types'
import { useDebounce } from '../../../hook/useDebounce'

interface Props {
  itemName: string
  itemValue: string
  field: CustomeAnnotationShape
  inputRefs: React.MutableRefObject<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>
  handleFieldChange: (
    shape: CustomeAnnotationShape,
    value: string,
    listName?: string,
  ) => void
}

export const LineItemTextField = ({
  field,
  inputRefs,
  itemName,
  itemValue,
  handleFieldChange,
}: Props) => {
  const [value, setValue] = useState(itemValue)
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    if (debouncedValue) {
      handleFieldChange(field, value, itemName)
    }
  }, [debouncedValue])

  return (
    <Box width={'100%'}>
      <TextField
        FormHelperTextProps={{
          sx: { textAlign: 'right', width: '97%' }, // Styles for the helper text
        }}
        helperText={`Confidence Score: ${field.raw.confidence}`}
        key={field.id}
        sx={{
          width: '80%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'grey', // Default border color
              borderWidth: 2, // Optional: make border more prominent
            },
            '&:hover fieldset': {
              borderColor: field.colorSet?.stroke, // Hover border color
            },
            '&.Mui-focused fieldset': {
              borderColor: field.colorSet?.stroke, // Focused border color
            },
          },
        }}
        id={`outlined-basic-${field.id}`}
        variant="outlined"
        value={value || ''}
        label={itemName}
        multiline
        onChange={(e) => setValue(e.target.value)}
        inputRef={(el) => {
          inputRefs.current[field.id] = el
        }}
      />
    </Box>
  )
}
