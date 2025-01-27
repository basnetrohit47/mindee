import { Box, Typography } from '@mui/material'

interface Props {
  documentStatus: 'idle' | 'pending' | 'error' | 'success'
  documentError: Error | null
}
export const DocumentStatus = ({ documentStatus, documentError }: Props) => {
  return (
    <Box sx={{ textAlign: 'left' }}>
      {documentStatus === 'pending' && (
        <Typography>Document sending... </Typography>
      )}

      {documentStatus === 'error' && (
        <Typography>{documentError?.message}</Typography>
      )}
    </Box>
  )
}
