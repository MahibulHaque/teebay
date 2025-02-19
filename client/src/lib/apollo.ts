import {ApolloClient, ApolloLink, createHttpLink, fromPromise, InMemoryCache, Observable} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import axios from 'axios';



let isRefreshing = false;
// Queue of callbacks to execute after token refresh
let pendingRequests: any[] = [];

// Function to process pending requests
const processQueue = (error: any = null) => {
  pendingRequests.forEach((callback) => callback(error));
  pendingRequests = [];
};

// Create the http link
const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include',
});

// Create the error handling link
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Check if the error is due to an invalid/expired token
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        if (!isRefreshing) {
          isRefreshing = true;

          // Return a new observable to handle the token refresh
          return new Observable(observer => {
            // Call your refresh token endpoint
            axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/generate-token`, {}, { withCredentials: true })
              .then(() => {
                // Token refreshed successfully
                isRefreshing = false;
                processQueue();

                // Retry the failed request
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer)
                };

                forward(operation).subscribe(subscriber);
              })
              .catch(error => {
                isRefreshing = false;
                processQueue(error);
                observer.error(error);
              });
          });
        } else {
          // If we're already refreshing, queue this request
          return fromPromise(
            new Promise((resolve, reject) => {
              pendingRequests.push((error: any) => {
                if (error) {
                  reject(error);
                } else {
                  forward(operation).subscribe(resolve);
                }
              });
            })
          );
        }
      }
    }
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

