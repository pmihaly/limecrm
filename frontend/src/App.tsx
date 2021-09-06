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
import NewPictureCard from './components/NewPictureCard';
import { PicturesContext } from './context/PicturesContext';
import PictureInterface from './interfaces/PictureInterface';

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

/**
 * Őskomponens
 * Statejében tárolódnak a képek, amiket Context api-val kiszolgálunk a gyerekeknek
 * Tartalmaz egy appbart, a képek gridjét  (aminek első eleme a képfeltöltés gomb)
 * és egy alapból láthatatlan snackbart, ami kép URL másolás esetén visszajelzést ad a usernek
 *
 * @export
 * @return {React.Component}
 */
export default function App() {
  const classes = useStyles();

  const [pictures, setPictures] = useState<PictureInterface[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<String>('');

  function showSnackbar(message: string): void {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  }

  function onPictureURLCopy(): void {
    showSnackbar('Kép URL vágólapra másolva');
  }

  useEffect(() => {
    fetch('/pictures')
      .then(res => res.json())
      .then(res => setPictures(res.data));
  }, []);

  return (
    <PicturesContext.Provider value={{ pictures, setPictures }}>
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
            <NewPictureCard></NewPictureCard>
            {pictures.map(picture => (
              <PictureCard picture={picture} onPictureURLCopy={onPictureURLCopy}></PictureCard>
            ))}
          </Grid>
        </Container>
      </main>
    </PicturesContext.Provider>
  );
}
