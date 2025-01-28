import { Box, Button, Modal, Typography } from '@mui/material'

import { CustomeAnnotationShape } from '../../../common/types'

interface Props {
  handleClose: () => void
  changeLog: CustomeAnnotationShape[]
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}
export const ChangeReview = ({ handleClose, changeLog }: Props) => {
  const getChangeValues = changeLog.filter((item) => item.isChanged)
  const handleUpdate = () => {
    handleClose()
  }
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ height: '60vh', overflow: 'scroll' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Update
          </Typography>

          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {getChangeValues.length > 0 ? (
              <div>
                {getChangeValues.map((item) => (
                  <Box key={item.id} sx={{ textAlign: 'left' }}>
                    <Typography
                      sx={{
                        color: 'gray',
                        marginTop: '1rem',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {item.name} ({item.ChangedlistName})
                    </Typography>
                    <Box display={'flex'} gap={2}>
                      <Typography sx={{ color: '#367c36' }}>
                        {item.value}
                      </Typography>
                      <Typography
                        sx={{
                          marginLeft: 'auto',
                          textDecoration: 'line-through',
                        }}
                      >
                        {item.isList
                          ? item.raw[item.ChangedlistName]
                          : item.original}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </div>
            ) : (
              <Box>
                <Typography>No updates Found</Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          {getChangeValues.length > 0 ? (
            <Button variant="contained" onClick={handleUpdate}>
              Confirm
            </Button>
          ) : (
            <Button variant="contained" onClick={handleUpdate}>
              Close
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  )
}
