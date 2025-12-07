import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const CategoryFiltered = () => {
 
    const { categoryName } = useParams(); 
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Price Formatting Helper (Optional but good practice)
    const formatPrice = (price) => {
        return typeof price === 'number' ? `৳${price.toLocaleString()}` : price;
    };

    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
             
            const decodedCategory = decodeURIComponent(categoryName); 

            try {
                
                const url = `http://localhost:3100/listings-by-category?category=${decodedCategory}`;
                const res = await fetch(url);
                
                if (!res.ok) {
                    throw new Error(`Failed to fetch listings for ${decodedCategory}`);
                }
                const data = await res.json();
                setListings(data);
                toast.success(`${data.length} listings loaded for ${decodedCategory}!`); 
            } catch (err) {
                console.error("Error fetching filtered listings:", err);
                toast.error(`Could not load listings for ${decodedCategory}.`);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [categoryName]); // categoryName change, use effect run again


    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Bars height="80" width="80" color="#FF6347" ariaLabel="loading-indicator" />
            </div>
        );
    }
    
    return (
       <div className="text-white py-6 sm:py-8">
    
    {/* Page Title */}
    <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10 px-4">
        <span className='text-[#FF6347]'>Filtered Category:</span> {decodeURIComponent(categoryName)}
    </h1>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {listings.length === 0 ? (
            // No Listings Found State (Responsive)
            <div className="col-span-full text-center py-10 sm:py-20 bg-gray-900 rounded-xl border border-gray-700 mx-auto max-w-lg">
                <p className="text-xl sm:text-2xl text-gray-400 px-4">
                    Sorry, no listings found in the <span className='text-[#79FFCC]'>{decodeURIComponent(categoryName)}</span> category.
                </p>
                <Link to="/pets-supplies" className="my-btn btn-sm mt-4">
                    Go to All Listings
                </Link>
            </div>
        ) : (
            // 3-Column Grid Layout (Responsive)
            // Mobile: 1 Column | Tablet/Small Desktop: 2 Columns | Large Desktop: 3 Columns
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {listings.map(item => (
                    // **Listing Card** (Mobile Optimized)
                    <div 
                        key={item._id} // MongoDB ID 
                        className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] border border-gray-700"
                    >
                        {/* Image Section */}
                        <div className='h-40 sm:h-48 w-full overflow-hidden'> 
                            <img 
                                src={item.image || item.img} // ensure to use the correct image field (image or img)
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300" 
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
                ))}
            </div>
        )}
    </div>
</div>
    );
};

export default CategoryFiltered;