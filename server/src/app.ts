import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './routes';
import { errorHandlerMiddleware } from './middlewares/errorHandler';

const app = express();

const corsOptions: CorsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/v1', routes);
app.use(errorHandlerMiddleware);

export default app;
