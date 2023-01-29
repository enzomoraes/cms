import ImageTypeORM from '../Entity/Image.typeorm';

export default interface IImageRepository {
  create(image: ImageTypeORM): Promise<ImageTypeORM>;
  findById(id: string): Promise<ImageTypeORM | undefined>;
  findByIds(ids: string[]): Promise<ImageTypeORM[]>;
}
