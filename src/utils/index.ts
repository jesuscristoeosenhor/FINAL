import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format currency values in Brazilian Real
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Format date to Brazilian format
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR');
}

/**
 * Format date and time to Brazilian format
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('pt-BR');
}

/**
 * Generate a unique ID
 */
export function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Convert array of objects to CSV format
 */
export function convertToCSV(data: Record<string, unknown>[]): string {
  if (!data.length) return '';

  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row =>
    Object.values(row)
      .map(value => (typeof value === 'string' && value.includes(',') ? `"${value}"` : value))
      .join(',')
  );

  return [headers, ...rows].join('\n');
}

/**
 * Export data as CSV file
 */
export function exportToCSV(data: Record<string, unknown>[], filename: string): void {
  try {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw new Error('Failed to export data');
  }
}

/**
 * Safe localStorage operations
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;

    try {
      const item = window.localStorage.getItem(key);
      if (item === null || item === undefined || item === 'undefined') {
        return defaultValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      // Clean corrupted item
      try {
        window.localStorage.removeItem(key);
      } catch (removeError) {
        console.error(`Error removing corrupted localStorage item:`, removeError);
      }
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
    }
  },
};

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: string | Date, date2?: string | Date): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = date2 ? (typeof date2 === 'string' ? new Date(date2) : date2) : new Date();

  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if a date is overdue
 */
export function isDateOverdue(date: string | Date): boolean {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  return targetDate < new Date();
}

/**
 * Get days until date (negative if overdue)
 */
export function daysUntilDate(date: string | Date): number {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Validate Brazilian phone number
 */
export function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return /^(\d{10,11})$/.test(cleanPhone);
}

/**
 * Format Brazilian phone number
 */
export function formatPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return phone;
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Calculate percentage
 */
export function calculatePercentage(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create scroll bar styles for dark/light themes
 */
export function createScrollBarStyles(): void {
  if (typeof document !== 'undefined') {
    const existingStyle = document.getElementById('custom-scrollbars');
    if (existingStyle) {
      existingStyle.remove();
    }

    const css = `
      /* Webkit browsers */
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.08);
        border-radius: 3px;
        margin: 8px 0;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 3px;
        transition: all 0.2s ease;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.6);
      }

      /* Dark mode */
      .dark ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.08);
      }

      .dark ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.25);
      }

      .dark ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.4);
      }

      /* Firefox */
      html:not(.dark) * {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.08);
      }

      .dark * {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.08);
      }
    `;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'custom-scrollbars';
    style.innerText = css;
    document.head.appendChild(style);
  }
}
