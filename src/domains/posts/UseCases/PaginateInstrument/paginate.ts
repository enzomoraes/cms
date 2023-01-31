import { PaginateQuery } from '../../../../core/paginate/Paginate';
import PostTypeORM from '../../Entity/Post.typeorm';
import IPostRepository from '../../Repositories/IPostRepository';

class PaginateUseCase {
  constructor(private repository: IPostRepository) {}
  async execute(paginateQuery: PaginateQuery): Promise<PostTypeORM[]> {
    return await this.repository.paginate(paginateQuery);
  }
}

export default PaginateUseCase;
