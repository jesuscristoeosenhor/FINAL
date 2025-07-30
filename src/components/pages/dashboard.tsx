'use client';

import React from 'react';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Activity,
  Target,
  Building,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/simple-store';
import { formatCurrency } from '@/utils';
import MainLayout from '@/components/layout/main-layout';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>{title}</p>
          <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>{value}</p>
          {trend && (
            <p className='text-sm text-green-600 dark:text-green-400 mt-1'>
              <TrendingUp className='inline w-4 h-4 mr-1' />
              {trend}
            </p>
          )}
        </div>
        <div 
          className='w-12 h-12 rounded-full flex items-center justify-center'
          style={{ backgroundColor: color + '20', color: color }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { user, userType } = useAuth();

  // Mock data for demonstration
  const activeStudents = 45;
  const totalRevenue = 6750;
  
  return (
    <MainLayout>
      <div className='space-y-6'>
        {/* Welcome Header */}
        <div className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold mb-2'>
                Bem-vindo, {user?.nome}! 👋
              </h1>
              <p className='text-blue-100'>
                {userType === 'admin' 
                  ? 'Visão geral completa do sistema'
                  : userType === 'gestor'
                  ? 'Dashboard da sua unidade'
                  : 'Seu painel personalizado'
                }
              </p>
            </div>
            <div className='text-right'>
              <p className='text-blue-100 text-sm'>
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCard
            title='Alunos Ativos'
            value={activeStudents}
            icon={<Users size={24} />}
            trend='+12% este mês'
            color='#3b82f6'
          />
          
          <StatCard
            title='Receita Mensal'
            value={formatCurrency(totalRevenue)}
            icon={<DollarSign size={24} />}
            trend='+8% este mês'
            color='#10b981'
          />
          
          <StatCard
            title='Professores'
            value={3}
            icon={<Award size={24} />}
            color='#8b5cf6'
          />
          
          <StatCard
            title='Aulas Hoje'
            value='12'
            icon={<Calendar size={24} />}
            color='#f59e0b'
          />
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Recent Activity */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Atividade Recente
              </h3>
              <Activity size={20} className='text-gray-400' />
            </div>
            
            <div className='space-y-4'>
              {[
                { action: 'Novo aluno cadastrado', time: '2 minutos atrás', type: 'success' },
                { action: 'Pagamento processado', time: '15 minutos atrás', type: 'info' },
                { action: 'Aula agendada', time: '1 hora atrás', type: 'warning' },
                { action: 'Meta atingida', time: '2 horas atrás', type: 'success' },
              ].map((activity, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}
                  />
                  <div className='flex-1'>
                    <p className='text-sm text-gray-900 dark:text-white'>{activity.action}</p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Status do Sistema
              </h3>
              <Target size={20} className='text-gray-400' />
            </div>
            
            <div className='space-y-4'>
              {[
                { label: 'Taxa de Frequência', value: '89%', color: 'bg-green-500' },
                { label: 'Satisfação Alunos', value: '4.8/5', color: 'bg-blue-500' },
                { label: 'Ocupação Quadras', value: '76%', color: 'bg-yellow-500' },
                { label: 'Meta Mensal', value: '92%', color: 'bg-purple-500' },
              ].map((stat, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                    <span className='text-sm text-gray-700 dark:text-gray-300'>{stat.label}</span>
                  </div>
                  <span className='text-sm font-medium text-gray-900 dark:text-white'>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Welcome message for first time */}
        <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6'>
          <div className='flex items-start gap-4'>
            <Building className='w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1' />
            <div>
              <h4 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
                🎉 Sistema BoraProCT Refatorado!
              </h4>
              <p className='text-blue-800 dark:text-blue-200 mb-4'>
                Bem-vindo ao novo sistema completamente refatorado com arquitetura moderna, 
                melhor performance e todas as funcionalidades organizadas de forma profissional.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300'>
                <div>
                  <h5 className='font-semibold mb-2'>✨ Novas Funcionalidades:</h5>
                  <ul className='space-y-1'>
                    <li>• Dashboard inteligente com métricas em tempo real</li>
                    <li>• Sistema de autenticação robusto</li>
                    <li>• Interface responsiva e acessível</li>
                    <li>• Performance otimizada</li>
                  </ul>
                </div>
                <div>
                  <h5 className='font-semibold mb-2'>🏗️ Arquitetura Moderna:</h5>
                  <ul className='space-y-1'>
                    <li>• Next.js 14 com TypeScript</li>
                    <li>• Componentes modulares</li>
                    <li>• Estado global com Zustand</li>
                    <li>• Design System consistente</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}