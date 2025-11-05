import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter} from "react-router";
import { RouterProvider } from 'react-router/dom';
import Login from './components/Login.tsx';
import NewUser from './components/NewUser.tsx';
import UserPage from './components/UserPage.tsx';
import './index.css';
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "login/newuser",
    element: <NewUser/>
  },
  {
    path: "/access",
    element: <UserPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
