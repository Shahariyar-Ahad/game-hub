import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.config';
import { toast } from 'react-toastify';

const Register = () => {
  const {registerWithEmailAndPassword,setUser, user,handleGoogleSignin}=useContext(AuthContext)
  const navigate = useNavigate();
  const handleSubmit =(e) => {
    e.preventDefault()
    const email=e.target.email.value
    const pass=e.target.password.value
    const name=e.target.name.value
    const photo=e.target.photo.value
    registerWithEmailAndPassword(email,pass,name,photo)
    .then((userCredential)=>{
      
      updateProfile(auth.currentUser, {
  displayName: name, photoURL: photo
}).then(() => {
  toast.success("Your account has been created. Please log in now.");
        navigate("/Login");
 
  setUser(userCredential.user)
}).catch((error) => {
  // An error occurred
  // ...
  console.log(error)
});
    })
    .catch(err=>{
      console.log(err)
    })
  }
  console.log(user)
  const googleSignIn = () => {
  handleGoogleSignin()
    .then(() => {
      toast.success("Your account has been created. Please log in now.");
      navigate("/Login");
    })
    .catch(err => console.log(err));
};

    return (
       <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
        <div>
            <h1 className='text-4xl font-bold font-sans'>Create your  Account </h1>
            <p>For download game you need to login first ,if you  have no account then create your account</p>
        </div>
        <div>
                        <form  onSubmit={handleSubmit} className="space-y-4">
               <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="write your name"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
               <div>
                <label className="block text-sm font-medium mb-1">photo</label>
                <input
                  type="text"
                  name="photo"
                  placeholder="your photo"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              
              

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type='text'
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <span className='absolute right-2 top-9 cursor-pointer z-50' >
                  
                </span>
                
              </div>

              <button type="submit" className="my-btn">
                Sign Up
              </button> 
               <button
                type="button" onClick={googleSignIn}
                className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
              <div className="text-center mt-3">
                <p className="text-sm text-white/80">
                  Already have an account?{" "}
                  <Link
                    to="/Login"
                    className="text-red-500 hover:text-white font-medium underline"
                  >
                    LogIn
                  </Link>
                </p>
              </div>
            </form>
        </div>
       </div>
    );
};

export default Register; 

