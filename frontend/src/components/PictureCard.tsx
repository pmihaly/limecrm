import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';
import React, { useState } from 'react';

import PictureInterface from '../interfaces/PictureInterface';

/**
 * Emberi szemmel olvasható formába hozza @param {number} size darab bájtot.
 *
 * @param {number} size
 * @return {string}
 */
function fileSize(size: number): string {
  const i: number = Math.floor(Math.log(size) / Math.log(1024));
  const fixed: any = (size / Math.pow(1024, i)).toFixed(2);
  return fixed * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export interface IPictureCardProps {
  picture: PictureInterface;
  onPictureURLCopy(): void;
}

const useStyles = makeStyles(theme => ({
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
}));

/**
 * Egy kép komponense
 * Felső jobb sarokban link másolás gomb, képre kattintva képmegtekintés, kártyára hover esetén metaadatok megjelenítése
 *
 * @export
 * @param {IPictureCardProps} props
 * @return {JSX.Element}
 */
export default function PictureCard(props: IPictureCardProps) {
  const classes = useStyles();

  const [cardSelected, setCardSelected] = useState(false);

  return (
    <Card className={classes.card} onMouseEnter={() => setCardSelected(true)} onMouseLeave={() => setCardSelected(false)}>
      <CardHeader
        action={
          <>
            <IconButton
              aria-label="copy picture url"
              onClick={() => {
                navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL || window.location.href}${props.picture.filename}`);
                props.onPictureURLCopy();
              }}
            >
              <LinkIcon />
            </IconButton>
          </>
        }
      />
      <a
        href={`${process.env.REACT_APP_API_URL || window.location.href}${props.picture.filename}`}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="pictureLink"
      >
        <CardMedia className={classes.cardMedia} image={`/${props.picture.filename}`} title={props.picture.filename} data-testid="picture" />
      </a>
      {cardSelected && (
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <ul>
              <li>Uploader Ip: {props.picture.uploaderIp}</li>
              <li>Upload date: {new Date(props.picture.uploadDate).toLocaleDateString()}</li>
              <li>
                Image res: {props.picture.pictureDimensions.width}x{props.picture.pictureDimensions.height}
              </li>
              <li>File size: {fileSize(props.picture.filesize)}</li>
            </ul>
          </Typography>
          <Typography>{props.picture.description}</Typography>
        </CardContent>
      )}
    </Card>
  );
}
