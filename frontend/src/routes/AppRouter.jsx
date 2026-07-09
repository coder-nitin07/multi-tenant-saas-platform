import { Routes, Route, Navigate, Router } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import PublicLayout from '@/layouts/PublicLayout';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import ProtectedRoute from './ProtectedRoute';
import Organizations from '@/pages/Organizations';
import OrganizationDetails from '@/pages/OrganizationDetails';

const AppRouter = ()=>{
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={ <PublicLayout /> }>
                <Route path="login" element={ <Login /> } />
                <Route path="register" element={ <Register /> } />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute /> }>
                <Route element={ <DashboardLayout /> }>
                    <Route path='dashboard' element={ <Dashboard /> } />

                    <Route path='organizations' element={ <Organizations /> } />
                    
                    <Route path='organizations/:id' element={ <OrganizationDetails /> } />

                    {/* <Route path='members' element={ <Members /> } /> */}
                    {/* <Route path='members' element={ <Invitations /> } /> */}
                    {/* <Route path='members' element={ <Notificatios /> } /> */}
                    {/* <Route path='members' element={ <Audilog /> } /> */}
                    {/* <Route path='members' element={ <Setting /> } /> */}
                </Route>
            </Route>

            {/* Redirect Base URL'/' to login */}
            <Route path='/' element={ <Navigate to='/login' replace /> } />

            {/* All wrong url routes */}
            <Route path='*' element={ <NotFound /> } />
        </Routes>
    )
};

export default AppRouter;