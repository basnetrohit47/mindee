import { useEffect, useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'

import { CustomeAnnotationShape } from '../../../common/types'
import { useDebounce } from '../../../hook/useDebounce'
import { LineItemTextField } from './LineItemTextField'

interface Props {
  field: CustomeAnnotationShape
  handleMouseLeave: () => void
  handleFieldChange: (item: CustomeAnnotationShape, value: string) => void
  handleMouseHover: (field: CustomeAnnotationShape) => void
  inputRefs: React.MutableRefObject<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>
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
            <div
              style={{ padding: '1rem 0rem' }}
              ref={(el) => {
                inputRefs.current[field.id] = el
              }}
            >
              <LineItemTextField
                field={field}
                itemName="description"
                itemValue={field.raw.description}
                handleMouseLeave={handleMouseLeave}
                handleFieldChange={handleFieldChange}
                inputRefs={inputRefs}
                handleMouseHover={handleMouseHover}
              />
              <LineItemTextField
                field={field}
                itemName="quantity"
                itemValue={field.raw.quantity}
                handleMouseLeave={handleMouseLeave}
                handleFieldChange={handleFieldChange}
                inputRefs={inputRefs}
                handleMouseHover={handleMouseHover}
              />
              <LineItemTextField
                field={field}
                itemName="unit_price"
                itemValue={field.raw.unit_price}
                handleMouseLeave={handleMouseLeave}
                handleFieldChange={handleFieldChange}
                inputRefs={inputRefs}
                handleMouseHover={handleMouseHover}
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
          onChange={(e) => setValue(e.target.value)}
          onMouseEnter={() => handleMouseHover(field)}
          onMouseLeave={handleMouseLeave}
          inputRef={(el) => {
            inputRefs.current[field.id] = el
          }}
        />
      )}
    </Box>
  )
}
