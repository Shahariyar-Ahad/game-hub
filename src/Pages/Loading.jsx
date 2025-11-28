
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
     
      <div className="w-20 h-20 border-4 border-t-[#00D390] border-b-[#DA2C43] border-l-transparent border-r-transparent rounded-full animate-spin mb-6"></div>
      
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 animate-pulse">Loading...</h1>
      <p className="text-white/70 text-center max-w-xs">
        Please wait while we fetch your data. This might take a few seconds.
      </p>
    </div>
  );
};

export default LoadingPage;
