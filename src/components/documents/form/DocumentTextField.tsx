import { useEffect, useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { useAtom } from 'jotai'

import { CustomeAnnotationShape } from '../../../common/types'
import { useDebounce } from '../../../hook/useDebounce'
import { inputRefsAtom } from '../../../store/prediction.store'
import { LineItemTextField } from './LineItemTextField'

interface Props {
  field: CustomeAnnotationShape
}

export const DocumentTextField = ({ field }: Props) => {
  const [value, setValue] = useState(field.value)
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    if (debouncedValue) {
      // handleFieldChange(field, value)
    }
  }, [debouncedValue])
  const [, setInputRefs] = useAtom(inputRefsAtom)

  const addRef = (key: number, element: HTMLInputElement | HTMLDivElement) => {
    // Update the ref in the atom
    setInputRefs((prevRefs) => ({ ...prevRefs, [key]: element }))
  }

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
                itemName="description"
                itemValue={field.raw.description}
              />
              <LineItemTextField
                field={field}
                itemName="quantity"
                itemValue={field.raw.quantity}
              />
              <LineItemTextField
                field={field}
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
          onChange={(e) => setValue(e.target.value)}
          // inputRef={(el) => el && addRef(1, el)} // Store the reference to the input element in the atom
        />
      )}
    </Box>
  )
}
