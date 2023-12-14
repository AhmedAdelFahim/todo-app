import { UnauthorizedException } from 'expressjs-errors-handler';
import jwt from 'jsonwebtoken';

export function generateJWT(payload: any, secret: string, options = {}) {
  return jwt.sign(payload, secret, options);
}

export function verifyJWT(token: string, secret: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: any, payload: any) => {
      if (err) {
        reject(
          new UnauthorizedException({
            message: 'Unauthorized',
            code: 'UNAUTHORIZED',
          }),
        );
      }
      resolve(payload);
    });
  });
}
