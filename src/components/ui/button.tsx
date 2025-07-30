'use client';

import React from 'react';
import { cn } from '@/utils';
import type { ButtonProps } from '@/types';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary:
        'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 focus:ring-gray-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors touch-manipulation',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          variantClasses[variant],
          sizeClasses[size],
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        style={{ minHeight: '44px', minWidth: '44px' }}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
        ) : leftIcon ? (
          <span className='mr-2'>{leftIcon}</span>
        ) : null}

        {children}

        {rightIcon && !loading && <span className='ml-2'>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };