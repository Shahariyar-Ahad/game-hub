import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
       <div className='flex flex-col min-h-screen'>
    <Navbar />

    {/* Proper container */}
    <div className='flex-1 mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12'>
        <Outlet />
    </div>

    <Footer />
</div>

    );
};

export default MainLayout;