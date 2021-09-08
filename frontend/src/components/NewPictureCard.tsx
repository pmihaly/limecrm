import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import NewPictureDialog from './NewPictureDialog';

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
 * @return {JSX.Element}
 */
export default function NewPictureCard(props: INewPictureCardProps) {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Button startIcon={<AddIcon />} className={classes.addPictureButton} onClick={() => setDialogOpen(true)} id="uploadPictureDialogOpen">
          Upload a picture
        </Button>
        <NewPictureDialog open={dialogOpen} onDialogClose={() => setDialogOpen(false)}></NewPictureDialog>
      </CardContent>
    </Card>
  );
}
