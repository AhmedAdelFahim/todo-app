import express from 'express';
import userRouter from '../../user/user.routes';
import todoRouter from '../../todo/todo.routes';

const apiRouter = express.Router();

apiRouter.use('/v1/users', userRouter);
apiRouter.use('/v1/todo', todoRouter);

export default apiRouter;
