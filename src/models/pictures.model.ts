import { model, Schema, Document } from 'mongoose';
import { Picture } from '@interfaces/pictures.interface';

const pictureSchema: Schema = new Schema({
  filename: {
    type: String,
    required: true,
    unique: true,
  },
  uploaderIp: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const pictureModel = model<Picture & Document>('Picture', pictureSchema);

export default pictureModel;
