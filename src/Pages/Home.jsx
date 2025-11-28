
import { useEffect, useState } from "react";
import useGames from "../Hooks/UseHook";
import GameCard from "../Components/GameCard";
import { NavLink, useNavigate } from "react-router";
import { useSpring, animated } from "@react-spring/web";
import LoadingPage from "./Loading";

const Home = () => {
  const { games,loading } = useGames();

  const showGames = [...games]
    .sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings))
    .slice(0, 8);

  // GIFs with duration and overlay content
  const gifs = [
    { 
      src: "/images/Glow Elder Scrolls GIF by Xbox.gif", 
      duration: 6000,
      headline: "The Witcher 3",
      description: "Embark on an epic adventure in the world of Geralt of Rivia",
      buttonText: "Play Now"
    },
    { 
      src: "/images/red dead redemption 2 draw GIF by Rockstar Games.gif", 
      duration: 4000,
      headline: "Red Dead Redemption 2",
      description: "Experience the wild west like never before",
      buttonText: "Out Now"
    },
    { 
      src: "/images/Fps Game GIF by Battlefield (1).gif", 
      duration: 8000,
      headline: "Battlefield FPS",
      description: "Engage in fast-paced action across battlefields",
      buttonText: "Download"
    },
  ];

  const [current, setCurrent] = useState(0);
  const navigate=useNavigate()
  const doNavigate=() => {
    navigate('/allgames')
  }
  // Auto Slide based on GIF duration
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % gifs.length);
    }, gifs[current].duration);

    return () => clearTimeout(timeout);
  }, [current]);

  // React Spring Animation for smooth slide
  const slideAnimation = useSpring({
    transform: `translateX(-${current * 100}%)`,
    config: { tension: 120, friction: 18 },
  });

  return (
   <div className="w-full">
  {/* Main container */}
  <div className="container mx-auto px-4">

    {/* ================= Banner ================= */}
    <div className="overflow-hidden rounded-2xl mt-6 relative 
      h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px]">

      {/* Sliding GIFs */}
      <animated.div
        style={slideAnimation}
        className="flex w-full h-full"
      >
        {gifs.map((gif, index) => (
          <img
            key={index}
            src={gif.src}
            alt={`banner-${index}`}
            className="w-full h-full object-cover flex-shrink-0 rounded-2xl"
          />
        ))}
      </animated.div>

      {/* Overlay content */}
      <div
        className="
          absolute top-0 left-0 w-full h-full flex flex-col
          justify-center
          items-start 
          px-6 py-10 
          sm:px-10 sm:py-16 
          md:px-16 md:py-20 
          lg:px-24 lg:py-28
          text-white
          bg-gradient-to-t from-black/40 to-transparent
          rounded-2xl
        "
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
          {gifs[current].headline}
        </h1>

        <p className="mb-5 text-sm sm:text-base md:text-xl max-w-xl drop-shadow-lg">
          {gifs[current].description}
        </p>

        <button
          onClick={doNavigate}
          className="bg-red-600 px-4 sm:px-6 py-2 rounded text-white font-semibold hover:bg-red-700 transition"
        >
          {gifs[current].buttonText}
        </button>
      </div>
    </div>

    {/* ================= Content ================= */}
    <div>

      {/* Section Title */}
      <div className="mt-10 mb-5 px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-black">
          Discover Something Legendary
        </h1>
      </div>

      {/* Popular Games */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {showGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Explore More */}
      <div className="my-12 text-center">
        <NavLink to="/allgames" className="btn btn-success text-black">
          Explore more
        </NavLink>
      </div>

      {/* Newsletter */}
      <div className="my-16 text-center px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-black">Subscribe to our Newsletter</h2>
        <p className="text-sm sm:text-base mt-1">Get the latest games and updates delivered to your inbox.</p>

        <form className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded w-full sm:w-auto"
          />
          <button
            type="submit"
            className="bg-pink-600 text-white px-4 py-2 rounded"
          >
            Subscribe
          </button>
        </form>
      </div>

    </div>
  </div>
</div>

  );
};

export default Home;




