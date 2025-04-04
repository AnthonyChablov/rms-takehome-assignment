import React from 'react';
import { cn } from '@/utils/utils';

/**
 * Container Component
 *
 * A flexible, responsive wrapper component designed to contain and center child elements on the page.
 * The container ensures that the content is displayed with consistent padding and alignment across various screen sizes.
 * It also allows for easy customization via the `className` prop, which can be used to apply additional styles.
 *
 * The component supports the following props:
 * - `children`: React.ReactNode - The content that will be rendered inside the container.
 * - `className`: string (optional) - Additional CSS classes to customize the container’s appearance.
 * - `dataTestId`: string (optional) - A custom `data-testid` attribute for testing purposes.
 *
 * @param {ContainerProps} props - The props passed to the component.
 * @returns JSX.Element - The container element with the child content inside.
 */
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
}

/**
 * The `Container` component accepts the following props:
 * - `children`: The child elements to be wrapped inside the container.
 * - `className`: Optionally pass extra Tailwind CSS classes to customize the container's appearance.
 * - `dataTestId`: Optionally provide a unique identifier for testing purposes.
 *
 * This component applies a set of default responsive styles, including:
 * - `max-w-[160rem]`: Limits the maximum width of the container.
 * - `mx-auto`: Centers the container horizontally.
 * - `px-3`, `md:px-8`, `lg:px-12`: Adds responsive padding on the left and right sides based on screen size.
 */
const Container = ({
  children,
  className = '', // Default value is an empty string if no className is provided.
  dataTestId = 'container', // Default data-testid value for testing.
}: ContainerProps) => {
  return (
    <div
      data-testid={dataTestId}
      role="container"
      className={cn(
        `max-w-[160rem] container mx-auto px-3 md:px-8 lg:px-12 ${className}`, // Combine default styles with any custom className passed as a prop.
      )}
    >
      {children}{' '}
      {/* Render the child elements passed to the Container component */}
    </div>
  );
};

export default Container;
