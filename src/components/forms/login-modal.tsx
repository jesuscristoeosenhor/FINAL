'use client';

import React, { useState } from 'react';
import { LogIn, User, Lock, Building } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/simple-store';
import toast from 'react-hot-toast';
import type { UserType } from '@/types';

const mockUsers = {
  admin: {
    id: 999,
    nome: 'Administrador',
    email: 'admin@boraporct.com',
    telefone: '(21) 99999-9999',
    senha: 'admin123',
    ativo: true,
  },
  gestor: {
    id: 998,
    nome: 'Gestor Centro',
    email: 'gestor@boraporct.com',
    telefone: '(21) 99999-9998',
    senha: 'gestor123',
    ativo: true,
    unidadeResponsavel: 'Centro',
  },
};

export function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('admin');
  const [loading, setLoading] = useState(false);

  const { setUser, setUserType: setGlobalUserType } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let foundUser = null;

      // Check mock users first
      if (userType === 'admin' && email === mockUsers.admin.email && password === mockUsers.admin.senha) {
        foundUser = mockUsers.admin;
      } else if (userType === 'gestor' && email === mockUsers.gestor.email && password === mockUsers.gestor.senha) {
        foundUser = mockUsers.gestor;
      }

      if (foundUser) {
        setUser(foundUser);
        setGlobalUserType(userType);
        toast.success(`Bem-vindo, ${foundUser.nome}!`);
      } else {
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (type: UserType, userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setUserType(type);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        {/* Logo and branding */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4'>
            <Building className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>BoraProCT</h1>
          <p className='text-gray-600 dark:text-gray-400'>Sistema de Gestão Completo</p>
        </div>

        {/* Login form */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-2'>
              Fazer Login
            </h2>
            <p className='text-gray-600 dark:text-gray-400'>
              Acesse sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-6'>
            {/* User type selection */}
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3'>
                Tipo de Usuário
              </label>
              <div className='grid grid-cols-2 gap-3'>
                {[
                  { type: 'admin' as UserType, label: 'Admin', icon: '👨‍💼' },
                  { type: 'gestor' as UserType, label: 'Gestor', icon: '👨‍🏫' },
                  { type: 'professor' as UserType, label: 'Professor', icon: '🏐' },
                  { type: 'aluno' as UserType, label: 'Aluno', icon: '🏃‍♂️' },
                ].map(({ type, label, icon }) => (
                  <button
                    key={type}
                    type='button'
                    onClick={() => setUserType(type)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      userType === type
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className='text-lg mb-1'>{icon}</div>
                    <div className='text-xs font-medium'>{label}</div>
                  </button>
                ))}
              </div>
            </div>

            <Input
              label='Email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              leftIcon={<User size={20} />}
              placeholder='seu@email.com'
            />

            <Input
              label='Senha'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              leftIcon={<Lock size={20} />}
              placeholder='Sua senha'
            />

            <Button
              type='submit'
              className='w-full'
              loading={loading}
              leftIcon={<LogIn size={20} />}
            >
              Entrar
            </Button>
          </form>

          {/* Quick login buttons */}
          <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-700'>
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-4 text-center'>
              Login rápido para demonstração:
            </p>
            <div className='space-y-2'>
              <Button
                variant='secondary'
                size='sm'
                className='w-full'
                onClick={() => handleQuickLogin('admin', 'admin@boraporct.com', 'admin123')}
              >
                👨‍💼 Admin (admin@boraporct.com)
              </Button>
              <Button
                variant='secondary'
                size='sm'
                className='w-full'
                onClick={() => handleQuickLogin('gestor', 'gestor@boraporct.com', 'gestor123')}
              >
                👨‍🏫 Gestor (gestor@boraporct.com)
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-8'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            © 2025 BoraProCT. Sistema de gestão profissional.
          </p>
        </div>
      </div>
    </div>
  );
}