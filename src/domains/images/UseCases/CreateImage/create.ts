import ImageTypeORM from '../../Entity/Image.typeorm';
import CreateImageException from '../../Exceptions/CreateImageException';
import IImageRepository from '../../Repositories/IImageRepository';
import ImageResizer from '../ResizeImage/ResizeImage';

export default class CreateUseCase {
  constructor(
    private repository: IImageRepository,
    private imageResizer: ImageResizer
  ) {}

  async execute(path: string | undefined): Promise<ImageTypeORM> {
    if (!path) throw new CreateImageException('No image could be processed');
    const { small, medium, large } = await this.imageResizer.resize(path);

    const image = new ImageTypeORM();
    image.small = small;
    image.medium = medium;
    image.large = large;
    return await this.repository.create(image);
  }
}
