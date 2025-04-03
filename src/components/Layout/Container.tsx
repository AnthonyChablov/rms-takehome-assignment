import React from 'react';
import { cn } from '@/utils/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
}

const Container = ({
  children,
  className = '',
  dataTestId = 'container',
}: ContainerProps) => {
  return (
    <div
      data-testid={dataTestId}
      role="container"
      className={cn(
        ` max-w-[160rem] container mx-auto px-3 md:px-8 lg:px-12  ${className}`,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
