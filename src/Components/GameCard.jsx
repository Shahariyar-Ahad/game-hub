import { Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const GameCard = ({ game }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDownloadClick = () => {
    if (!user) {
      return navigate("/login", {
        state: { message: "Please log in to download games." },
      });
    }
    navigate(`/download/${game.id}`);
  };

  return (
    <div className="cursor-pointer bg-black p-4 rounded-lg border border-white">
      <figure className="w-full h-40 flex justify-center items-center overflow-hidden">
        <img src={game.coverPhoto} alt={game.title} className="object-contain h-full" />
      </figure>

      <h2 className="text-[#085fb1] font-semibold mt-2">{game.title}</h2>
      <p className="text-white">{game.developer}</p>

      <div className="flex justify-between mt-3">
        <div className="flex items-center gap-1 bg-[#E8FFF8] text-[#00D390] px-2 py-1 rounded-md">
          <Star size={14} /> {game.ratings}
        </div>

        <button
          onClick={handleDownloadClick}
          className="btn btn-secondary btn-sm"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default GameCard;

