import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify'; // ✅ React-Toastify

const Login = () => {
  const { setUser, handleGoogleSignin, loginWithEmailAndPassword, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    setLoading(true);

    loginWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        setUser(userCredential.user);
        toast.success("Login successful! Welcome back.");
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Login failed. Check your email or password!");
        setLoading(false);
      });
  };

  const googleSignIn = () => {
    setLoading(true);
    handleGoogleSignin()
      .then((result) => {
        setUser(result.user);
        toast.success("Google login successful!");
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed.");
        setLoading(false);
      });
  };

  return (
    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
      <div>
        <h1 className='text-4xl font-bold font-sans'>
          Welcome to <span className='text-yellow-500 italic font-extrabold text-5xl'>PawMart</span> 🐾
        </h1>
        <p>Log in to access your listings and orders.<br />New here? Register now.</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" placeholder="example@pawmart.com"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type='password' name="password" placeholder="••••••••"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              required />
          </div>

          <button type="submit" className="my-btn bg-blue-500 hover:bg-blue-600">Login</button>

          <Link to='/register' className="btn w-full text-black font-bold border-none hover:scale-105 transition-transform duration-200 bg-[#FFD700]">
            Don’t have an account? Register here
          </Link>

          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-white/30"></div>
            <span className="text-sm text-white/70">or</span>
            <div className="h-px w-16 bg-white/30"></div>
          </div>

          <button type="button" onClick={googleSignIn}
            className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

