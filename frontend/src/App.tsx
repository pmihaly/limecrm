import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function fileSize(size: number) {
  const i: number = Math.floor(Math.log(size) / Math.log(1024));
  const fixed: any = (size / Math.pow(1024, i)).toFixed(2);
  return fixed * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export default function Album() {
  const classes = useStyles();

  const [pictures, setPictures] = useState<any[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<String>('');

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
          <Grid container spacing={4}>
            {pictures.map(picture => (
              <Grid item key={picture._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardHeader
                    action={
                      <>
                        <IconButton
                          aria-label="copy picture url"
                          onClick={() => {
                            navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL}/${picture.filename}`);
                            setSnackbarMessage('Kép URL vágólapra másolva');
                            setSnackbarOpen(true);
                          }}
                        >
                          <LinkIcon />
                        </IconButton>
                      </>
                    }
                  />
                  <a href={`${process.env.REACT_APP_API_URL}/${picture.filename}`} target="_blank" rel="noopener noreferrer">
                    <CardMedia className={classes.cardMedia} image={`/${picture.filename}`} title="Image title" />
                  </a>
                  <CardContent className={classes.cardContent}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      {picture.uploaderIp}, {picture.pictureDimensions.width}x{picture.pictureDimensions.height}, {fileSize(picture.filesize)}
                    </Typography>
                    <Typography>{picture.description}</Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
