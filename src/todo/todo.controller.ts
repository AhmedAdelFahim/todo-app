import { Response, NextFunction } from 'express';
import * as todoService from './todo.service';

class TodoController {
  async create(req: any, res: Response, next: NextFunction) {
    try {
      const todo = await todoService.create({
        user_id: req.user.user_id,
        ...req.body,
      });
      res.status(201).send({ data: { todo } });
    } catch (e) {
      return next(e);
    }
  }

  async getOne(req: any, res: Response, next: NextFunction) {
    const {
      params: { id },
      user,
    } = req;
    try {
      const todo = await todoService.getOne({
        user_id: user.user_id,
        _id: id,
      });
      res.status(200).send({ data: { todo } });
    } catch (e) {
      return next(e);
    }
  }

  async update(req: any, res: Response, next: NextFunction) {
    const {
      params: { id },
      user,
      body,
    } = req;
    try {
      await todoService.update(
        {
          user_id: user.user_id,
          _id: id,
        },
        body,
      );
      res.status(200).send({ message: 'Updated' });
    } catch (e) {
      return next(e);
    }
  }

  async deleteOne(req: any, res: Response, next: NextFunction) {
    const {
      params: { id },
      user,
    } = req;
    try {
      await todoService.deleteOne({
        user_id: user.user_id,
        _id: id,
      });
      res.status(200).send({ message: 'Deleted' });
    } catch (e) {
      return next(e);
    }
  }
}

export default new TodoController();
