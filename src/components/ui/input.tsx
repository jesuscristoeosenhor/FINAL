'use client';

import React from 'react';
import { cn } from '@/utils';
import type { InputProps } from '@/types';

interface ExtendedInputProps extends InputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, ExtendedInputProps>(
  ({ label, error, required = false, type = 'text', id, className = '', leftIcon, rightIcon, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;

    return (
      <div className='space-y-2'>
        {label && (
          <label
            htmlFor={inputId}
            className='block text-sm font-medium text-gray-700 dark:text-gray-200 sm:text-base'
          >
            {label}
            {required && (
              <span className='ml-1 text-red-500' aria-label='obrigatório'>
                *
              </span>
            )}
          </label>
        )}
        <div className='relative'>
          {leftIcon && (
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <div className='text-gray-400 dark:text-gray-500'>
                {leftIcon}
              </div>
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'w-full rounded-lg border px-3 py-3 text-base transition-colors touch-manipulation',
              'focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:py-4',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600',
              'bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400',
              className
            )}
            style={{ minHeight: '44px' }}
            {...props}
          />
          {rightIcon && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <div className='text-gray-400 dark:text-gray-500'>
                {rightIcon}
              </div>
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className='text-sm text-red-600 dark:text-red-400' role='alert'>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };