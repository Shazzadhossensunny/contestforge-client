import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Route';
import AuthContextComponent from './Provider/AuthContextComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
import { register } from 'swiper/element/bundle';

register();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextComponent>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    <ToastContainer />
    </AuthContextComponent>
  </React.StrictMode>,
)
