import React from 'react';
import { cn } from '@/utils/utils';

interface ActionButtonProps {
  onClick: () => void; // Define the type of the onClick prop
  className?: string; // Make className optional
  children?: React.ReactNode; // Add children prop
  title?: string; // Add title prop
  disabled?: boolean; // Add disabled prop
  active?: boolean; // NEW: Prop to indicate if the button is active
}

const ActionButton = ({
  onClick: clearSelected, // Keeping the original destructuring
  className,
  children,
  title = '',
  disabled = false,
  active = false, // Default to false if not provided
}: ActionButtonProps) => {
  return (
    <button
      disabled={disabled} // Apply disabled state to the button
      className={cn(
        `
        hover:cursor-pointer font-semibold py-2 px-4 shadow-sm transition duration-200 ease-in-out rounded-sm
        focus:outline-none focus:ring-2 focus:ring-opacity-50`, // Base styles
        active
          ? 'bg-blue-600 text-white shadow-md focus:ring-blue-300 active' // Styles for active state
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-300 inactive', // Styles for inactive state
        className, // Apply any additional classes passed in
      )}
      onClick={clearSelected} // Still using clearSelected here
      type="button"
    >
      {title}
      {children}
    </button>
  );
};

export default ActionButton;
