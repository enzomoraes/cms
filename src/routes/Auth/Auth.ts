import { NextFunction, Request, Response, Router } from 'express';
import { sign, verify } from 'jsonwebtoken';
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
        const accessToken = sign(
          { name: username, roles: ['create:post'] },
          key,
          {
            expiresIn: '1 day',
          }
        );

        return res
          .cookie('access_token', accessToken, {
            maxAge: 60 * 60 * 24 * 1000,
            httpOnly: true,
            sameSite: 'lax',
          })
          .json({
            token: accessToken,
          });
      }
      return res.status(401).json({ message: 'invalidCredentials' });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * @openapi
 * /auth/is-auth:
 *   get:
 *     security: []
 *     description: Login
 *     tags:
 *        - Auth
 *     responses:
 *       200:
 *        description: Is token valid.
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            required:
 *              - isAuth
 *            properties:
 *              isAuth:
 *                type: boolean
 */
router.get(
  '/auth/is-auth',
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;
    console.log('cookie', accessToken);
    const key = process.env.JWT_KEY as string;
    try {
      verify(accessToken, key);
      return res.status(200).json({ isAuth: true });
    } catch (e) {
      return res.status(401).json({ isAuth: false });
    }
  }
);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     security: []
 *     description: Login
 *     tags:
 *        - Auth
 *     responses:
 *        201:
 *          description: Logout.
 */
router.post(
  '/auth/logout',
  async (req: Request, res: Response, next: NextFunction) => {
    return res.clearCookie('access_token').status(201).send();
  }
);

export default router;
