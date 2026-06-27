import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import PublicLayout from '@/layouts/PublicLayout';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';

const AppRouter = ()=>{
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={ <PublicLayout /> }>
                <Route path="login" element={ <Login /> } />
                <Route path="register" element={ <Register /> } />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route element={ <DashboardLayout /> }>
                <Route path='dashboard' element={ <Dashboard /> } />
            </Route>

            {/* Redirect Base URL'/' to login */}
            <Route path='/' element={ <Navigate to='/login' replace /> } />

            {/* All wrong url routes */}
            <Route path='*' element={ <NotFound /> } />
        </Routes>
    )
};

export default AppRouter;