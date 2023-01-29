import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import CreateImageException from '../../domains/images/Exceptions/CreateImageException';
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
    try {
      const imagePath = req.file?.path;
      res.json(await createImageUseCase.execute(imagePath));
    } catch (e) {
      next(e);
    }
  }
);

export default router;
