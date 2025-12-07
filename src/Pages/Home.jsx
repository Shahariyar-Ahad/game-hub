import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner'; 

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../Components/Carousel";








const Home = () => {
    const [recentListings, setRecentListings] = useState([]);
    const [categories, setCategories] =useState([])
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
      fetch('http://localhost:3100/recent-listings')
      .then(res => res.json())
      .then(data =>setRecentListings(data))
      .catch(err=> console.log(err)) 

      fetch('./category.json')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err))
        
        setTimeout(() => {
        
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Bars height="80" width="80" color="#FF6347" ariaLabel="loading-indicator" />
            </div>
        );
    }
      const sixlisting =recentListings.slice(0,6)
    return (
        <div className="text-white">

    {/* 1. Banner / Hero Section */}
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-xl overflow-hidden my-6 md:my-8">
        
        <Carousel className="h-full w-full">
            <CarouselContent>

                {/* Image 1 */}
                <CarouselItem className="relative">
                    <img 
                        src="/images/pets.jpg" 
                        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover" 
                        alt="Pets"
                    />
                    {/* Text for Image 1 */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 
                        bg-gradient-to-r from-[#FF7A3D]/90 to-[#FF4500]/90 
                        text-white px-5 py-3 sm:px-7 sm:py-4 rounded-xl shadow-xl backdrop-blur-md">
                        <h2 className="text-xl sm:text-3xl font-extrabold drop-shadow-md">Find Your Perfect Pet</h2>
                        <p className="text-xs sm:text-sm italic opacity-90">Cute and loving furry friends waiting for you</p>
                    </div>
                </CarouselItem>

                {/* Image 2 */}
                <CarouselItem className="relative">
                    <img 
                        src="/images/adopt.jpg" 
                        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover" 
                        alt="Adoption"
                    />
                    {/* Text for Image 2 */}
                    <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 
                        bg-gradient-to-r from-gray-900/95 to-black/70 
                        text-white px-5 py-3 sm:px-8 sm:py-5 rounded-2xl border-l-4 border-[#FF6347] shadow-2xl backdrop-blur-sm">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#79FFCC] drop-shadow-lg">
                            Happy Pets, Happy Life
                        </h2>
                        <p className="text-sm sm:text-base italic text-gray-100 mt-1">
                            Create beautiful memories with your pet
                        </p>
                    </div>
                </CarouselItem>

                {/* Image 3 */}
                <CarouselItem className="relative">
                    <img 
                        src="/images/happy.jpg" 
                        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover" 
                        alt="Happy"
                    />
                    {/* Text for Image 3 */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 
                        bg-gradient-to-r from-red-400 to-red-500
                        text-white px-5 py-3 sm:px-7 sm:py-4 rounded-xl border-l-4 border-yellow-400 shadow-xl">
                        <h2 className="text-xl sm:text-3xl font-extrabold text-black drop-shadow-lg">
                            Happy Pets, Happy Life
                        </h2>
                        <p className="text-xs sm:text-sm italic text-gray-200">
                            Create beautiful memories with your pet
                        </p>
                    </div>
                </CarouselItem>

            </CarouselContent>

            <CarouselPrevious className="hidden sm:flex" /> {/* Hide arrows on mobile for better touch experience */}
            <CarouselNext className="hidden sm:flex" />
        </Carousel>

    </div>

    <hr className="border-gray-700 my-6 md:my-10" />

    {/* 2. Category Section */}
    <section className="py-6 md:py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 text-[#FF6347]">Browse by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
            {categories.map((cat) => (
                <Link 
                    key={cat.name} 
                    to={`/category/${encodeURIComponent(cat.path)}`} 
                    className="text-center p-4 md:p-6 bg-gray-900 rounded-xl shadow-2xl 
                        hover:bg-red-400 transition-all duration-300 
                        transform hover:scale-105 hover:-translate-y-1 
                        border-t-4 border-t-[#FF6347]"
                >
                    <span className="text-4xl md:text-6xl block mb-2 md:mb-3">{cat.icon}</span>
                    <p className="text-sm md:text-lg font-semibold text-white">{cat.name}</p>
                </Link>
            ))}
        </div>
    </section>
    
    <hr className="border-gray-700 my-6 md:my-10" />

    {/* 3. Recent Listings Section (Latest 6 from MongoDB) */}
    <section className="py-6 md:py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 text-[#FF6347]">Latest Listings (Adopt or Buy)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
            {sixlisting.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden group">
                    <div className="flex justify-center">
                        {/* Modified: Image size fixed for mobile/small screens */}
                        <img 
                            src={item.img} 
                            alt={item.name} 
                            className="w-full h-48 md:h-56 object-cover group-hover:opacity-80 transition-opacity duration-300" 
                        />
                    </div>
                    <div className="p-5">
                        <h3 className="text-xl md:text-2xl font-bold mb-1 text-white truncate">{item.name}</h3>
                        <p className="text-xs md:text-sm text-gray-400 mb-3">{item.location}</p>
                        
                        <div className="flex justify-between items-center mb-4">
                            <span className="badge badge-sm md:badge-lg bg-yellow-600 text-white font-bold border-none">{item.category}</span>
                            <p className="text-lg md:text-xl font-extrabold text-[#79FFCC]">
                                {typeof item.price === 'number' ? `৳${item.price}` : item.price}
                            </p>
                        </div>

                        <Link 
                            to={`/listing/${item?._id}`} 
                            className="my-btn mt-4 flex items-center justify-center text-sm md:text-md"
                        >
                            See Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </section>
    
    <hr className="border-gray-700 my-6 md:my-10" />

    {/* 4. NEW: "Why Adopt from PawMart?" - Awareness Section */}
    <section className="py-8 md:py-16 bg-gray-900 rounded-xl shadow-2xl mb-6 md:mb-10 p-6 md:p-10 border-4 md:border-8 border-[#FF6347] mx-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-8 text-white text-center">
            <span className='text-[#FF6347]'>Why Adopt </span> from PawMart? 🐾
        </h2>
        <div className="text-sm md:text-lg space-y-4 text-gray-300 max-w-4xl mx-auto">
            <p className='flex items-start gap-3'>
                <span className="text-xl md:text-2xl text-yellow-400 flex-shrink-0">💡</span>
                **Saving a Life:** By adopting, you give a deserving animal a second chance at a loving home, reducing the burden on local shelters.
            </p>
            <p className='flex items-start gap-3'>
                <span className="text-xl md:text-2xl text-yellow-400 flex-shrink-0">💰</span>
                **Cost-Effective:** Adoption fees are often much lower than purchasing a pet, and usually include initial vaccinations and spay/neuter surgery.
            </p>
            <p className='flex items-start gap-3'>
                <span className="text-xl md:text-2xl text-yellow-400 flex-shrink-0">💖</span>
                **True Companionship:** Rescue pets often display unique gratitude and loyalty, making the bond incredibly rewarding. **Adopt, Don't Shop.**
            </p>
        </div>
    </section>
</div>
    );
};

export default Home;