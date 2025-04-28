import React from 'react';
import { cn } from '@/utils/utils';

interface ActionButtonProps {
  onClick: () => void; // Define the type of the onClick prop
  className?: string; // Make className optional
  children?: React.ReactNode; // Add children prop
  title?: string; // Add title prop
  disabled?: boolean; // Add disabled prop
}

const ActionButton = ({
  onClick: clearSelected,
  className,
  children,
  title = '',
  disabled = false, // Default to false if not provided
}: ActionButtonProps) => {
  return (
    <button
      disabled={disabled} // Apply disabled state to the button
      className={cn(
        `
        hover:cursor-pointer bg-blue-400 hover:bg-blue-500 text-white 
        font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out 
        focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`,
        className,
      )}
      onClick={clearSelected}
      type="button"
    >
      {title}
      {children}
    </button>
  );
};

export default ActionButton;
