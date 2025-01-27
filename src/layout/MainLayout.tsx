import { ReactNode } from 'react'
import { Box } from '@mui/material'

interface Props {
  children: ReactNode
}
const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Box sx={{ padding: '1rem 1rem' }}></Box>
      <Box
        sx={{
          padding: '2rem 4rem',
          backgroundColor: '#edf2f6',
          height: '95vh',
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default MainLayout
