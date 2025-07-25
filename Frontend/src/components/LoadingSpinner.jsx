import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-3">
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-300 border-t-primary-600`}
        ></div>
        {text && <span className="text-gray-600 font-medium">{text}</span>}
      </div>
    </div>
  );
};

export default LoadingSpinner; 