import React, { useContext } from 'react';
import MyLink from './MyLink';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../Firebase/Firebase.config';

const Navbar = () => {
  const {user,setUser}=useContext(AuthContext)
  const handleSignOut = () => {
  signOut(auth)
    .then(() => setUser(null))
    .catch(err => console.log(err));
};
    return (
      <div className="navbar bg-white shadow-sm px-4">
  {/* LEFT SIDE */}
  <div className="navbar-start">
    {/* Mobile Dropdown */}
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
      >
        <li><MyLink to="/">Home</MyLink></li>
        <li><MyLink to="/allGames">Games</MyLink></li>
        <li><MyLink to="/community">Community</MyLink></li>
      </ul>
    </div>

    {/* Logo */}
    <div className="flex items-center gap-2">
      <img src="/images/gamehub.png" alt="logo" className="w-16 h-16 rounded-xl" />
    </div>
  </div>

  {/* CENTER MENU (Desktop Only) */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><MyLink to="/" className="font-bold italic text-black">Home</MyLink></li>
      <li><MyLink to="/allGames" className="font-bold italic text-black">Games</MyLink></li>
      <li><MyLink to="/community" className="font-bold italic text-black">Community</MyLink></li>
    </ul>
  </div>
      {
        user &&<div className="navbar-end gap-2">
    <button
      onClick={handleSignOut}
      className="btn bg-white text-black"
    >
      Logout
    </button> 
    

    
  </div>
      } 
      {
        !user && <div className="navbar-end gap-2">
    <NavLink
      to="/login"
      className={({ isActive }) =>
        isActive ? "btn text-black bg-white" : "btn bg-red-400 text-white"
      }
    >
      Login
    </NavLink>

    
  </div>
      }
  {/* RIGHT SIDE */}
  <div>
    <MyLink to="/profile" className="font-bold italic text-black border bg-blue-600 p-2 rounded-2xl gap-2">Profile</MyLink>
  </div>
</div>

    );
};

export default Navbar;