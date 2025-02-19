import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import app from './app';
import apolloServer from './graphql';
import { port } from '../config';
import { verifyAccessToken } from './services/token.service';
import { AuthMiddleWare } from './middlewares/authMiddleware';

dotenv.config();

const start = async () => {
	try {
		await apolloServer.start();
		app.use(
			'/graphql',
			cors<cors.CorsRequest>({ origin: '*', credentials: true }),
			express.json(),
			AuthMiddleWare,
			expressMiddleware(apolloServer, {
				//@ts-ignore
				context: async ({ req }) => {
					const { accessToken } = req.cookies;
					try {
						const user = verifyAccessToken(accessToken as string);
						return { user:user };
					} catch (error) {}
				},
			}),
		);

		app.listen(port, () => {
			console.log('Server started on port: ', port);
		});
	} catch {
		console.log('Not able to run GraphQL server');
	}
};

start();
