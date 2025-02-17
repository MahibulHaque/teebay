import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './routes';
import { errorHandlerMiddleware } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/v1', routes);
app.use(errorHandlerMiddleware)

export default app;
