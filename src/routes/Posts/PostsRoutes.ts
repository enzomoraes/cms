import { NextFunction, Request, Response, Router } from 'express';
import ImagePostgresRepository from '../../domains/images/Repositories/ImagePostgresRepository';
import PostPostgresRepository from '../../domains/posts/Repositories/PostPostgresRepository';
import CreateUseCase from '../../domains/posts/UseCases/CreatePost/create';
import PaginateUseCase from '../../domains/posts/UseCases/PaginateInstrument/paginate';
import SlugMaker from '../../domains/posts/UseCases/SlugMaker/SlugMaker';
import CreateValidator from '../../domains/posts/Validations/createValidator';

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

const paginatePostsUseCase = new PaginateUseCase(postRepository);

router.post(
  '/posts',
  async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.autoBody=true
    /*
      #swagger.tags = ['Posts']
      #swagger.requestBody = {
        required: true,
        description: 'Creating new post',
        schema: {$ref: '#/definitions/PostCreate'}
      }
      #swagger.responses[200] = {
        description: 'New Post',
        schema: { $ref: '#/definitions/Post' }
      } 
    */
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
    const page = Number(req.query.page);
    const rows = Number(req.query.rows);
    const order = String(req.query.order);
    /*
      #swagger.tags = ['Posts']
      #swagger.parameters['$ref'] = ['#/components/parameters/rows', '#/components/parameters/page', '#/components/parameters/order']
      #swagger.responses[200] = {
        description: 'List of Posts',
        schema: { $ref: '#/definitions/PostPaginated' }
      } 
    */

    try {
      res.json(await paginatePostsUseCase.execute({ page, rows, order }));
    } catch (e) {
      next(e);
    }
  }
);

export default router;
