import { Router } from 'express';
import PicturesController from '@controllers/pictures.controller';
import { CreatePictureDto } from '@dtos/pictures.dto';
import { Routes } from '@interfaces/routes.interface';

class PicturesRoute implements Routes {
  public path = '/pictures';
  public router = Router();
  public picturesController = new PicturesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.picturesController.getPictures);
    this.router.get(`${this.path}/:id`, this.picturesController.getPictureById);
    this.router.post(`${this.path}`, this.picturesController.createPicture);
    this.router.put(`${this.path}/:id`, this.picturesController.updatePicture);
    this.router.delete(`${this.path}/:id`, this.picturesController.deletePicture);
  }
}

export default PicturesRoute;
