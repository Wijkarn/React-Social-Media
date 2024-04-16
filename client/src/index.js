import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/Homepage';
import Profile from './pages/Profile';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from './NotFoundPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        path: "/profile/:username",
        element: <Profile />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
