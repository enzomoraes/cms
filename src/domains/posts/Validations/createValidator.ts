import { PostCreate } from '../DTOs/Post.create.dto';
import CreatePostException from '../Exceptions/CreatePostException';
import IPostsRepository from '../Repositories/IPostRepository';

export default class CreateValidator {
  constructor(private postRepository: IPostsRepository) {}
  async execute(post: PostCreate) {
    if (!post) throw new CreatePostException('Invalid properties');
    if (!post.title) throw new CreatePostException('Title is required');
    if (post.title.trim().length === 0)
      throw new CreatePostException('Name may not be empty');
    const existingPost = await this.postRepository.findByTitle(post.title);
    if (existingPost) {
      throw new CreatePostException(`Post ${post.title} already exists`);
    }
  }
}
