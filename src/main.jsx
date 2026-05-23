import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  RouterProvider,
} from "react-router-dom";

import './index.css'
import './app.css'

import AuthProvider from './providers/AuthProvider.jsx'

import router from './routes/router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <div data-theme="light">

      <AuthProvider>

        <RouterProvider router={router} />

      </AuthProvider>

    </div>

  </React.StrictMode>,
)