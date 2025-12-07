import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider'; 

const MyListings = () => {
    // 1. Get User Context and States
    const { user } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Data Fetching Function (Only current user's listings)
    const fetchMyListings = async () => {
        // user এবং user.email না থাকলে ফেচিং বন্ধ
        if (!user || !user.email) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            // ✅ সার্ভারের নতুন রুট ব্যবহার করে ইউজার ইমেইল দিয়ে লিস্টিং ফেচ করা
            const response = await axios.get(`http://localhost:3100/my-listings-by-email?email=${user.email}`);
            setListings(response.data);
            toast.info(`Loaded ${response.data.length} listings.`, { autoClose: 1500 });
        } catch (error) {
            console.error("Error fetching user listings:", error);
            toast.error("Failed to load your listings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // ✅ কম্পোনেন্ট মাউন্ট হলেই ডেটা ফেচ করা
        fetchMyListings();
    }, [user]); 
    // user পরিবর্তন হলে useEffect আবার চলে, যা Firebase-এর লোডিং শেষে ডেটা ফেচ নিশ্চিত করে।

    // 3. Delete Functionality
    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete the listing: ${name}?`)) {
            return;
        }

        try {
            // সার্ভারের DELETE রুট ব্যবহার
            await axios.delete(`http://localhost:3100/listing/${id}`);
            toast.success(`Listing "${name}" deleted successfully!`);
            
            // ডিলিট হওয়ার পর তালিকা আপডেট করার জন্য রি-ফেচ করা
            fetchMyListings(); 

        } catch (error) {
            console.error("Deletion failed:", error);
            toast.error("Failed to delete listing.");
        }
    };

    // 4. Loading State
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Bars height="80" width="80" color="#79FFCC" ariaLabel="loading-indicator" />
            </div>
        );
    }
    
    // 5. Main Render
    return (
      <div className="py-10 text-gray-800 min-h-[70vh]">

    {/* Heading */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4 text-[#FF6347]">
        🐾 My Listings ({listings.length})
    </h1>

    <p className="text-center text-gray-500 mb-6 sm:mb-10 text-sm sm:text-base px-3">
        Manage the pets and supplies you have listed for adoption or sale.
    </p>

    {/* If no listings */}
    {listings.length === 0 ? (
        <div className="text-center p-6 sm:p-10 bg-gray-100 rounded-xl max-w-lg mx-auto border border-gray-300">
            <p className="text-lg sm:text-xl text-gray-600 mb-4">
                You have not listed any items yet.
            </p>
            <Link 
                to="/add-listing" 
                className="my-btn inline-block bg-[#79FFCC] px-5 py-2 sm:px-6 sm:py-3 rounded-lg text-gray-900 hover:bg-[#66E6B8] transition text-sm sm:text-base"
            >
                + Add Your First Listing
            </Link>
        </div>
    ) : (

        // Table container
        <div className="overflow-x-auto bg-white rounded-xl shadow-2xl border border-gray-200">
            
            <table className="table w-full text-gray-700 text-xs sm:text-sm md:text-base">

                {/* Header */}
                <thead>
                    <tr className="text-[#FF6347] border-b border-[#FF6347] text-xs sm:text-sm md:text-lg">
                        <th className="p-2 sm:p-3">Image</th>
                        <th className="p-2 sm:p-3">Name & Category</th>
                        <th className="p-2 sm:p-3">Location</th>
                        <th className="p-2 sm:p-3">Price</th>
                        <th className="p-2 sm:p-3">Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {listings.map((item) => (
                        <tr 
                            key={item._id} 
                            className="hover:bg-gray-50 border-b border-gray-200"
                        >
                            {/* Image */}
                            <td className="p-2 sm:p-3">
                                <div className="avatar">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="object-cover w-full h-full" 
                                        />
                                    </div>
                                </div>
                            </td>

                            {/* Name & Category */}
                            <td className="p-2 sm:p-3">
                                <div className="font-bold text-gray-900 text-sm sm:text-base">
                                    {item.name}
                                </div>
                                <span className="badge badge-sm bg-blue-100 text-blue-800 border-none mt-1">
                                    {item.category}
                                </span>
                            </td>

                            {/* Location */}
                            <td className="p-2 sm:p-3">
                                {item.location}
                            </td>

                            {/* Price */}
                            <td className="p-2 sm:p-3 text-[#FF6347] font-bold">
                                {typeof item.price === 'number'
                                    ? `৳${item.price.toLocaleString()}`
                                    : item.price}
                            </td>

                            {/* Actions */}
                            <td className="p-2 sm:p-3">
                                <div className="flex flex-col md:flex-row md:items-center gap-2">

                                    {/* Update */}
                                    <Link
                                        to={`/update-listing/${item._id}`}
                                        className="btn btn-xs sm:btn-sm bg-[#79FFCC] border-none text-gray-900 hover:bg-[#66E6B8] w-full md:w-auto"
                                    >
                                        Update
                                    </Link>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(item._id, item.name)}
                                        className="btn btn-xs sm:btn-sm bg-red-500 border-none text-white hover:bg-red-600 w-full md:w-auto"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )}
</div>

    );
};

export default MyListings;