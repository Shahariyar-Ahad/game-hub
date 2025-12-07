import React, { useContext } from 'react';
// MyLink import removed as NavLink is sufficient and built-in
import { NavLink } from 'react-router-dom'; // Changed from 'react-router' to 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify'; // Using 'react-toastify' as requested

const Navbar = () => {
    // Destructure user and the logOut function from AuthContext
    const { user, logOut } = useContext(AuthContext); 

    const handleSignOut = () => {
        // Using logOut function from AuthContext
        logOut() 
            .then(() => {
                toast.success("Successfully Logged Out from PawMart!");
            })
            .catch(err => {
                console.error(err);
                toast.error("Logout failed.");
            });
    };

    // Common Nav Links (Available to all)
    const commonLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => 
                `font-semibold px-3 py-2 text-gray-700 transition duration-150 ${isActive ? 'text-[#FF6347] border-b-2 border-[#FF6347]' : 'hover:text-[#FF6347]'}`
            }>Home</NavLink></li>
            
            <li><NavLink to="/pets-supplies" className={({ isActive }) => 
                `font-semibold px-3 py-2 text-gray-700 transition duration-150 ${isActive ? 'text-[#FF6347] border-b-2 border-[#FF6347]' : 'hover:text-[#FF6347]'}`
            }>Pets & Supplies</NavLink></li>
        </>
    );

    // Links for Logged-in Users (Private Routes)
    const userLinks = (
        <>
            <li><NavLink to="/add-listing" className={({ isActive }) => 
                `font-semibold px-3 py-2 text-gray-700 transition duration-150 ${isActive ? 'text-[#FF6347] border-b-2 border-[#FF6347]' : 'hover:text-[#FF6347]'}`
            }>Add Listing</NavLink></li>
            
            <li><NavLink to="/my-listings" className={({ isActive }) => 
                `font-semibold px-3 py-2 text-gray-700 transition duration-150 ${isActive ? 'text-[#FF6347] border-b-2 border-[#FF6347]' : 'hover:text-[#FF6347]'}`
            }>My Listings</NavLink></li>
            
            <li><NavLink to="/my-orders" className={({ isActive }) => 
                `font-semibold px-3 py-2 text-gray-700 transition duration-150 ${isActive ? 'text-[#FF6347] border-b-2 border-[#FF6347]' : 'hover:text-[#FF6347]'}`
            }>My Orders</NavLink></li>
        </>
    );

    const logoAndName = (
        <NavLink to="/" className="btn btn-ghost text-xl md:text-2xl font-extrabold text-[#FF6347] hover:bg-transparent">
             PawMart
        </NavLink>
    );

    return (
        
        <div className="navbar bg-white shadow-lg sticky top-0 z-50 px-4 md:px-8">
           
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>

                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                     
                        {commonLinks}
                        {user && userLinks}
                        {!user ? (
                            <>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/register">Register</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/profile">Profile</NavLink></li>
                                <li><button onClick={handleSignOut}>Logout</button></li>
                            </>
                        )}
                    </ul>
                </div>
                {logoAndName}
            </div>

           
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {commonLinks}
                    {user && userLinks}
                </ul>
            </div>

           
            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-3">
                     
                        <NavLink to="/profile" className="avatar tooltip tooltip-bottom hidden md:block" data-tip={user?.displayName || "Profile"}>
                            <div className="w-10 rounded-full ring ring-[#FF6347] ring-offset-base-100 ring-offset-2 cursor-pointer">
                               
                                <img src={user?.photoURL || 'https://via.placeholder.com/150?text=P'} alt="Profile" />
                            </div>
                        </NavLink>
                        
                       
                        <button
                            onClick={handleSignOut}
                            className="btn btn-sm md:btn-md bg-[#FF6347] hover:bg-[#E5533D] text-white border-none rounded-full transition-colors hidden sm:inline-flex"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        
                        <NavLink
                            to="/login"
                            className="btn btn-sm md:btn-md bg-transparent text-gray-700 hover:text-[#FF6347] border-0 transition-colors"
                        >
                            Login
                        </NavLink>

                      
                        <NavLink
                            to="/register"
                            className="btn btn-sm md:btn-md bg-[#FF6347] hover:bg-[#E5533D] text-white border-none rounded-full transition-colors"
                        >
                            Register
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;