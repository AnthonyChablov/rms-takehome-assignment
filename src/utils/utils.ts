import { twMerge } from 'tailwind-merge'; // Merges Tailwind classes intelligently, avoiding conflicts.
import { clsx, type ClassValue } from 'clsx'; // Utility to conditionally join classNames.

/**
 * Safely formats a date value into a localized string.
 *
 * @param value - A date-like value (e.g., string, number, Date, etc.)
 * @returns A locale-formatted date string or an empty string if the value is null or undefined.
 */
export const formatDate = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }

  const date = new Date(value);
  return String(date.toLocaleDateString());
};

/**
 * Utility function to merge class names conditionally.
 *
 * Combines `clsx` for conditional className logic and `tailwind-merge`
 * to intelligently resolve Tailwind CSS class conflicts.
 *
 * @param inputs - Any number of className values (string, array, object).
 * @returns A single optimized className string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
