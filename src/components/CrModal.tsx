import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CrGrid from './CrGrid';
import { Box } from '@mui/material';


interface Props {
    open: boolean;
    handleClose: () => void,
    handleCancelar?: () => void,
    title: string;
    description: string;
    image: string;
    nombreButton: string;
    nombreButtonCancelar?: string;
    puedeCancelar?: boolean; 
  }

export default function CrModal({open, handleClose,handleCancelar, title, description, image, nombreButton,nombreButtonCancelar, puedeCancelar = false}: Props) {


  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        </DialogTitle>
        <DialogContent>
          <CrGrid title={title}  description = {description}  image = {image}>
          </CrGrid>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>

        <Box>
            {puedeCancelar && (
              <Button onClick={handleCancelar} autoFocus>
                {nombreButtonCancelar}
              </Button>
            )}
          </Box>

          <Box>
            <Button onClick={handleClose} autoFocus>
              {nombreButton}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
