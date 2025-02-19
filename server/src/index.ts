import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import app from './app';
import apolloServer from './graphql';
import { port } from '../config';
import { decodeJWTToken } from './services/token.service';

dotenv.config();

const start = async () => {
	try {
		await apolloServer.start();
		app.use(
			'/graphql',
			cors<cors.CorsRequest>({ origin: '*', credentials: true }),
			express.json(),
			expressMiddleware(apolloServer, {
				//@ts-ignore
				context: async ({ req }) => {
					const { accessToken } = req.cookies;
					try {
						const user:any = decodeJWTToken(accessToken as string);
						return { user:user.user };
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
