import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

config();

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('authorization');

  if (!authorization)
    return res.status(401).json({ message: 'missing credentials' });

  const [, token] = authorization.split(' ');

  const key = process.env.JWT_KEY as string;
  try {
    verify(token, key);
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'invalid credentials' });
  }
};
