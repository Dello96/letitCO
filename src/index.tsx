import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './GlobalStyle';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <App />
  </QueryClientProvider>
);
