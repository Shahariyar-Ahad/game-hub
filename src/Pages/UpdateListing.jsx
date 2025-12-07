

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';
import { AuthContext } from '../provider/AuthProvider';

const UpdateListing = () => {
   
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    // 3. Fetch Listing Data 
    useEffect(() => {
        const fetchListingDetails = async () => {
            if (!id) return;
            setLoading(true);
            try {
                
                const response = await axios.get(`http://localhost:3100/listing/${id}`);
                setListing(response.data);
                
               
                if (response.data.ownerEmail !== user.email) {
                    toast.error("You are not authorized to update this listing.");
                    navigate('/my-listings', { replace: true });
                    return;
                }
            } catch (error) {
                console.error("Error fetching listing details:", error);
                toast.error("Failed to load listing details.");
                navigate('/my-listings', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        if (user) {
             fetchListingDetails();
        }
    }, [id, user, navigate]);

    // 4. Handle Update Submission 
    const handleUpdateForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        //   Price Parsing Logic from AddListing
        const priceValue = form.price.value.trim();
        let price;
        if (isNaN(parseInt(priceValue)) || priceValue === "0") {
            price = priceValue === "0" ? 0 : priceValue;
        } else {
            price = parseInt(priceValue);
        }

        const updatedData = {
            name: form.name.value,
            category: form.category.value,
            price,
            location: form.location.value,
            image: form.image.value,
            pickupDate: form.pickupDate.value,
            description: form.description.value,
            ownerEmail: user.email,
        };

        try {
           
            await axios.put(`http://localhost:3100/listing/${id}`, updatedData);
            toast.success(`Listing "${updatedData.name}" updated successfully!`);
            
           
            navigate('/my-listings'); 
            
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update listing.");
        }
    };

    // 5. Loading State
    if (loading || !listing) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Bars height="80" width="80" color="#FF6347" ariaLabel="loading-indicator" />
                <p className='text-xl ml-4'>Loading Listing Data...</p>
            </div>
        );
    }

    // 6. Render Form
    return (
       <div className="py-6 sm:py-10 px-4 sm:px-6"> 
    
    {/* Title Section */}
    <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-3 sm:mb-4 text-[#FF6347]">
        Update Listing: {listing.name}
    </h1>
    <p className="text-center text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
        Modify the details of your listing.
    </p>

    <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl max-w-4xl mx-auto border-4 border-blue-400"> 
        
        {/* Form -  */}
        <form onSubmit={handleUpdateForm} className="space-y-4 sm:space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                {/* Name */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-2">Product/Pet Name*</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={listing.name}
                        className="input input-bordered w-full bg-gray-700 text-white input-sm sm:input-md"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-2">Category*</label>
                    <select
                        name="category"
                        defaultValue={listing.category}
                        className="select select-bordered w-full bg-gray-700 text-white select-sm sm:select-md" 
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Pets">Pets</option>
                        <option value="Foods">Foods</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Care products">Care products</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-2">Price (৳)*</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={listing.price}
                        className="input input-bordered w-full bg-gray-700 text-white input-sm sm:input-md"
                        required
                    />
                    <p className="text-[10px] sm:text-xs text-yellow-400 mt-1">
                        Price is automatically set to 0 for pet adoption.
                    </p>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-2">Location*</label>
                    <input
                        type="text"
                        name="location"
                        defaultValue={listing.location}
                        className="input input-bordered w-full bg-gray-700 text-white input-sm sm:input-md"
                        required
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-2">Image URL*</label>
                    <input
                        type="url"
                        name="image"
                        defaultValue={listing.image}
                        className="input input-bordered w-full bg-gray-700 text-white input-sm sm:input-md"
                        required
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-2">Preferred Listing/Pickup Date</label>
                    <input
                        type="date"
                        name="pickupDate"
                        defaultValue={listing.pickupDate}
                        className="input input-bordered w-full bg-gray-700 text-white input-sm sm:input-md"
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-2">Description*</label>
                <textarea
                    name="description"
                    rows="4"
                    defaultValue={listing.description}
                    className="textarea textarea-bordered w-full bg-gray-700 text-white text-sm" 
                    required
                ></textarea>
            </div>

            {/* Owner Email  */}
            <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-2">Owner Email (Read-Only)</label>
                <input
                    type="email"
                    name="ownerEmail"
                    value={user?.email || ''} 
                    className="input input-bordered w-full bg-gray-900 text-gray-400 cursor-not-allowed input-sm sm:input-md"
                    readOnly
                />
            </div>

            {/* Button */}
            <button 
                type="submit" 
                className="my-btn mt-4 w-full text-base sm:text-lg bg-green-500 hover:bg-green-600 transition-colors duration-300"
            >
                Confirm Update
            </button>
        </form>
    </div>
</div>
    );
};

export default UpdateListing;