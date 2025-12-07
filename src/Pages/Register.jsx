import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.config';
import { toast } from 'react-toastify'; 

const Register = () => {
  const { registerWithEmailAndPassword, setUser, handleGoogleSignin, setLoading } = useContext(AuthContext);
 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
  

    // Password Validation
    if (pass.length < 6) return toast.error("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(pass)) return toast.error("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(pass)) return toast.error("Password must contain at least one lowercase letter.");
  

    setLoading(true);
    registerWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        updateProfile(auth.currentUser, { displayName: name, photoURL: photo }) //updateProfile(someUser, someDataObject)

          .then(() => {
            setUser(userCredential.user);
            toast.success("Registration successful! Welcome to PawMart.");
            navigate("/");
            setLoading(false);
          })
          .catch((err) => {
            console.error("Profile update failed:", err);
            toast.error("Profile update failed.");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        toast.error(err.message.includes('email-already-in-use') 
                    ? "This email is already in use." 
                    : "Registration failed. Please try again.");
        setLoading(false);
      });
  }; 
  

  const googleSignIn = () => {
    setLoading(true);
    handleGoogleSignin()
      .then(() => {
        toast.success("Google Sign-in successful! Welcome to PawMart.");
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Google Sign-in failed:", err);
        toast.error("Google Sign-in failed.");
        setLoading(false);
      });
  };

  return (
    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
      <div>
        <h1 className='text-4xl font-bold font-sans'>Create your PawMart Account 🐾</h1>
        <p>Join our community to list pets for adoption or find pet supplies.</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" name="name" placeholder="Your Name"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input type="url" name="photo" placeholder="https://example.com/your-photo.jpg"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" placeholder="example@pawmart.com"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type='password' name="password" placeholder="•••••••• (Min 6 chars, A, a)"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              required />
            <p className='text-xs text-white/50 mt-1'>Minimum 6 characters, must include 1 uppercase and 1 lowercase letter.</p>
          </div>

          <button type="submit" className="my-btn bg-blue-500 hover:bg-blue-600">Register</button>

          <button type="button" onClick={googleSignIn}
            className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="text-center mt-3">
            <p className="text-sm text-white/80">
              Already have an account? <Link to="/login" className="text-red-500 hover:text-white font-medium underline">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
