import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        ADD TRAINEE
      </Button>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your trainee details
          </DialogContentText>
          <div>
            <TextField required id="outlined-required" label="Name" defaultValue=" " variant="outlined" fullWidth />
          </div>
          &nbsp;
          <div>
            <TextField required id="outlined-required" label="Email Address" defaultValue=" " variant="outlined" fullWidth />
          </div>
          &nbsp;
          <div>
            <TextField required id="outlined-required" label="Password" defaultValue=" " variant="outlined" />
            <TextField required id="outlined-required" label="Confirm Password" defaultValue=" " variant="outlined" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
