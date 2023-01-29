import IImageRepository from '../../../images/Repositories/IImageRepository';
import { PostCreate } from '../../DTOs/Post.create.dto';
import PostTypeORM from '../../Entity/Post.typeorm';
import IPostRepository from '../../Repositories/IPostRepository';
import CreateValidation from '../../Validations/createValidator';
import SlugMaker from '../SlugMaker/SlugMaker';

export default class CreateUseCase {
  constructor(
    private repository: IPostRepository,
    private imageRepository: IImageRepository,
    private validator: CreateValidation,
    private slugMaker: SlugMaker
  ) {}

  async execute(props: PostCreate): Promise<PostTypeORM> {
    await this.validator.execute(props);

    const post = new PostTypeORM();
    post.title = props.title;
    post.body = props.body;
    post.slug = this.slugMaker.make(props.title);
    post.tags = props.tags;
    post.images = await this.imageRepository.findByIds(props.imagesIds);

    return await this.repository.create(post);
  }
}
