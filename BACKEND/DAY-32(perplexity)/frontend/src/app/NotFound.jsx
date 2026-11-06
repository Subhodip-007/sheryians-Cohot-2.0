import React from 'react';

const NotFound = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-900 flex flex-col items-center justify-center select-none">
      
      {/* Background Image Container */}
      <img 
        src="/download.jpg" // Replace with your actual image path or state asset
        alt="404 Not Found"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Interactive Back Button Overlay */}
      <div className="absolute bottom-10 z-10">
        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 font-semibold text-lg tracking-wide rounded-full text-white"
        >
          Return to Home
        </button>
      </div>

    </div>
  );
};

export default NotFound;
