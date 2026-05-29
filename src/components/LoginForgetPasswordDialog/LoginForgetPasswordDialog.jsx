import * as React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material';

const LoginForgetPasswordDialog = ({ formik, isOpen, handleSave, handleClose }) => {

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Password Request</DialogTitle>
        <DialogContent>
          <DialogContentText pb={3}>
            Please input your email to receive password instructions.
          </DialogContentText>
          <TextField
            label='Email'
            name='email'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values?.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email ? formik.errors.email : ""}
            error={formik.touched.email && Boolean(formik.errors.email)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant='contained'
            olor='secondary'
            disabled={formik.isSubmitting}
            onClick={handleSave}
            startIcon={formik.isSubmitting &&
              <CircularProgress size={30} color='warning' />
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LoginForgetPasswordDialog;