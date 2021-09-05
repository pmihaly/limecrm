import { makeStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

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

export default function NewPictureCard(props: INewPictureCardProps) {
  const classes = useStyles();

  return (
    <Grid item key={0} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Button startIcon={<AddIcon />} className={classes.addPictureButton}>
            Add new picture
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
