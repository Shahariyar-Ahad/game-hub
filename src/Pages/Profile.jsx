import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.config'; // Assuming correct path to auth instance
import { toast } from 'react-toastify'; 

const Profile = () => { 
    // Get user and setUser from AuthContext
    const { user, setUser } = useContext(AuthContext);
    
    // State to toggle the update form visibility
    const [isOpen, setIsOpen] = useState(false);
    
    const handleOpenForm = () => {
        setIsOpen(!isOpen);
    };

    // Handler for updating Name and Photo URL
    const handleUpdate = (e) => {
        e.preventDefault();
        
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;
        
        if (!user) {
            toast.error("User not authenticated.");
            return;
        }

        // Firebase Update Profile call
        updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photoUrl 
        }).then(() => {
            // Update user state locally to reflect changes immediately
            setUser({ ...user, photoURL: photoUrl, displayName: name });
            
            toast.success("Profile updated successfully!");
            setIsOpen(false); // Close the form after successful update
        }).catch((error) => {
            console.error("Profile update error:", error);
            toast.error("Failed to update profile. Please try again.");
        });
    };

    return (
        <div className="py-10">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-[#FF6347]">My Profile</h1>

            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-2xl mx-auto text-center border-t-8 border-t-[#FF6347]">
                
                {/* Current Profile Information */}
                <div className="mb-6">
                    <div className="avatar mb-4">
                        <div className="w-32 rounded-full ring ring-[#FF6347] ring-offset-base-100 ring-offset-2">
                            {/* Display user photo, use a placeholder if not available */}
                            <img 
                                src={user?.photoURL || 'https://via.placeholder.com/150?text=P'} 
                                alt="Profile Avatar" 
                            />
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-1">{user?.displayName || 'N/A'}</h2>
                    <p className="text-lg text-gray-400 font-medium">{user?.email}</p>
                    
                    {/* UID (Optional) */}
                    <p className="text-sm text-gray-500 mt-2">
                        User ID: <span className='text-gray-600'>{user?.uid}</span>
                    </p>

                    <button 
                        className={`btn mt-6 ${isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-[#FF6347] hover:bg-[#E5533D]'} text-white border-none transition-colors`}
                        onClick={handleOpenForm}
                    >
                        {isOpen ? 'Cancel Update' : 'Update Profile'}
                    </button>
                </div>

                {/* Update Profile Form (Toggled) */}
                {isOpen && (
                    <form onSubmit={handleUpdate} className="mt-8 pt-6 border-t border-gray-700 space-y-4 text-left">
                        <h3 className="text-2xl font-bold text-[#79FFCC] mb-4">Update Details</h3>
                        
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Name</label>
                            <input 
                                type="text" 
                                name='name'
                                defaultValue={user?.displayName || ''} 
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 focus:border-[#FF6347]" 
                                placeholder="Your Name"
                            />
                        </div>
                        
                        {/* Photo URL Field */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Photo URL</label>
                            <input 
                                type="url" 
                                name='photoUrl'
                                defaultValue={user?.photoURL || ''} 
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 focus:border-[#FF6347]" 
                                placeholder="Paste new photo URL here"
                            />
                        </div>
                        
                        {/* Email (Readonly) */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Email (Cannot be changed here)</label>
                            <input 
                                type="email" 
                                defaultValue={user?.email || ''} 
                                className="input input-bordered w-full bg-gray-900 text-gray-400 cursor-not-allowed" 
                                readOnly
                            />
                        </div>

                        <button type="submit" className="my-btn mt-6 w-full">
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;