import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import PictureCard from './components/PictureCard';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Album() {
  const classes = useStyles();

  const [pictures, setPictures] = useState<any[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<String>('');

  function showCopiedSnackbar() {
    setSnackbarMessage('Kép URL vágólapra másolva');
    setSnackbarOpen(true);
  }

  useEffect(() => {
    fetch('/pictures')
      .then(res => res.json())
      .then(res => setPictures(res.data));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            LimeCRM
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            message={snackbarMessage}
            onClose={() => setSnackbarOpen(false)}
            action={
              <React.Fragment>
                <Button color="secondary" size="small" onClick={() => setSnackbarOpen(false)}>
                  Ok
                </Button>
              </React.Fragment>
            }
          />
          <Grid container spacing={4} alignItems="flex-start">
            {pictures.map(picture => (
              <PictureCard picture={picture} showCopiedSnackbar={showCopiedSnackbar}></PictureCard>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
