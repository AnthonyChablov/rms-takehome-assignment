import React from 'react';

interface ErrorProps {
  message?: string;
}

const Error = ({ message = 'An unexpected error occurred.' }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600">{message}</p>
        <p className="text-gray-500 mt-2">Please try again later.</p>
      </div>
    </div>
  );
};

export default Error;
