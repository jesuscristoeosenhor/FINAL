'use client';

import React from 'react';
import { 
  Menu, 
  Bell, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  User
} from 'lucide-react';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/simple-store';
import { useTheme } from '@/contexts/theme';
import toast from 'react-hot-toast';

interface HeaderProps {
  onMenuClick: () => void;
  onToggleCollapse: () => void;
}

export function Header({ onMenuClick, onToggleCollapse }: HeaderProps) {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso');
  };

  return (
    <header className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3'>
      <div className='flex items-center justify-between'>
        {/* Left section */}
        <div className='flex items-center gap-4'>
          {/* Mobile menu button */}
          <Button
            variant='secondary'
            size='sm'
            onClick={onMenuClick}
            className='lg:hidden'
            aria-label='Abrir menu'
          >
            <Menu size={20} />
          </Button>

          {/* Desktop collapse button */}
          <Button
            variant='secondary'
            size='sm'
            onClick={onToggleCollapse}
            className='hidden lg:flex'
            aria-label='Recolher menu'
          >
            <Menu size={20} />
          </Button>

          {/* Search or breadcrumb could go here */}
          <div className='hidden md:block'>
            <h1 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Dashboard
            </h1>
          </div>
        </div>

        {/* Right section */}
        <div className='flex items-center gap-3'>
          {/* Theme toggle */}
          <Button
            variant='secondary'
            size='sm'
            onClick={toggleTheme}
            aria-label='Alternar tema'
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* Notifications */}
          <div className='relative'>
            <Button
              variant='secondary'
              size='sm'
              aria-label='Notificações'
            >
              <Bell size={18} />
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                3
              </span>
            </Button>
          </div>

          {/* User menu */}
          <div className='flex items-center gap-3 pl-3 border-l border-gray-300 dark:border-gray-600'>
            <div className='hidden sm:block text-right'>
              <p className='text-sm font-medium text-gray-900 dark:text-white'>
                {user?.nome}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                {user?.email}
              </p>
            </div>

            <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
              <User size={18} className='text-white' />
            </div>

            {/* Settings */}
            <Button
              variant='secondary'
              size='sm'
              aria-label='Configurações'
            >
              <Settings size={18} />
            </Button>

            {/* Logout */}
            <Button
              variant='secondary'
              size='sm'
              onClick={handleLogout}
              aria-label='Sair'
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}