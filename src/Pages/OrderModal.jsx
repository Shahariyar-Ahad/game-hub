import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const OrderModal = ({ listing, isOpen, onClose, user }) => {
    
   
    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.target;
        
       
        const buyerName = form.buyerName.value; 
        const buyerPhone = form.buyerPhone.value; 
        const buyerAddress = form.buyerAddress.value; 
        const pickupDate = form.pickupDate.value;
        const notes = form.notes.value;
        
        
        const isPet = listing.category.toLowerCase().includes("pet");
        const quantity = isPet 
            ? 1 
            : parseInt(form.quantity.value || 1); 
        
        
        const orderData = {
            
            listingId: listing._id,
            listingName: listing.name,
            listingPrice: listing.price, 
            category: listing.category, 
            ownerEmail: listing.ownerEmail,

           
            buyerName: buyerName, 
            buyerEmail: user.email, 
            buyerPhone: buyerPhone, 
            buyerAddress: buyerAddress, 
            
            
            pickupDate: pickupDate,
            notes: notes,
            quantity: quantity,
            
           
            orderDate: new Date().toISOString(),
            status: 'Pending',
            createdAt: new Date(),
        };

        // 3. API Call: 
        try {
            await axios.post('http://localhost:3100/add-order', orderData);
            toast.success("Order/Adoption request submitted successfully!");
            onClose(); 
        } catch (error) {
            console.error("Order submission failed:", error.response?.data || error.message);
            toast.error("Failed to submit order.");
        }
    };

    if (!isOpen) return null; 
    
    // 4. Modal Design 
    return (
       <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-3 sm:p-4">
    <div className="bg-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-2xl max-w-sm sm:max-w-md w-full border border-[#FF6347]
                    max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">

        <h3 className="text-xl sm:text-2xl font-bold text-[#79FFCC] mb-3 sm:mb-4">
            Place Order for {listing.name}
        </h3>

        <form onSubmit={handleOrderSubmit} className="space-y-3 sm:space-y-4">

            {/* Read-only Listing Info */}
            <input
                type="text"
                value={`Product: ${listing.name} | Price: ৳${listing.price.toLocaleString()}`}
                className="input input-bordered w-full bg-gray-900 text-white cursor-not-allowed input-sm sm:input-md text-xs sm:text-sm"
                readOnly
            />

            {/* Buyer Email */}
            <label className="block text-xs sm:text-sm font-medium text-gray-400">Your Email (Buyer)</label>
            <input
                type="email"
                value={user.email}
                className="input input-bordered w-full bg-gray-900 text-gray-400 cursor-not-allowed input-sm sm:input-md text-xs sm:text-sm"
                readOnly
            />

            {/* Quantity */}
            <label className="block text-xs sm:text-sm font-medium text-white">Quantity*</label>

            {listing.category.toLowerCase().includes("pet") ? (
                <input
                    type="number"
                    name="quantity"
                    value={1}
                    readOnly
                    className="input input-bordered w-full bg-gray-900 text-gray-400 cursor-not-allowed input-sm sm:input-md text-xs sm:text-sm"
                />
            ) : (
                <input
                    type="number"
                    name="quantity"
                    min={1}
                    defaultValue={1}
                    placeholder="Quantity to Order"
                    className="input input-bordered w-full bg-gray-700 text-white focus:border-[#79FFCC] input-sm sm:input-md text-xs sm:text-sm"
                    required
                />
            )}

            {/* Buyer Name */}
            <label className="block text-xs sm:text-sm font-medium text-white">Your Name*</label>
            <input
                type="text"
                name="buyerName"
                defaultValue={user.displayName || ""}
                placeholder="Your Full Name"
                className="input input-bordered w-full bg-gray-700 text-white input-sm sm:input-md text-xs sm:text-sm"
                required
            />

            {/* Phone */}
            <label className="block text-xs sm:text-sm font-medium text-white">Phone Number*</label>
            <input
                type="text"
                name="buyerPhone"
                placeholder="Your Phone Number"
                className="input input-bordered w-full bg-gray-700 text-white focus:border-[#79FFCC] input-sm sm:input-md text-xs sm:text-sm"
                required
            />

            {/* Address */}
            <label className="block text-xs sm:text-sm font-medium text-white">Delivery/Pickup Address*</label>
            <textarea
                name="buyerAddress"
                placeholder="Your Full Address (e.g., House No, Street, City)"
                rows="2"
                className="textarea textarea-bordered w-full bg-gray-700 text-white focus:border-[#79FFCC] text-xs sm:text-sm"
                required
            ></textarea>

            {/* Notes */}
            <label className="block text-xs sm:text-sm font-medium text-white">Additional Notes (Optional)</label>
            <textarea
                name="notes"
                placeholder="Any special instructions or notes"
                rows="2"
                className="textarea textarea-bordered w-full bg-gray-700 text-white focus:border-[#79FFCC] text-xs sm:text-sm"
            ></textarea>

            {/* Preferred Date */}
            <label className="block text-xs sm:text-sm font-medium text-white">Preferred Pickup Date*</label>
            <input
                type="date"
                name="pickupDate"
                className="input input-bordered w-full bg-gray-700 text-white focus:border-[#79FFCC] input-sm sm:input-md text-xs sm:text-sm"
                required
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-3 sm:pt-4 sticky bottom-0 bg-gray-800 py-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="btn border-none bg-red-600 text-white hover:bg-red-700 font-bold btn-sm sm:btn-md"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn border-none bg-[#79FFCC] text-gray-900 hover:bg-[#66E6B8] font-bold btn-sm sm:btn-md"
                >
                    Confirm Order
                </button>
            </div>
        </form>
    </div>
</div>

    );
};

export default OrderModal;