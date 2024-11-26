import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from './components/error-page.jsx'
import Dashboard from './components/DashBoard.jsx'
import LoginForm from './components/LoginForm.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'


const isLoggediIn = false;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'dashboard', element: <ProtectedRoute isLoggediIn={isLoggediIn}>
        <Dashboard/>
      </ProtectedRoute> },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
