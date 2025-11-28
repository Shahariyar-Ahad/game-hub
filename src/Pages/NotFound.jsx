import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="text-center mb-6 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-semibold transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
