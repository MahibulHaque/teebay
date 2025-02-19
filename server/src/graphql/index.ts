import { ApolloServer } from '@apollo/server';
import schema from './schema';
export interface MyContext {
  user: string;
}

const apolloServer = new ApolloServer({
  schema
});

export default apolloServer;
