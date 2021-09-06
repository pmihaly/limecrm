import { NextFunction, Request, Response } from 'express';
import { CreatePictureDto } from '@dtos/pictures.dto';
import { Picture } from '@interfaces/pictures.interface';
import pictureService from '@services/pictures.service';

// @ts-ignore
import sizeOf from 'image-size';
import { PictureDimensionsInterface } from '@/interfaces/pictureDimensions.interface';

/**
 * Pictures CRUD, child methods get called from PicturesRoute
 *
 * @class PicturesController
 */
class PicturesController {
  /**
   * Operations with pictures comes from here
   *
   * @memberof PicturesController
   */
  public pictureService = new pictureService();

  /**
   * Find all pictures
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof PicturesController
   */
  public getPictures = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPicturesData: Picture[] = await this.pictureService.findAllPicture();

      res.status(200).json({ data: findAllPicturesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get a specific picture by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof PicturesController
   */
  public getPictureById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pictureId: string = req.params.id;
      const findOnePictureData: Picture = await this.pictureService.findPictureById(pictureId);

      res.status(200).json({ data: findOnePictureData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a new picture, needs picture file to be uploaded in multipart form
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof PicturesController
   */
  public createPicture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "'picture': Picture needed" });
      }

      const { description } = req.body;
      const { filename, size } = req.file;
      const { width, height } = await sizeOf(req.file.path);

      const pictureDimensions: PictureDimensionsInterface = { width, height };

      const pictureData: CreatePictureDto = {
        filename,
        filesize: size,
        pictureDimensions,
        uploaderIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        uploadDate: new Date(Date.now()).toISOString(),
        description,
      };

      const createPictureData: Picture = await this.pictureService.createPicture(pictureData);

      res.status(201).json({ data: createPictureData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update a picture by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof PicturesController
   */
  public updatePicture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pictureId: string = req.params.id;

      console.log(req.file);

      if (!req.file) {
        res.status(400).json({ message: "'picture': Picture needed" });
      }

      const { description } = req.body;
      const { filename, size } = req.file;
      const { width, height } = await sizeOf(req.file.path);

      const pictureDimensions: PictureDimensionsInterface = { width, height };

      const pictureData: CreatePictureDto = {
        filename,
        filesize: size,
        pictureDimensions,
        uploaderIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        uploadDate: new Date(Date.now()).toISOString(),
        description,
      };
      const updatePictureData: Picture = await this.pictureService.updatePicture(pictureId, pictureData);

      res.status(200).json({ data: updatePictureData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a picture by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof PicturesController
   */
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
