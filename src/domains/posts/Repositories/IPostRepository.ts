import PostTypeORM from '../Entity/Post.typeorm';

export default interface IPostsRepository {
  create(post: PostTypeORM): Promise<PostTypeORM>;
  findAll(): Promise<PostTypeORM[]>;
  findById(id: string): Promise<PostTypeORM | null>;
  findByTitle(title: string): Promise<PostTypeORM | null>;
}
