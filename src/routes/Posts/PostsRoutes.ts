import { NextFunction, Request, Response, Router } from 'express';
import ImagePostgresRepository from '../../domains/images/Repositories/ImagePostgresRepository';
import PostPostgresRepository from '../../domains/posts/Repositories/PostPostgresRepository';
import CreateUseCase from '../../domains/posts/UseCases/CreatePost/create';
import PaginateUseCase from '../../domains/posts/UseCases/PaginateInstrument/paginate';
import SlugMaker from '../../domains/posts/UseCases/SlugMaker/SlugMaker';
import CreateValidator from '../../domains/posts/Validations/createValidator';
import isAuth from '../../middleware/isAuth';

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

/**
 * @openapi
 * /posts:
 *   post:
 *     description: Create a Post
 *     tags:
 *        - Posts
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostCreate'
 *     responses:
 *        200:
 *          description: Returns created post.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Post'
 */
router.post(
  '/posts',
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json(await createPostUseCase.execute(req.body));
    } catch (e) {
      next(e);
    }
  }
);

/**
 * @openapi
 * /posts:
 *   get:
 *     security: []
 *     description: Paginate Posts
 *     parameters:
 *        - $ref: '#/components/parameters/rows'
 *        - $ref: '#/components/parameters/page'
 *        - $ref: '#/components/parameters/order'
 *     tags:
 *        - Posts
 *     responses:
 *        200:
 *          description: Returns posts paginated.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PostPaginated'
 */
router.get(
  '/posts',
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page);
    const rows = Number(req.query.rows);
    const order = String(req.query.order);
    try {
      res.json(await paginatePostsUseCase.execute({ page, rows, order }));
    } catch (e) {
      next(e);
    }
  }
);

export default router;
