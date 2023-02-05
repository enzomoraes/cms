import postRoutes from './Posts/PostsRoutes';
import imageRoutes from './Images/ImagesRoutes';
import authRoutes from './Auth/Auth';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.use(authRoutes);
router.use(postRoutes);
router.use(imageRoutes);

// Middleware de erros padrao do express
router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = !error.message ? 'Internal Error' : error.message;
  // const stack = error.stack;
  res.status(status).json({ message: message });
});

export default router;
