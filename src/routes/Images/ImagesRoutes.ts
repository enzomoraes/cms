import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import ImagePostgresRepository from '../../domains/images/Repositories/ImagePostgresRepository';
import CreateUseCase from '../../domains/images/UseCases/CreateImage/create';
import ImageResizer from '../../domains/images/UseCases/ResizeImage/ResizeImage';
import isAuth from '../../middleware/isAuth';

const upload = multer({ dest: 'uploads/' });

const router = Router();

const musicsRepository = new ImagePostgresRepository();
const imageResizer = new ImageResizer();

const createImageUseCase = new CreateUseCase(musicsRepository, imageResizer);

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
      const response = await createImageUseCase.execute(image?.path);
      return res.json({
        message: 'image created succesfully',
        imageId: response.id,
      });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
