import { NextFunction, Request, Response, Router } from 'express';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     security: []
 *     description: Login
 *     tags:
 *        - Auth
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *        200:
 *          description: Returns jwt token.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - token
 *                properties:
 *                  token:
 *                    type: string
 */
router.post(
  '/auth/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const key = process.env.JWT_KEY as string;
        return res.json({
          token: sign({ name: username, roles: ['create:post'] }, key, {
            expiresIn: '1 day',
          }),
        });
      }
      return res.status(401).json({ message: 'invalidCredentials' });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
