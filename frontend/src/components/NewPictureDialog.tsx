import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useRef, useState } from 'react';
import { usePictures } from '../context/PicturesContext';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  button: {
    marginTop: '1rem',
  },
}));

export interface INewPictureDialogProps {
  open: boolean;
  onDialogClose: () => void;
}

/**
 * Képfeltöltés dialógus
 * A képleírásból és a képből álló multipart formot gombnyomásra összeállítja és elküldi a szerverre
 * Sikeres képfeltöltésnél megváltoztatja a pictures contextet
 *
 * @export
 * @param {INewPictureDialogProps} props
 * @return {React.Component}
 */
export default function NewPictureDialog(props: INewPictureDialogProps) {
  const classes = useStyles();

  const { pictures, setPictures } = usePictures();

  const [description, setDescription] = useState<string>('');
  const [picture, setPicture] = useState<File | null>(null);

  const formRef = useRef<HTMLFormElement | undefined>();

  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Uploading picture</DialogTitle>
      <DialogContent>
        <DialogContentText>
          By uploading an image, you accept our <a href="/">Terms</a>
        </DialogContentText>
        <TextField autoFocus margin="dense" label="Picture description" rows={4} fullWidth multiline onChange={e => setDescription(e.target.value)} />
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={e => {
            const targetFiles = e.target.files;
            if (!targetFiles) {
              return;
            } else {
              setPicture(targetFiles[0]);
            }
          }}
        />
        <label htmlFor="contained-button-file">
          <Button className={classes.button} variant="contained" color="primary" component="span" startIcon={<PhotoCamera />}>
            Add image
          </Button>
        </label>
        <form id="upload_form" ref={formRef as any} encType="multipart/form-data"></form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.onDialogClose()}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            let form = new FormData(formRef.current);

            form.append('picture', picture as Blob);
            form.append('description', description);

            fetch('/pictures', {
              method: 'POST',
              body: form,
            })
              .then(res => res.json())
              .then(res => {
                setPictures([res.data, ...pictures]);
                props.onDialogClose();
              });
          }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
