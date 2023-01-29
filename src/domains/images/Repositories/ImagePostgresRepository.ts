import { In, Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/AppDataSource';
import ImageTypeORM from '../Entity/Image.typeorm';
import ImageNotFoundException from '../Exceptions/ImageNotFoundException';
import IImageRepository from './IImageRepository';

export default class ImagePostgresRepository implements IImageRepository {
  private repository: Repository<ImageTypeORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(ImageTypeORM);
  }

  async create(image: ImageTypeORM): Promise<ImageTypeORM> {
    return await this.repository.save(image);
  }

  async findById(id: string): Promise<ImageTypeORM | undefined> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new ImageNotFoundException(`Image of id ${id} does not exist!`);
    }
    return entity;
  }

  async findByIds(ids: string[]): Promise<ImageTypeORM[]> {
    return await this.repository.findBy({ id: In(ids) });
  }
}
