import { Repository } from 'typeorm';
import Paginated, { PaginateQuery } from '../../../core/paginate/Paginate';
import { AppDataSource } from '../../../infrastructure/AppDataSource';
import PostTypeORM from '../Entity/Post.typeorm';
import IPostRepository from './IPostRepository';

export default class PostPostgresRepository implements IPostRepository {
  private repository: Repository<PostTypeORM>;

  constructor() {
    this.repository = AppDataSource.getRepository(PostTypeORM);
  }

  async create(post: PostTypeORM): Promise<PostTypeORM> {
    return this.repository.save(post);
  }

  async paginate(
    paginateQuery: PaginateQuery
  ): Promise<Paginated<PostTypeORM>> {
    const [orderBy, direction] = paginateQuery.order.split(',');

    const [content, totalRecords] = await this.repository.findAndCount({
      relations: ['images'],
      order: { [orderBy]: direction.toUpperCase() },
      take: paginateQuery.rows,
      skip: paginateQuery.page * paginateQuery.rows,
    });

    return {
      content,
      totalRecords,
      rows: content.length,
      page: paginateQuery.page,
    };
  }

  async findById(id: string): Promise<PostTypeORM | null> {
    return await this.repository.findOneBy({ id });
  }

  async findBySlug(slug: string): Promise<PostTypeORM | null> {
    return await this.repository.findOne({
      where: { slug },
      relations: ['images'],
    });
  }
}
