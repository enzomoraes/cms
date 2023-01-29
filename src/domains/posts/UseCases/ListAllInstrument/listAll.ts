import PostTypeORM from '../../Entity/Post.typeorm';
import IPostRepository from '../../Repositories/IPostRepository';

class ListAllUseCase {
  constructor(private repository: IPostRepository) {}
  async execute(): Promise<PostTypeORM[]> {
    return await this.repository.findAll();
  }
}

export default ListAllUseCase;
