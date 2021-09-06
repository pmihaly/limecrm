import { makeStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import NewPictureDialog from './NewPictureDialog';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  card: {
    height: '12rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPictureButton: {
    color: theme.palette.primary.main,
  },
}));

export interface INewPictureCardProps {}

/**
 * Kép hozzáadása dialógust megynyitó gomb, a kép grid első eleme
 *
 * @export
 * @param {INewPictureCardProps} props
 * @return {React.Component}
 */
export default function NewPictureCard(props: INewPictureCardProps) {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Grid item key={0} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Button startIcon={<AddIcon />} className={classes.addPictureButton} onClick={() => setDialogOpen(true)}>
            Upload a picture
          </Button>
          <NewPictureDialog open={dialogOpen} onDialogClose={() => setDialogOpen(false)}></NewPictureDialog>
        </CardContent>
      </Card>
    </Grid>
  );
}
