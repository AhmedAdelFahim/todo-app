import express, { Request, Response } from 'express';
import apiRouter from './routes/v1';
import morganMiddleware from './middlewares/morgan';
import { NotFoundException, exceptionHandler } from 'expressjs-errors-handler';
const app = express();
app.use(express.json());
app.use(morganMiddleware);
app.use('/api', apiRouter);
app.all('*', async (req: Request, res: Response) => {
  res.status(404).send(
    new NotFoundException([
      {
        message: 'not found',
        code: 'NOT_FOUND',
      },
    ]),
  );
});

app.use(exceptionHandler);

export default app;
