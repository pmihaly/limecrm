import { CreatePictureDto } from '@dtos/pictures.dto';
import { HttpException } from '@exceptions/HttpException';
import { Picture } from '@interfaces/pictures.interface';
import pictureModel from '@models/pictures.model';
import { isEmpty } from '@utils/util';

/**
 * Abstraction layer between the DTO and the controller
 *
 * @class PictureService
 */
class PictureService {
  public pictures = pictureModel;

  /**
   * Find all pictures
   *
   * @return {*}  {Promise<Picture[]>}
   * @memberof PictureService
   */
  public async findAllPicture(): Promise<Picture[]> {
    const pictures: Picture[] = await this.pictures.find().sort([['uploadDate', -1]]);
    return pictures;
  }

  /**
   * Find a specific picture by id
   *
   * @param {string} pictureId
   * @return {*}  {Promise<Picture>}
   * @memberof PictureService
   */
  public async findPictureById(pictureId: string): Promise<Picture> {
    if (isEmpty(pictureId)) throw new HttpException(400, 'Picture not found');

    const findPicture: Picture = await this.pictures.findOne({ _id: pictureId });
    if (!findPicture) throw new HttpException(409, "You're not picture");

    return findPicture;
  }

  /**
   * Create a new picture
   *
   * @param {CreatePictureDto} pictureData
   * @return {*}  {Promise<Picture>}
   * @memberof PictureService
   */
  public async createPicture(pictureData: CreatePictureDto): Promise<Picture> {
    if (isEmpty(pictureData)) throw new HttpException(400, 'No picture data given');

    const createPictureData: Picture = await this.pictures.create({ ...pictureData });

    return createPictureData;
  }

  /**
   * Update a picture by id
   *
   * @param {string} pictureFilename
   * @param {CreatePictureDto} pictureData
   * @return {*}  {Promise<Picture>}
   * @memberof PictureService
   */
  public async updatePicture(pictureFilename: string, pictureData: CreatePictureDto): Promise<Picture> {
    if (isEmpty(pictureData)) throw new HttpException(400, 'No picture data given');

    pictureData = { ...pictureData };

    const updatePictureByFilename: Picture = await this.pictures.findByIdAndUpdate(pictureFilename, { pictureData });
    if (!updatePictureByFilename) throw new HttpException(409, 'No picture file name given');

    return updatePictureByFilename;
  }

  /**
   * Delete a picture by id
   *
   * @param {string} pictureFilename
   * @return {*}  {Promise<Picture>}
   * @memberof PictureService
   */
  public async deletePicture(pictureFilename: string): Promise<Picture> {
    const deletePictureByFilename: Picture = await this.pictures.findByIdAndDelete(pictureFilename);
    if (!deletePictureByFilename) throw new HttpException(409, 'No picture file name given');

    return deletePictureByFilename;
  }
}

export default PictureService;
