import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import HomePage from './components/HomePage/HomePage';
import About from './components/About/About';
import Orientation from './components/Orientation/Orientation';
import Panels from './components/Panels/Panels';
import Resources from './components/Resources/Resources';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import AdminContainer from './components/AdminContainer/AdminContainer';
import Unathorized from './components/Unathorized/Unathorized';
import { SnackbarProvider } from 'notistack';

  /**
   *
   */
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          index: true
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "orientation",
          element: <Orientation />,
        },
        {
          path: "panels",
          element: <Panels />,
        },
        {
          path: "resources",
          element: <Resources />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "login-page",
          element: <Login />,
        },
        {
          path: "admin-container",
          element: <AdminContainer />,
        },
        {
          path: "unathorized",
          element: <Unathorized />,
        },
      ]
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} />
      </SnackbarProvider>
  </React.StrictMode>
);