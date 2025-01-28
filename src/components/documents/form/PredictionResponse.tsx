import { Box } from '@mui/material'

interface Props {
  predictionResponse: object | undefined
}
export const PredictionResponse = ({ predictionResponse }: Props) => {
  return (
    <>
      <Box
        width={'100%'}
        sx={{
          height: '70vh',
          overflow: 'scroll',
          textAlign: 'left',
          paddingLeft: '5rem',
        }}
      >
        <pre>{JSON.stringify(predictionResponse, null, 2)}</pre>
      </Box>
    </>
  )
}
