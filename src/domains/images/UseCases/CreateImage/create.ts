import fs from 'fs';
import { uploadsFolder } from '../../../../utils/_constants';
import ImageTypeORM from '../../Entity/Image.typeorm';
import CreateImageException from '../../Exceptions/CreateImageException';
import IImageRepository from '../../Repositories/IImageRepository';
import ImageResizer from '../ResizeImage/ResizeImage';

export default class CreateUseCase {
  constructor(
    private repository: IImageRepository,
    private imageResizer: ImageResizer
  ) {}

  async execute(file: Express.Multer.File | undefined): Promise<ImageTypeORM> {
    if (!file) {
      throw new CreateImageException('No image could be processed');
    }

    const { small, medium, large } = await this.imageResizer.resize(file.path);

    const mimetype = file.mimetype.split('/')[1];
    const image = new ImageTypeORM();

    fs.writeFileSync(
      `${uploadsFolder}/${file.filename}-small.${mimetype}`,
      small
    );
    fs.writeFileSync(
      `${uploadsFolder}/${file.filename}-medium.${mimetype}`,
      medium
    );
    fs.writeFileSync(
      `${uploadsFolder}/${file.filename}-large.${mimetype}`,
      large
    );
    image.small = `${file.filename}-small.${mimetype}`;
    image.medium = `${file.filename}-medium.${mimetype}`;
    image.large = `${file.filename}-large.${mimetype}`;

    fs.unlink(file.path, err => {
      if (err) console.log(`image ${file.path} could not be deleted`);
      console.log(`${file.path} was deleted`);
    });

    return await this.repository.create(image);
  }
}
