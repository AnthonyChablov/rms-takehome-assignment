import React from 'react';
import { DotProps } from 'recharts';

/**
 * CustomDotProps is an extended interface for props that a custom dot component can accept.
 * It includes properties for controlling the dot's appearance, interaction, and behavior in a chart.
 *
 * @template T - The type of the data object passed as the payload, extending the generic object type.
 */
interface CustomDotProps<T extends Record<string, any>> extends DotProps {
  // Coordinates for the center of the dot
  cx?: number;
  cy?: number;

  // The data payload for this dot
  payload?: T;

  // The point selected by the user (for special styles)
  selectedPoint?: T | null;

  // The point being hovered over (for highlighting)
  highlightedPoint?: T | null;

  // Callback function when the dot is clicked
  onClick?: (event: any) => void;

  // Callback function when the mouse hovers over the dot
  onMouseOver?: (event: any) => void;

  // Callback function when the mouse leaves the dot
  onMouseLeave?: () => void;

  // Default fill color of the dot
  defaultFill?: string;

  // Fill color when the dot is highlighted
  highlightFill?: string;

  // Fill color when the dot is selected
  selectFill?: string;

  // Radius of the dot when it is highlighted
  highlightRadius?: number;

  // Default radius of the dot
  defaultRadius?: number;

  // Radius of the dot when it is selected
  selectRadius?: number;

  // Stroke color when the dot is selected
  selectedStroke?: string;

  // Stroke width when the dot is selected
  selectedStrokeWidth?: number;

  // Inner radius of the dot when selected (for visual effects like inner circles)
  selectedInnerRadius?: number;

  // Fill color of the inner circle when selected
  selectedInnerFill?: string;
}

/**
 * CustomDot is a reusable component that renders a dot with customizable styles and interactions.
 * This component is typically used in data visualization charts where dots represent data points.
 * It allows customization of the dot’s size, color, and interaction styles based on its selection or highlight state.
 *
 * @template T - The type of the data object passed as the payload, extending the generic object type.
 *
 * @param cx - The x-coordinate of the dot.
 * @param cy - The y-coordinate of the dot.
 * @param payload - The data associated with this dot, used for comparisons with selected and highlighted points.
 * @param r - The radius of the outer circle (dot).
 * @param fill - The fill color of the outer circle (dot).
 * @param stroke - The stroke color of the outer circle (dot).
 * @param strokeWidth - The width of the stroke for the outer circle.
 * @param selectedPoint - The point that is currently selected (used to apply selection styles).
 * @param highlightedPoint - The point that is currently being hovered over (used to apply highlighting styles).
 * @param onClick - Callback function when the dot is clicked.
 * @param onMouseOver - Callback function when the mouse hovers over the dot.
 * @param onMouseLeave - Callback function when the mouse leaves the dot.
 * @param defaultFill - Default fill color for the dot if no specific fill is provided.
 * @param highlightFill - Fill color for the dot when it is highlighted.
 * @param selectFill - Fill color for the dot when it is selected.
 * @param highlightRadius - Radius of the dot when it is highlighted.
 * @param defaultRadius - Default radius of the dot.
 * @param selectRadius - Radius of the dot when it is selected.
 * @param selectedStroke - Stroke color when the dot is selected.
 * @param selectedStrokeWidth - Stroke width when the dot is selected.
 * @param selectedInnerRadius - Inner radius of the dot when selected (for additional visual effects).
 * @param selectedInnerFill - Fill color of the inner circle when selected.
 *
 * @returns A group element `<g>` containing one or more circle elements, styled according to the current selection or highlight state.
 */
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
  // Determine if the current dot is highlighted or selected
  const isHighlighted = highlightedPoint && payload === highlightedPoint;
  const isSelected = selectedPoint && payload === selectedPoint;

  // Set default styling values
  let dotRadius = defaultRadius;
  let dotFill = defaultFill;
  let currentStroke = stroke || '#155dfc';
  let currentStrokeWidth = strokeWidth || 1;

  // Adjust styles based on selection or highlighting state
  if (isSelected) {
    dotRadius = selectRadius;
    dotFill = selectFill;
    currentStroke = selectedStroke;
    currentStrokeWidth = selectedStrokeWidth;
  } else if (isHighlighted) {
    dotRadius = highlightRadius;
    dotFill = highlightFill;
  } else if (fill) {
    dotFill = fill; // If a custom fill is provided, use it
  } else {
    dotFill = defaultFill; // Default fill if no other conditions match
  }

  return (
    <g>
      {/* Render the outer circle representing the data point */}
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
      {/* Render the inner circle when the point is selected */}
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
