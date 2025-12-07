import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddListing = () => { 
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;

        const priceValue = form.price.value.trim();
        let price;
        if (isNaN(parseInt(priceValue)) || priceValue === "0") {
            price = priceValue === "0" ? 0 : priceValue;
        } else {
            price = parseInt(priceValue);
        }

        const formData = {
            name: form.name.value,
            category: form.category.value,
            price,
            location: form.location.value,
            image: form.image.value,
            pickupDate: form.pickupDate.value,
            description: form.description.value,
            ownerEmail: form.ownerEmail.value
        };

        console.log(formData);

        axios.post('http://localhost:3100/add-listing', formData)
            .then(res => {
                console.log(res);
                toast.success("Your listing is added successfully!");

               
                navigate("/my-listings");
            })
            .catch(err => {
                console.log(err);
                toast.error("Something went wrong!");
            });
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Bars height="80" width="80" color="#FF6347" ariaLabel="loading-indicator" />
            </div>
        );
    }

    return (
       <div className="py-10 px-4 sm:px-6">

    {/* Heading */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4 text-[#FF6347]">
        Add New Listing
    </h1>

    <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
        Offer a pet for adoption or list products for sale.
    </p>

    {/* Form Container */}
    <div className="bg-blue-400 p-5 sm:p-8 rounded-xl shadow-2xl max-w-4xl mx-auto">

        <form onSubmit={handleForm} className="space-y-6">

            {/* Grid Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Product/Pet Name*</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g., Golden Retriever puppy"
                        className="input input-bordered w-full bg-gray-700 text-white"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Category*</label>
                    <select
                        name="category"
                        className="select select-bordered w-full bg-gray-700 text-white"
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
                    <label className="block text-sm font-medium text-white mb-2">Price (৳)*</label>
                    <input
                        type="number"
                        name="price"
                        className="input input-bordered w-full bg-gray-700 text-white"
                        required
                    />
                    <p className="text-xs text-yellow-300 mt-1">
                        Price automatically becomes 0 for pet adoption.
                    </p>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Location*</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="e.g., Dhaka, Gulshan"
                        className="input input-bordered w-full bg-gray-700 text-white"
                        required
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Image URL*</label>
                    <input
                        type="url"
                        name="image"
                        placeholder="Paste image link"
                        className="input input-bordered w-full bg-gray-700 text-white"
                        required
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Preferred Listing/Pickup Date</label>
                    <input
                        type="date"
                        name="pickupDate"
                        className="input input-bordered w-full bg-gray-700 text-white"
                        required
                    />
                </div>

            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-white mb-2">Description*</label>
                <textarea
                    name="description"
                    rows="4"
                    placeholder="Write a detailed description"
                    className="textarea textarea-bordered w-full bg-gray-700 text-white"
                    required
                ></textarea>
            </div>

            {/* Owner Email */}
            <div>
                <label className="block text-sm font-medium text-white mb-2">Owner Email (Read-Only)</label>
                <input
                    type="email"
                    name="ownerEmail"
                    value={user?.email}
                    className="input input-bordered w-full bg-gray-900 text-gray-400 cursor-not-allowed"
                    readOnly
                />
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                className="my-btn w-full sm:w-auto mt-4"
            >
                Add Listing to PawMart
            </button>

        </form>
    </div>
</div>

    );
};

export default AddListing;
