import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export const formatDate = (value: any) => {
  try {
    const date = new Date(value);
    return date.toLocaleDateString();
  } catch (error) {
    return value?.toString() || '';
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
