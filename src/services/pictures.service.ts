import { CreatePictureDto } from '@dtos/pictures.dto';
import { HttpException } from '@exceptions/HttpException';
import { Picture } from '@interfaces/pictures.interface';
import pictureModel from '@models/pictures.model';
import { isEmpty } from '@utils/util';

class PictureService {
  public pictures = pictureModel;

  public async findAllPicture(): Promise<Picture[]> {
    const pictures: Picture[] = await this.pictures.find();
    return pictures;
  }

  public async findPictureById(pictureId: string): Promise<Picture> {
    if (isEmpty(pictureId)) throw new HttpException(400, 'Picture not found');

    const findPicture: Picture = await this.pictures.findOne({ _id: pictureId });
    if (!findPicture) throw new HttpException(409, "You're not picture");

    return findPicture;
  }

  public async createPicture(pictureData: CreatePictureDto): Promise<Picture> {
    if (isEmpty(pictureData)) throw new HttpException(400, 'No picture data given');

    const createPictureData: Picture = await this.pictures.create({ ...pictureData });

    return createPictureData;
  }

  public async updatePicture(pictureFilename: string, pictureData: CreatePictureDto): Promise<Picture> {
    if (isEmpty(pictureData)) throw new HttpException(400, 'No picture data given');

    pictureData = { ...pictureData };

    const updatePictureByFilename: Picture = await this.pictures.findByIdAndUpdate(pictureFilename, { pictureData });
    if (!updatePictureByFilename) throw new HttpException(409, 'No picture file name given');

    return updatePictureByFilename;
  }

  public async deletePicture(pictureFilename: string): Promise<Picture> {
    const deletePictureByFilename: Picture = await this.pictures.findByIdAndDelete(pictureFilename);
    if (!deletePictureByFilename) throw new HttpException(409, 'No picture file name given');

    return deletePictureByFilename;
  }
}

export default PictureService;
