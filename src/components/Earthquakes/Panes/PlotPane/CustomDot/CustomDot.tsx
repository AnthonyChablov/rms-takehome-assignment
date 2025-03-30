import React from 'react';
import { DotProps } from 'recharts';

interface CustomDotProps<T extends Record<string, any>> extends DotProps {
  cx?: number;
  cy?: number;
  payload?: T;
  selectedPoint?: T | null;
  onClick?: (event: any) => void;
  onMouseOver?: (event: any) => void;
  onMouseLeave?: () => void;
}

const CustomDot = <T extends Record<string, any>>({
  cx,
  cy,
  payload,
  r,
  fill,
  stroke,
  strokeWidth,
  selectedPoint,
  onClick,
  onMouseOver,
  onMouseLeave,
}: CustomDotProps<T>) => {
  const isHighlighted = selectedPoint && payload === selectedPoint;
  const dotRadius = isHighlighted ? 8.5 : 6;
  const dotFill = isHighlighted ? '#2b7fff' : fill || '#8ec5ff'; // Highlight color

  return (
    <circle
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      cx={cx}
      cy={cy}
      r={dotRadius}
      fill={dotFill}
      stroke={stroke || '#155dfc'}
      strokeWidth={strokeWidth || 1}
    />
  );
};

export default CustomDot;
