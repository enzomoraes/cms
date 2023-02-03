import Paginated, { PaginateQuery } from '../../../core/paginate/Paginate';
import PostTypeORM from '../Entity/Post.typeorm';

export default interface IPostsRepository {
  create(post: PostTypeORM): Promise<PostTypeORM>;
  paginate(paginateQuery: PaginateQuery): Promise<Paginated<PostTypeORM>>;
  findById(id: string): Promise<PostTypeORM | null>;
  findBySlug(title: string): Promise<PostTypeORM | null>;
}
