import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { Outlet } from 'react-router-dom';

function DashboardLayout(){
    return (
        <div className='flex min-h-screen'>
            {/* Sidebar */}
            <Sidebar />

            {/* right section */}
            <div className='flex flex-col flex-1'>
                {/* topbar */}
                <TopBar />

                {/* page content */}
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
};

export default DashboardLayout;