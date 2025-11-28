import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Prefill email if passed from login page
  const initialEmail = location.state?.email || "";
  const [email, setEmail] = useState(initialEmail);

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Reset email sent! Check your Gmail.");
        // Optionally redirect to Gmail (web version)
        window.open("https://mail.google.com/", "_blank");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <form
        onSubmit={handleReset}
        className="bg-gray-800 p-8 rounded-xl w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Reset Your Password
        </h2>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded text-white font-semibold mt-2"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
