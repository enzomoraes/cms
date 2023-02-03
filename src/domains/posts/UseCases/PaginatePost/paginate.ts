import Paginated, { PaginateQuery } from '../../../../core/paginate/Paginate';
import PostTypeORM from '../../Entity/Post.typeorm';
import IPostRepository from '../../Repositories/IPostRepository';

class PaginateUseCase {
  constructor(private repository: IPostRepository) {}
  async execute(paginateQuery: PaginateQuery): Promise<Paginated<PostTypeORM>> {
    return this.repository.paginate(paginateQuery);
  }
}

export default PaginateUseCase;
