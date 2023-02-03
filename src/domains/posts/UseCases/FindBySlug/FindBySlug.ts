import PostTypeORM from '../../Entity/Post.typeorm';
import PostNotFoundException from '../../Exceptions/PostNotFoundException';
import IPostRepository from '../../Repositories/IPostRepository';

class FindBySlugUseCase {
  constructor(private repository: IPostRepository) {}
  async execute(slug: string): Promise<PostTypeORM> {
    const post = await this.repository.findBySlug(slug);
    if (!post) throw new PostNotFoundException('Could not find post');
    return post;
  }
}

export default FindBySlugUseCase;
