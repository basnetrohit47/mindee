import { useEffect, useState } from 'react'
import { Box, TextField } from '@mui/material'

import { CustomeAnnotationShape } from '../../../common/types'
import { useDebounce } from '../../../hook/useDebounce'

interface Props {
  field: CustomeAnnotationShape
  handleMouseLeave: () => void
  handleFieldChange: (item: CustomeAnnotationShape, value: string) => void
  handleMouseHover: (field: CustomeAnnotationShape) => void
  inputRefs: React.MutableRefObject<{ [key: number]: HTMLInputElement | null }>
}
export const DocumentTextField = ({
  field,
  handleMouseHover,
  handleMouseLeave,
  inputRefs,
  handleFieldChange,
}: Props) => {
  const [value, setValue] = useState(field.value)
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    if (debouncedValue) {
      handleFieldChange(field, value)
    }
  }, [debouncedValue])

  return (
    <Box width={'100%'}>
      <TextField
        FormHelperTextProps={{
          sx: { textAlign: 'right', width: '97%' }, // Styles for the helper text
        }}
        helperText={`Confidence Score: ${field.confidence}`}
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
        value={value}
        label={field.name}
        multiline
        onChange={(e) => setValue(e.target.value)}
        onMouseEnter={() => handleMouseHover(field)}
        onMouseLeave={handleMouseLeave}
        inputRef={(el) => {
          inputRefs.current[field.id] = el
        }}
      />
    </Box>
  )
}
