import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export const formatDate = (value: any) => {
  if (value === null || value === undefined) {
    return '';
  }
  const date = new Date(value);
  return String(date.toLocaleDateString());
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
