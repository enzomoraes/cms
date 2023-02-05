import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

config();

export default (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.cookies.access_token;

  if (!access_token)
    return res.status(401).json({ message: 'missing credentials' });

  const key = process.env.JWT_KEY as string;
  try {
    verify(access_token, key);
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'invalid credentials' });
  }
};
