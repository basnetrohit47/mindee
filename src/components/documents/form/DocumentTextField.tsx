import { useEffect, useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'

import { CustomeAnnotationShape } from '../../../common/types'
import { useDebounce } from '../../../hook/useDebounce'
import { LineItemTextField } from './LineItemTextField'

interface Props {
  field: CustomeAnnotationShape
  handleFieldHover: (shape: CustomeAnnotationShape) => void

  inputRefs: React.MutableRefObject<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>
}

export const DocumentTextField = ({
  field,
  inputRefs,
  handleFieldHover,
}: Props) => {
  const [value, setValue] = useState(field.value)
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    if (debouncedValue) {
      // handleFieldChange(field, value)
    }
  }, [debouncedValue])

  return (
    <Box
      width={'80%'}
      display={'flex'}
      flexDirection={'column'}
      justifyItems={'right'}
    >
      {field.name === 'line_items' ? (
        <Box sx={{ margin: '1rem 0rem' }}>
          <Typography sx={{ textAlign: 'left', margin: '1rem 0rem' }}>
            Line Items
          </Typography>
          <Box sx={{ backgroundColor: '#d8d8d882' }}>
            <div style={{ padding: '1rem 0rem' }}>
              <LineItemTextField
                field={field}
                inputRefs={inputRefs}
                itemName="description"
                itemValue={field.raw.description}
              />
              <LineItemTextField
                field={field}
                inputRefs={inputRefs}
                itemName="quantity"
                itemValue={field.raw.quantity}
              />
              <LineItemTextField
                field={field}
                inputRefs={inputRefs}
                itemName="unit_price"
                itemValue={field.raw.unit_price}
              />
            </div>
          </Box>
        </Box>
      ) : (
        <TextField
          FormHelperTextProps={{
            sx: { textAlign: 'right', width: '100%' }, // Styles for the helper text
          }}
          helperText={`Confidence Score: ${field.confidence}`}
          key={field.id}
          sx={{
            width: '100%',
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
          onMouseOver={handleFieldHover}
          onChange={(e) => setValue(e.target.value)}
          inputRef={(el) => {
            inputRefs.current[field.id] = el
          }}
          // inputRef={(el) => el && addRef(1, el)} // Store the reference to the input element in the atom
        />
      )}
    </Box>
  )
}
