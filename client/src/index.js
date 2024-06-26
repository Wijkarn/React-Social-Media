import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Profile from './pages/Profile';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/LogInOutPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import AddPostPage from './pages/AddPostPage';
import DisplayPost from './components/DisplayPost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile/:username",
            element: <Profile />,
            children: [
              {
                path: "/profile/:username/post/:postId",
                element: <DisplayPost />
              }
            ]
          }
        ]
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/upload",
        element: <AddPostPage />
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
