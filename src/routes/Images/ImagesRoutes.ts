import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import ImagePostgresRepository from '../../domains/images/Repositories/ImagePostgresRepository';
import CreateUseCase from '../../domains/images/UseCases/CreateImage/create';
import ImageResizer from '../../domains/images/UseCases/ResizeImage/ResizeImage';
import ServeImageUseCase from '../../domains/images/UseCases/ServeImage/ServeImages';
import isAuth from '../../middleware/isAuth';

const upload = multer({ dest: 'uploads/' });

const router = Router();

const musicsRepository = new ImagePostgresRepository();
const imageResizer = new ImageResizer();

const createImageUseCase = new CreateUseCase(musicsRepository, imageResizer);
const serveImageUseCase = new ServeImageUseCase();

/**
 * @openapi
 * /images:
 *   post:
 *     description: Create a Image
 *     tags:
 *        - Images
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: file
 *              required:
 *                - image
 *     responses:
 *        200:
 *          description: Returns created image id.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ImageCreated'
 */
router.post(
  '/images',
  isAuth,
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = req.file;
      const response = await createImageUseCase.execute(image);
      return res.json({
        message: 'image created succesfully',
        imageId: response.id,
      });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * @openapi
 * /images/{path}:
 *   get:
 *     security: []
 *     description: Serves a Image
 *     tags:
 *        - Images
 *     parameters:
 *        - name: 'path'
 *          in: path
 *          required: true
 *          description: image path
 *          schema:
 *             type: string
 *     responses:
 *        200:
 *          description: Returns the image file.
 *          content:
 *            image/png:
 *              schema:
 *                type: string
 *                format: binary
 */
router.get(
  '/images/:path',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.sendFile(serveImageUseCase.execute(req.params.path));
    } catch (e) {
      next(e);
    }
  }
);

export default router;
