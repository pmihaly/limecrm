export default interface PictureInterface {
  _id: string;
  description: string;
  filename: string;
  filesize: number;
  pictureDimensions: { width: number; height: number };
  uploadDate: string;
  uploaderIp: string;
}
