import dotenv from 'dotenv';
import { expressMiddleware } from '@apollo/server/express4';
import app from './app';
import apolloServer from './graphql';
import { port } from '../config';
import { verifyAccessToken } from './services/token.service';


dotenv.config();

const start = async () => {
	try {
		await apolloServer.start();
		app.use(
			'/graphql',
			expressMiddleware(apolloServer, {
				//@ts-ignore
				context: async ({ req }) => {
                    const { accessToken } = req.cookies || {};
                    
                    if (!accessToken) {
                        return { user: null };
                    }
                    
                    try {
                        const user = verifyAccessToken(accessToken);
                        return { user };
                    } catch (error) {
                        return { user: null };
                    }
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
