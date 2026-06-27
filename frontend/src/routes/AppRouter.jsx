import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import PublicLayout from '@/layouts/PublicLayout';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

const AppRouter = () => {
  return <RouterProvider router={ router } />
}

export default AppRouter;