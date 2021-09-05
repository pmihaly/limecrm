import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  button: {
    marginTop: '1rem',
  },
  terms: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}));

export interface INewPictureDialogProps {
  open: boolean;
  onDialogClose: () => void;
}

export default function NewPictureDialog(props: INewPictureDialogProps) {
  const classes = useStyles();

  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Uploading picture</DialogTitle>
      <DialogContent>
        <DialogContentText>
          By uploading an image, you accept our <span className={classes.terms}>Terms</span>
        </DialogContentText>
        <TextField autoFocus margin="dense" label="Picture description" rows={4} fullWidth multiline />
        <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" />
        <label htmlFor="contained-button-file">
          <Button className={classes.button} variant="contained" color="primary" component="span" startIcon={<PhotoCamera />}>
            Upload
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.onDialogClose()}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => props.onDialogClose()}>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
