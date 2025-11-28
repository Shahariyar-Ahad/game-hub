import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import auth from '../Firebase/Firebase.config';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
  const { setUser, handleGoogleSignin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Email/Password login
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);

        // Toast and navigate
        toast.success("Login successful!");
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed. Check your credentials!");
      });
  };

  // Google login
  const googleSignIn = () => {
    handleGoogleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);

        // Toast and navigate
        toast.success("Login successful!");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Google login failed");
      });
  };

  return (
    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
      <div>
        <h1 className='text-4xl font-bold font-sans'>
          Welcome to <span className='text-[#DA2C43] italic font-extrabold text-5xl'>Game Hub</span>
        </h1>
        <p>
          For download game you need to login first, if you have no account then create your account.<br />
          Click Register button
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type='text'
              name="password"
              placeholder="••••••••"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <span className='absolute right-2 top-9 cursor-pointer z-50'></span>
          </div>

          <button type="submit" className="my-btn">Login</button>

          <Link to='/register' className="btn w-full text-black font-bold border-none hover:scale-105 transition-transform duration-200 bg-[#FFD700]">
            Create your account
          </Link>

          <button
  className="hover:underline cursor-pointer"
  type="button"
  onClick={() =>
    navigate("/forget-password", { state: { email: document.querySelector('input[name="email"]').value } })
  }
>
  Forget password?
</button>


          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-white/30"></div>
            <span className="text-sm text-white/70">or</span>
            <div className="h-px w-16 bg-white/30"></div>
          </div>

          <button
            type="button"
            onClick={googleSignIn}
            className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1280px-Facebook_f_logo_%282019%29.svg.png"
              alt="facebook"
              className="w-5 h-5"
            />
            Continue with Facebook
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
