import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

interface IProp{
  open: boolean;
  handleClose: () => void;
  itemId: string
  agreeFunction: (id: string) => void
  message: string;
}

const AlertDialog = ({open, handleClose, message, itemId ,agreeFunction}: IProp) => {

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{color: "white"}}
      >
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: "inherit"}}>cancel</Button>
          <Button onClick={async () => {
            await agreeFunction(itemId);
            handleClose()
          }} autoFocus sx={{color: "inherit"}}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertDialog;
