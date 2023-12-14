import { Response, NextFunction } from 'express';
import { verifyJWT } from '../helpers/jwt-helper';
import { getConfig } from '../config/config';
import { UnauthorizedException } from 'expressjs-errors-handler';

export async function auth(req: any, res: Response, next: NextFunction) {
  try {
    const token: string | undefined = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException({
        message: 'Unauthorized',
        code: 'UNAUTHORIZED',
      });
    }
    const decoded = await verifyJWT(
      token.split(' ')?.[1] || '',
      getConfig().JWT_KEY,
    );
    if (!decoded) {
      throw new UnauthorizedException({
        message: 'Unauthorized',
        code: 'UNAUTHORIZED',
      });
    }
    req.user = decoded;
    next();
  } catch (e) {
    return next(e);
  }
}
