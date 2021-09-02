import { NextFunction, Request, Response } from 'express';
import { CreatePictureDto } from '@dtos/pictures.dto';
import { Picture } from '@interfaces/pictures.interface';
import pictureService from '@services/pictures.service';

class PicturesController {
  public pictureService = new pictureService();

  public getPictures = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPicturesData: Picture[] = await this.pictureService.findAllPicture();

      res.status(200).json({ data: findAllPicturesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPictureById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pictureId: string = req.params.id;
      const findOnePictureData: Picture = await this.pictureService.findPictureById(pictureId);

      res.status(200).json({ data: findOnePictureData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPicture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "'picture': Picture needed" });
      }

      const pictureData: CreatePictureDto = req.body;
      pictureData.filename = req.file.filename;
      const createPictureData: Picture = await this.pictureService.createPicture(pictureData);

      res.status(201).json({ data: createPictureData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePicture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pictureId: string = req.params.id;
      const pictureData: CreatePictureDto = req.body;
      const updatePictureData: Picture = await this.pictureService.updatePicture(pictureId, pictureData);

      res.status(200).json({ data: updatePictureData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePicture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pictureId: string = req.params.id;
      const deletePictureData: Picture = await this.pictureService.deletePicture(pictureId);

      res.status(200).json({ data: deletePictureData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PicturesController;
