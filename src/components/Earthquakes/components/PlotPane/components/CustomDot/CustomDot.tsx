import React from 'react';
import { DotProps } from 'recharts';

interface CustomDotProps<T extends Record<string, any>> extends DotProps {
  cx?: number;
  cy?: number;
  payload?: T;
  selectedPoint?: T | null;
  highlightedPoint?: T | null;
  onClick?: (event: any) => void;
  onMouseOver?: (event: any) => void;
  onMouseLeave?: () => void;
  defaultFill?: string;
  highlightFill?: string;
  selectFill?: string;
  highlightRadius?: number;
  defaultRadius?: number;
  selectRadius?: number;
  selectedStroke?: string;
  selectedStrokeWidth?: number;
  selectedInnerRadius?: number;
  selectedInnerFill?: string;
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
  highlightedPoint,
  onClick,
  onMouseOver,
  onMouseLeave,
  defaultFill = '#8ec5ff', // Default fill color
  highlightFill = '#2b7fff', // Highlight color
  selectFill = '#00c950', // Select color
  highlightRadius = 9, // Radius when highlighted
  defaultRadius = 6, // Default radius
  selectRadius = 12, // Radius when selected
  selectedStroke = '#155dfc', // Stroke color when selected
  selectedStrokeWidth = 1, // Stroke width when selected
  selectedInnerRadius = 5, // Radius of the inner dot when selected (increased)
  selectedInnerFill = '#fff', // Fill color of the inner dot when selected
}: CustomDotProps<T>) => {
  const isHighlighted = highlightedPoint && payload === highlightedPoint;
  const isSelected = selectedPoint && payload === selectedPoint;

  let dotRadius = defaultRadius;
  let dotFill = defaultFill;
  let currentStroke = stroke || '#155dfc';
  let currentStrokeWidth = strokeWidth || 1;

  if (isSelected) {
    dotRadius = selectRadius;
    dotFill = selectFill;
    currentStroke = selectedStroke;
    currentStrokeWidth = selectedStrokeWidth;
  } else if (isHighlighted) {
    dotRadius = highlightRadius;
    dotFill = highlightFill;
  } else if (fill) {
    dotFill = fill;
  } else {
    dotFill = defaultFill;
  }

  return (
    <g>
      <circle
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        cx={cx}
        cy={cy}
        r={dotRadius}
        fill={dotFill}
        stroke={currentStroke}
        strokeWidth={currentStrokeWidth}
      />
      {isSelected && selectedInnerRadius > 0 && (
        <circle
          cx={cx}
          cy={cy}
          r={selectedInnerRadius}
          fill={selectedInnerFill}
        />
      )}
    </g>
  );
};

export default CustomDot;
