import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {ApolloProvider} from '@apollo/client';
import {apolloClient} from './lib/apollo.ts';
import StoreProvider from './components/providers/StoreProvider.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ApolloProvider>
  </StrictMode>,
);
