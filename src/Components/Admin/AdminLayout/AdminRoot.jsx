import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../AdminShared/AdminNavbar';

const AdminRoot = () => {
    return (
        <div className='container mx-auto'>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex w-full">
                <div className="w-full md:w-1/5 lg:w-1/4">
                    <AdminNavbar />
                </div>
                <div className="w-full md:w-[75%] lg:w-[75%] lg:p-10">
                    <Outlet />  {/* Corrected here */}
                </div>
            </div>
        </div>
    );
};

export default AdminRoot;
