import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import ImagePostgresRepository from '../../domains/images/Repositories/ImagePostgresRepository';
import CreateUseCase from '../../domains/images/UseCases/CreateImage/create';
import ImageResizer from '../../domains/images/UseCases/ResizeImage/ResizeImage';

const upload = multer({ dest: 'uploads/' });

const router = Router();

const musicsRepository = new ImagePostgresRepository();
const imageResizer = new ImageResizer();

const createImageUseCase = new CreateUseCase(musicsRepository, imageResizer);

router.post(
  '/images',
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.autoBody=true
    /*
      #swagger.tags = ['Images']
      #swagger.parameters['image'] = {
          in: 'formData',
          type: 'file',
          required: 'true',
          description: 'Image file',
      } 
      #swagger.responses[200] = {
        description: 'Image uploaded',
        schema: [{ $ref: '#/definitions/Post' }]
      } 
    */
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
