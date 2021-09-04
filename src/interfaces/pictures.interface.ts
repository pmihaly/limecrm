import { PictureDimensionsInterface } from './pictureDimensions.interface';

export interface Picture {
  _id: string;
  filename: string;
  filesize: number;
  pictureDimensions: PictureDimensionsInterface;
  uploaderIp: string | string[];
  uploadDate: string;
  description: string;
}
