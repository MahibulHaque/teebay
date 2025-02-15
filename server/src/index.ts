import dotenv from 'dotenv';
import cors from 'cors'
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import app from './app';
import apolloServer from './graphql';
import { port } from '../config';

dotenv.config();

const start = async () => {
	try {
		await apolloServer.start();
		app.use(
			'/graphql',
			cors<cors.CorsRequest>(),
			express.json(),
			expressMiddleware(apolloServer)
		);

		app.listen(port, () => {
			console.log('Server started on port: ', port);
		});
	} catch {
		console.log('Not able to run GraphQL server');
	}
};

start();
