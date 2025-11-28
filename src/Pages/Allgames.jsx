
import useGames from '../Hooks/UseHook';
import GameCard from '../Components/GameCard';
import LoadingPage from './Loading';

const ALLGames = () => {
    const {games,loading}=useGames()
    if (loading) return <LoadingPage />;
    const allGames= [...games]
  .sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings))
    console.log(games)
    return (
      <div>

  {/* ======= Header ======= */}
  <div className="text-center my-10 sm:my-16 px-4">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-black">
      Our All Games Here
    </h1>
    <p className="font-medium text-gray-600 text-sm sm:text-base md:text-lg">
      Explore all games on the market. Play for millions.
    </p>
  </div>

  {/* ======= Search + Count ======= */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mx-4 sm:mx-5">

    {/* Total Count */}
    <h2 className="text-black text-lg">
      <span className="font-bold">{allGames.length}</span> Games here
    </h2>

    {/* Search Box */}
    
  </div>

  {/* ======= Games Grid ======= */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:p-5">
    {allGames.map((game) => (
      <GameCard key={game.id} game={game} />
    ))}
  </div>

</div>

    );
};

export default ALLGames;