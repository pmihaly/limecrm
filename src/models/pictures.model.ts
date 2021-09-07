import { model, Schema, Document } from 'mongoose';
import { Picture } from '@interfaces/pictures.interface';

const pictureSchema: Schema = new Schema({
  filename: {
    type: String,
    required: true,
    unique: true,
  },
  filesize: {
    type: Number,
    required: true,
  },
  pictureDimensions: {
    type: Object,
    required: true,
  },
  uploaderIp: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
});

const pictureModel = model<Picture & Document>('Picture', pictureSchema);

export default pictureModel;
