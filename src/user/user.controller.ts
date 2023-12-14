import { Request, Response, NextFunction } from 'express';
import User from './user.model';
import Logger from '../helpers/logger';
import * as userService from './user.service';

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      await User.create(req.body);
      Logger.log('debug', 'sign up successfully');
      res.status(201).send({ message: 'sign up successfully' });
    } catch (e) {
      return next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const { user, token } = await userService.login(body);
      Logger.log('debug', 'login successfully');
      res
        .status(200)
        .send({ message: 'login successfully', data: { ...user, token } });
    } catch (e) {
      return next(e);
    }
  }
}

export default new UserController();
