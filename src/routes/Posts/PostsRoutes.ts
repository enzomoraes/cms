import { NextFunction, Request, Response, Router } from 'express';
import PostPostgresRepository from '../../domains/posts/Repositories/PostPostgresRepository';
import CreateUseCase from '../../domains/posts/UseCases/CreatePost/create';
import ListAllUseCase from '../../domains/posts/UseCases/ListAllInstrument/listAll';
import CreateValidator from '../../domains/posts/Validations/createValidator';
import ImagePostgresRepository from '../../domains/images/Repositories/ImagePostgresRepository';
import SlugMaker from '../../domains/posts/UseCases/SlugMaker/SlugMaker';

const router = Router();

const postRepository = new PostPostgresRepository();
const imageRepository = new ImagePostgresRepository();
const createValidator = new CreateValidator(postRepository);
const slugMaker = new SlugMaker();

const createPostUseCase = new CreateUseCase(
  postRepository,
  imageRepository,
  createValidator,
  slugMaker
);

const listAllPostsUseCase = new ListAllUseCase(postRepository);

router.post(
  '/posts',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await createPostUseCase.execute(req.body));
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/posts',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await listAllPostsUseCase.execute());
    } catch (e) {
      next(e);
    }
  }
);

export default router;
