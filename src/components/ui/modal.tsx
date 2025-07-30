'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils';
import { useTheme } from '@/contexts/theme';
import type { ModalProps } from '@/types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const { isDarkMode } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-3 sm:p-4'
      onClick={e => e.target === e.currentTarget && onClose()}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      <div
        ref={modalRef}
        className={cn(
          'w-full max-h-[90vh] overflow-y-auto rounded-xl p-4 sm:p-6',
          sizeClasses[size],
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        )}
        tabIndex={-1}
      >
        <div className='mb-4 flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-700'>
          <h3
            id='modal-title'
            className='truncate pr-2 text-lg font-semibold text-gray-800 dark:text-gray-100 sm:text-xl'
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className={cn(
              'flex-shrink-0 rounded-lg p-3 transition-colors touch-manipulation',
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            )}
            style={{ minHeight: '44px', minWidth: '44px' }}
            aria-label='Fechar modal'
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export { Modal };