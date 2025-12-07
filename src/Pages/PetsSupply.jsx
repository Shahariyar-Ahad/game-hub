
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const PetsSupplies = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    
    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:3100/all-listings');
                if (!res.ok) {
                    throw new Error('Failed to fetch listings');
                }
                const data = await res.json();
                setListings(data);
                toast.success("All listings loaded!"); 
            } catch (err) {
                console.error("Error fetching listings:", err);
                toast.error("Could not load listings from the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    
    const allCategories = ['All', ...new Set(listings.map(item => item.category))].filter(Boolean); 

    
    const filteredListings = listings.filter(item => {
        
        const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;

        
        const searchLower = searchTerm.toLowerCase();
        const searchMatch = 
            item.name.toLowerCase().includes(searchLower) || 
            item.description.toLowerCase().includes(searchLower) ||
            item.location.toLowerCase().includes(searchLower);

        return categoryMatch && searchMatch;
    });
    
    
    const formatPrice = (price) => {
        return typeof price === 'number' ? `৳${price.toLocaleString()}` : price;
    };


   
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Bars height="80" width="80" color="#FF6347" ariaLabel="loading-indicator" />
            </div>
        );
    }

    return (
        <div className="text-white py-6 sm:py-8 px-4"> 
    
    {/* Page Header */}
    <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-3 sm:mb-4 text-[#79FFCC]">
        All Pets & Supplies
    </h1>
    <p className="text-center text-gray-400 mb-8 sm:mb-10 text-sm sm:text-base">
        Browse our available pets for adoption and the best pet supplies.
    </p>
    
    {/* Filter and Search Section  */}
    <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-xl mb-6 sm:mb-8 border border-gray-700 max-w-5xl mx-auto">
        
        {/* Search Input */}
        <div className="mb-4 sm:mb-6">
            <input
                type="text"
                placeholder="Search by Name, Description, or Location..."
                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 focus:border-[#FF6347] focus:ring-1 focus:ring-[#FF6347] input-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Category Buttons */}
        <h3 className="text-sm sm:text-md font-semibold text-white mb-2 text-center">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    
                    className={`btn btn-sm transition-colors text-xs sm:text-sm ${ 
                        selectedCategory === category 
                        ? 'bg-[#FF6347] border-[#FF6347] text-white hover:bg-[#E5533D]' 
                        : 'bg-gray-600 border-gray-600 text-white hover:bg-gray-500'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    </div>

    {/* Listings Grid (Mobile Optimized) */}
    <div className="max-w-7xl mx-auto"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredListings.length > 0 ? (
                filteredListings.map(item => (
                    // **Listing Card**
                    <div 
                        key={item._id} // MongoDB ID 
                        className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] border border-gray-700"
                    >
                        {/* Image Section */}
                        <div className='h-40 sm:h-48 w-full overflow-hidden'> 
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        
                        {/* Card Content */}
                        <div className="p-4 sm:p-5"> 
                            <h3 className="text-lg sm:text-xl font-bold mb-1 text-white truncate">{item.name}</h3>
                            
                            <div className="flex justify-between items-center text-xs sm:text-sm mb-3"> 
                                <p className="text-[#79FFCC] font-semibold">{item.category}</p>
                                <p className="text-gray-400">📍 {item.location}</p>
                            </div>
                            
                            <p className="text-xl sm:text-2xl font-extrabold mt-1 text-[#FF6347]">
                                {formatPrice(item.price)}
                            </p>
                            
                            <Link 
                                to={`/listing/${item._id}`} // Details Page Link
                                className="my-btn mt-4 flex items-center justify-center text-sm"
                            >
                                See Details
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                // No Listings Found State (Responsive)
                <div className="col-span-full text-center py-10 sm:py-20 bg-gray-900 rounded-xl border border-gray-700 mx-auto max-w-lg">
                    <p className="text-xl sm:text-2xl text-gray-400 px-4">Sorry, no listings found matching your criteria.</p>
                    <button 
                        onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                        className="my-btn btn-sm mt-4"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    </div>
</div>
    );
};

export default PetsSupplies;