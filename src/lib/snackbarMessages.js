import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import Cancel from '@mui/icons-material/Cancel';

const DismissAction = (id) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <>
      <IconButton onClick={() => closeSnackbar(id)}><Cancel /></IconButton>
    </>
  );
};

const config = {
  error: {
    instructions: 'Please contact the Help Desk or Design Authority for assistance and try again later.',
    configuration: {
      autoHideDuration: 10000,
      variant: 'error',
      action: DismissAction,
      style: {
        color: 'white',
        whiteSpace: 'pre-line'
      }
    }
  },
  success: {
    configuration: {
      variant: 'success',
      style: {
        color: 'white',
        whiteSpace: 'pre-line'
      }
    }
  }
};
export default config;