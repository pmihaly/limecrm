import { Router } from 'express';
import PicturesController from '@controllers/pictures.controller';
import { Routes } from '@interfaces/routes.interface';
import multer from 'multer';
import path from 'path';
import config from 'config';

class PicturesRoute implements Routes {
  public path = '/pictures';
  public router = Router();
  public picturesController = new PicturesController();

  private upload;

  constructor() {
    this.initializeMulter();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.picturesController.getPictures);
    this.router.get(`${this.path}/:id`, this.picturesController.getPictureById);
    this.router.post(`${this.path}`, this.upload.single('picture'), this.picturesController.createPicture);
    this.router.put(`${this.path}/:id`, this.upload.single('picture'), this.picturesController.updatePicture);
    this.router.delete(`${this.path}/:id`, this.picturesController.deletePicture);
  }

  private initializeMulter() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) =>
        cb(null, process.env.NODE_ENV === 'development' ? path.join(__dirname, config.get('uploads')) : config.get('uploads')),
      filename: (req, file, cb) => cb(null, `${new Date().toISOString()}_${file.originalname}`),
    });

    this.upload = multer({ storage });
  }
}

export default PicturesRoute;
