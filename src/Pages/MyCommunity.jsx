import React from "react";
import { Link } from "react-router";

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-green-400">
        GameHub Community
      </h1>
      <p className="text-center max-w-md mb-6 text-gray-300">
        Join our community of gamers! Share tips, strategies, and game experiences.
      </p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-semibold transition-all transform hover:scale-105"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Community;
