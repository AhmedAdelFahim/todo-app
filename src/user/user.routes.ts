import express from 'express';
import { validateRequest } from '../middlewares/validator.middleware';

import UserController from './user.controller';
import { signUp, login } from './user.schema';

const userRouter = express.Router();

userRouter.post(
  '/signup',
  validateRequest({ body: signUp }),
  UserController.signUp,
);
userRouter.post(
  '/login',
  validateRequest({ body: login }),
  UserController.login,
);

export default userRouter;
