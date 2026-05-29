import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  RouterProvider,
} from "react-router-dom";

import './index.css'
import './app.css'

import AuthProvider from './providers/AuthProvider.jsx'

import router from './routes/router.jsx';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
    <QueryClientProvider client={queryClient}>
<AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>
</QueryClientProvider>
    </div>
  </React.StrictMode>,
)