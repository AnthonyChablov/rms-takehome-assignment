import React from 'react';

/**
 * Error Component
 *
 * A simple, reusable component to display error messages to users when something goes wrong.
 * It renders an error message with a friendly UI and suggests that the user try again later.
 *
 * The component can be used anywhere in the application where an error needs to be displayed.
 * It accepts an optional `message` prop to customize the error message. If no message is provided,
 * a default message is displayed.
 *
 * Props:
 * - `message`: string (optional) - The error message to display. If no message is passed, a default message
 *   "An unexpected error occurred." will be shown.
 *
 * @param {ErrorProps} props - The props passed to the component.
 * @returns JSX.Element - The rendered error message UI.
 */
interface ErrorProps {
  message?: string; // Optional error message to be displayed.
}

/**
 * The `Error` component displays a user-friendly error message.
 * It is designed to be simple and reusable across the application for showing errors with a consistent UI.
 *
 * - The message is customizable via the `message` prop.
 * - If no message is provided, a default message is shown: "An unexpected error occurred."
 * - It uses a flexbox layout to center the content and provide adequate spacing.
 */
const Error = ({ message = 'An unexpected error occurred.' }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-10">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Oops! Something went wrong.
        </h2>
        {/* Display the custom or default error message */}
        <p className="text-gray-600">{message}</p>
        {/* Inform the user to try again later */}
        <p className="text-gray-500 mt-2">Please try again later.</p>
      </div>
    </div>
  );
};

export default Error;
