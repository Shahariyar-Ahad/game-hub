import React, { useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Star } from "lucide-react";
import useGames from "../Hooks/UseHook";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";

const Download = () => {
  const { user } = useContext(AuthContext); // get current user
  const { id } = useParams();
  const { games } = useGames();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.info("You must login to access this page!");
      navigate("/login");
    }
  }, [user, navigate]);

  const game = games.find((g) => g.id === id);

  const handleDownload = () => {
    window.open(game.downloadLink, "_blank");
    toast.success("Downloading");
  };

  if (!game) {
    return <p className="text-white text-center mt-10">Game not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Back Button */}
      <Link
        to="/allgames"
        className="text-blue-400 mb-4 inline-block hover:underline"
      >
        &larr; Back to games
      </Link>

      <div className="flex flex-col md:flex-row gap-6 bg-[#000814] rounded-lg p-6 shadow-lg">
        {/* Image */}
        <img
          src={game.coverPhoto}
          alt={game.title}
          className="w-full md:w-1/3 object-contain rounded-lg"
        />

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-[#00D390]">{game.title}</h1>
          <p className="text-sm text-gray-400">{game.category}</p>

          <p className="text-gray-400">Developer: {game.developer}</p>
          <p className="flex items-center gap-1 text-[#00D390]">
            <Star size={18} /> {game.ratings}
          </p>

          <p>
            <span className="font-bold text-[#E91E63]">Game-size</span>
            {game.size_gb}
          </p>
          <p>
            <span className="font-bold text-[#1d828b]">Game-description</span>{" "}
            {game.description}
          </p>
          <p>
            <span className="font-bold text-[#e63946]">Game-characters:</span>{" "}
            {game.main_characters}
          </p>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md text-center"
          >
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Download;

