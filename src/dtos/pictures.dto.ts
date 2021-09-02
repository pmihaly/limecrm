/**
 * Pictures DTO
 * [D]ata [T]ransfer [O]bject = abstraction layer to not expose the Model directly
 *
 * @export
 * @class CreatePictureDto
 */
export class CreatePictureDto {
  public filename: string;

  public uploaderIp: string;

  public uploadDate: string;

  public description: string;
}
