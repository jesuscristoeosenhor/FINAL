'use client';

import React from 'react';
import {
  Home,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  Target,
  ShoppingCart,
  Building,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '@/utils';
import { useAuth } from '@/contexts/simple-store';
import type { ActiveTab } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
  gestorOnly?: boolean;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
  { id: 'alunos', label: 'Alunos', icon: <Users size={20} /> },
  { id: 'professores', label: 'Professores', icon: <UserCheck size={20} />, adminOnly: true },
  { id: 'gestores', label: 'Gestores', icon: <Building size={20} />, adminOnly: true },
  { id: 'presenca', label: 'Presença', icon: <Calendar size={20} /> },
  { id: 'financeiro', label: 'Financeiro', icon: <DollarSign size={20} /> },
  { id: 'metas', label: 'Metas', icon: <Target size={20} /> },
  { id: 'loja', label: 'Loja', icon: <ShoppingCart size={20} /> },
  { id: 'configuracoes', label: 'Configurações', icon: <Settings size={20} /> },
];

export function Sidebar({ isOpen, isCollapsed, onClose }: SidebarProps) {
  const { activeTab, setActiveTab, userType } = useAuth();

  const filteredNavItems = navItems.filter(item => {
    if (item.adminOnly && userType !== 'admin') return false;
    if (item.gestorOnly && !['admin', 'gestor'].includes(userType)) return false;
    return true;
  });

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    onClose(); // Close mobile sidebar
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className='bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden' onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 left-0 z-50 h-full border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-800',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700'>
          {!isCollapsed && (
            <div className='flex items-center gap-3'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600'>
                <Building className='h-5 w-5 text-white' />
              </div>
              <span className='text-lg font-bold text-gray-900 dark:text-white'>BoraProCT</span>
            </div>
          )}

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className='rounded-lg p-2 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-700'
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 space-y-2 overflow-y-auto p-4'>
          {filteredNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                isCollapsed && 'justify-center'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!isCollapsed && <span className='font-medium'>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className='border-t border-gray-200 p-4 dark:border-gray-700'>
          {!isCollapsed && (
            <div className='text-center'>
              <p className='text-xs text-gray-500 dark:text-gray-400'>© 2025 BoraProCT</p>
              <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>v2.0.0 - Refatorado</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
