import { PictureDimensionsInterface } from '@/interfaces/pictureDimensions.interface';

/**
 * Pictures DTO
 * [D]ata [T]ransfer [O]bject = abstraction layer to not expose the Model directly
 *
 * @export
 * @interface CreatePictureDto
 */
export class CreatePictureDto {
  filename: string;

  filesize: number;

  pictureDimensions: PictureDimensionsInterface;

  uploaderIp: string | string[];

  uploadDate?: string;

  description: string;
}
