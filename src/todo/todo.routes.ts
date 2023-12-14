import express from 'express';
import { validateRequest } from '../middlewares/validator.middleware';
import { auth } from '../middlewares/auth.middleware';
import TodoController from './todo.controller';
import { createTodo, updateTodo } from './todo.schema';

const todoRouter = express.Router();

todoRouter.post(
  '/create',
  auth,
  validateRequest({ body: createTodo }),
  TodoController.create,
);

todoRouter.get('/list', auth, TodoController.getAll);
todoRouter.get('/:id', auth, TodoController.getOne);
todoRouter.delete('/:id', auth, TodoController.deleteOne);
todoRouter.put(
  '/:id',
  auth,
  validateRequest({ body: updateTodo }),
  TodoController.update,
);

export default todoRouter;
