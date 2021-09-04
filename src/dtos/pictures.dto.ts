import { PictureDimensionsInterface } from '@/interfaces/pictureDimensions.interface';

/**
 * Pictures DTO
 * [D]ata [T]ransfer [O]bject = abstraction layer to not expose the Model directly
 *
 * @export
 * @class CreatePictureDto
 */
export class CreatePictureDto {
  public filename: string;

  public filesize: number;

  public pictureDimensions: PictureDimensionsInterface;

  public uploaderIp: string | string[];

  public uploadDate: string;

  public description: string;
}
