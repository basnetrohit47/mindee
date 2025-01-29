import { Box, Typography } from '@mui/material'

import { CustomeAnnotationShape } from '../../../common/types'
import { LineItemTextField } from './LineItemTextField'

interface Props {
  field: CustomeAnnotationShape
  inputRefs: React.MutableRefObject<{
    [key: number]: HTMLInputElement | HTMLDivElement | null
  }>
}

export const DocumentTextField = ({ field, inputRefs }: Props) => {
  const lineItems = ['description', 'quantity', 'unit_price']

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
              // ref={(el) => {
              //   inputRefs.current[field.id] = el
              // }}
            >
              {lineItems.map((line) => (
                <LineItemTextField
                  field={field}
                  inputRefs={inputRefs}
                  itemName={line}
                  itemValue={field.raw[line]}
                />
              ))}
            </div>
          </Box>
        </Box>
      ) : (
        <LineItemTextField
          field={field}
          inputRefs={inputRefs}
          itemValue={field.value}
        />
      )}
    </Box>
  )
}
