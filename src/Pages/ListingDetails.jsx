import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider'; 
import OrderModal from './OrderModal';

const ListingDetails = () => {
    const { id } = useParams(); 
    const { user, loading: userLoading } = useContext(AuthContext); 
    
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false); 

    
    useEffect(() => {
        const fetchListingDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3100/listing/${id}`);
                setListing(response.data);
            } catch (error) {
                console.error("Error fetching listing details:", error);
                toast.error("Failed to load listing details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchListingDetails();
        }
    }, [id]);
    
    
    if (loading || userLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Bars height="80" width="80" color="#FF6347" ariaLabel="loading-indicator" />
            </div>
        );
    }

    if (!listing) {
        return <div className="text-white text-center py-10 text-xl">Listing Not Found.</div>;
    }
    
    const { name, category, ownerEmail, description, price, location, image } = listing;
    const formattedPrice = typeof price === 'number' 
        ? `৳${price.toLocaleString()}` 
        : price;
    const isOwner = user && user.email === ownerEmail;

    const listingType = category.toLowerCase().includes('pet') ? 'Pet (Adoption)' : 'Product (Sale)';

    return (
       <div className="py-6 sm:py-10 text-white px-4"> 
    
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-2xl border-t-4 sm:border-t-8 border-[#FF6347] overflow-hidden">
        
        {/* Image and Title Header */}
        <div className="h-64 sm:h-80 w-full overflow-hidden">
            <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
            />
        </div>

        <div className="p-4 sm:p-6 md:p-8"> 
            
            {/* Title & Price Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 border-b border-gray-700 pb-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#79FFCC] mb-2 sm:mb-0">{name}</h1>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF6347]">{formattedPrice}</p> 
            </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 mb-6 sm:mb-8 text-gray-300"> 
                
                {/* Category */}
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-semibold uppercase text-yellow-400">Category</span>
                    <span className="text-base sm:text-lg font-medium">{category}</span>
                </div>
                
                {/* Location */}
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-semibold uppercase text-yellow-400">Location</span>
                    <span className="text-base sm:text-lg font-medium">📍 {location}</span>
                </div>
                
                {/* Listing Type */}
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-semibold uppercase text-yellow-400">Listing Type</span>
                    <span className="text-base sm:text-lg font-medium">{listingType}</span>
                </div>
                
                {/* Owner's Email */}
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-semibold uppercase text-yellow-400">Owner's Email</span>
                    <span className="text-base sm:text-lg font-medium truncate">{ownerEmail}</span>
                </div>
            </div>

            
            {/* Description */}
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white border-t border-gray-700 pt-4 sm:pt-6">Description</h2> 
            <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"> 
                {description}
            </p>

            
            {/* Action Section */}
            {isOwner ? (
                <div className='p-3 sm:p-4 bg-gray-800 rounded-lg text-center'> 
                    <p className="text-base sm:text-xl font-bold text-red-400">You are the owner of this listing.</p>
                    <Link to="/my-listings" className='text-xs sm:text-sm text-gray-400 underline hover:text-white'>View your listings</Link>
                </div>
            ) : (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="my-btn w-full text-lg sm:text-xl font-bold" 
                >
                    Adopt / Order Now
                </button>
            )}
        </div>
    </div>
    
    
    {/* OrderModal Component */}
    <OrderModal
        listing={listing}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
    />
</div>
    );
};

export default ListingDetails;