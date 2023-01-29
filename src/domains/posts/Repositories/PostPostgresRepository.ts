import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/AppDataSource';
import PostTypeORM from '../Entity/Post.typeorm';
import IPostRepository from './IPostRepository';

export default class PostPostgresRepository implements IPostRepository {
  private repository: Repository<PostTypeORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(PostTypeORM);
  }

  async create(post: PostTypeORM): Promise<PostTypeORM> {
    return await this.repository.save(post);
  }

  async findAll(): Promise<PostTypeORM[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<PostTypeORM | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByTitle(title: string): Promise<PostTypeORM | null> {
    return await this.repository.findOneBy({ title });
  }
}
