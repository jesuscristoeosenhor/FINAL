import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { storage } from '@/utils';
import type {
  AppState,
  Student,
  Teacher,
  Manager,
  FinanceRecord,
  Training,
  Unit,
  Plan,
  Product,
  Platform,
  Goal,
  QuadraRental,
  CartItem,
  Notification,
  User,
  UserType,
  ActiveTab,
} from '@/types';

// Mock data for initial setup
const mockData = {
  students: [
    {
      id: 1,
      nome: 'João Silva',
      telefone: '(11) 99999-9999',
      email: 'joao@email.com',
      tipoPlano: 'plataforma' as const,
      plataformaParceira: 'Wellhub',
      unidade: 'Centro',
      status: 'ativo' as const,
      vencimento: '2025-07-15',
      senha: '123456',
      nivel: 'intermediario' as const,
      dataMatricula: '2024-01-15',
      objetivo: 'Competição' as const,
      ativo: true,
    },
    {
      id: 2,
      nome: 'Maria Santos',
      telefone: '(11) 88888-8888',
      email: 'maria@email.com',
      tipoPlano: 'mensalidade' as const,
      planoId: 1,
      unidade: 'Zona Sul',
      status: 'ativo' as const,
      vencimento: '2025-07-20',
      senha: '123456',
      nivel: 'iniciante' as const,
      dataMatricula: '2024-03-20',
      objetivo: 'Lazer' as const,
      ativo: true,
    },
  ] as Student[],

  teachers: [
    {
      id: 1,
      nome: 'Carlos Mendes',
      telefone: '(11) 91111-1111',
      email: 'carlos@email.com',
      senha: '123456',
      tipoPagamento: 'variavel' as const,
      valoresVariaveis: {
        uma: 25,
        duas: 22,
        tres: 20,
      },
      especialidades: ['Futevôlei de Praia', 'Técnicas de Defesa', 'Treinamento Avançado'],
      experiencia: '5-10' as const,
      observacoes: 'Professor experiente, especialista em defesa',
      ativo: true,
    },
  ] as Teacher[],

  managers: [
    {
      id: 1,
      nome: 'Roberto Silva',
      telefone: '(21) 97777-7777',
      email: 'roberto.centro@boraporct.com',
      senha: '123456',
      unidadeResponsavel: 'Centro',
      dataAdmissao: '2024-01-10',
      ativo: true,
    },
  ] as Manager[],

  plans: [
    { id: 1, nome: 'Plano Básico (2x/semana)', preco: 120.0, unidade: 'Centro' },
    { id: 2, nome: 'Plano Intermediário (3x/semana)', preco: 150.0, unidade: 'Centro' },
    { id: 3, nome: 'Plano Avançado (Livre)', preco: 180.0, unidade: 'Centro' },
  ] as Plan[],

  units: [
    {
      id: 1,
      nome: 'CT Copacabana',
      endereco: 'Praia de Copacabana, Rio de Janeiro - RJ',
      telefone: '(21) 99999-9999',
      email: 'copacabana@boraporct.com',
      responsavel: 'Carlos Mendes',
      ativo: true,
    },
  ] as Unit[],

  products: [
    {
      id: 1,
      nome: 'Camisa Oficial BoraProCT',
      preco: 89.9,
      imagem: 'https://placehold.co/400x400/004AAD/FFFFFF?text=Camisa',
      estoque: 50,
    },
  ] as Product[],

  platforms: [{ id: 1, nome: 'Wellhub (Gympass)', valorPorAluno: 45.5, ativo: true }] as Platform[],
};

interface AppStoreActions {
  // Auth actions
  setUser: (user: User | null) => void;
  setUserType: (type: UserType) => void;
  setActiveTab: (tab: ActiveTab) => void;
  logout: () => void;

  // Students actions
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  updateStudent: (id: number, student: Partial<Student>) => void;
  deleteStudent: (id: number) => void;

  // Teachers actions
  setTeachers: (teachers: Teacher[]) => void;
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (id: number, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: number) => void;

  // Managers actions
  setManagers: (managers: Manager[]) => void;
  addManager: (manager: Manager) => void;
  updateManager: (id: number, manager: Partial<Manager>) => void;
  deleteManager: (id: number) => void;

  // Financial actions
  setFinanceRecords: (records: FinanceRecord[]) => void;
  addFinanceRecord: (record: FinanceRecord) => void;
  updateFinanceRecord: (id: number, record: Partial<FinanceRecord>) => void;
  deleteFinanceRecord: (id: number) => void;

  // Trainings actions
  setTrainings: (trainings: Training[]) => void;
  addTraining: (training: Training) => void;
  updateTraining: (id: number, training: Partial<Training>) => void;
  deleteTraining: (id: number) => void;

  // Goals actions
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: number, goal: Partial<Goal>) => void;
  deleteGoal: (id: number) => void;

  // Rentals actions
  setRentals: (rentals: QuadraRental[]) => void;
  addRental: (rental: QuadraRental) => void;
  updateRental: (id: number, rental: Partial<QuadraRental>) => void;
  deleteRental: (id: number) => void;

  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // Notifications actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (id: number) => void;
  clearNotifications: () => void;

  // Utility actions
  resetStore: () => void;
}

type AppStore = AppState & AppStoreActions;

const initialState: AppState = {
  userLogado: null,
  tipoUsuario: 'admin',
  activeTab: 'dashboard',
  alunos: storage.get('students', mockData.students),
  professores: storage.get('teachers', mockData.teachers),
  gestores: storage.get('managers', mockData.managers),
  financeiro: storage.get('finance', []),
  treinos: storage.get('trainings', []),
  unidades: storage.get('units', mockData.units),
  planos: storage.get('plans', mockData.plans),
  produtos: storage.get('products', mockData.products),
  plataformas: storage.get('platforms', mockData.platforms),
  presencas: storage.get('attendance', []),
  metas: storage.get('goals', []),
  alugueis: storage.get('rentals', []),
  cart: [],
  notifications: storage.get('notifications', []),
};

export const useAppStore = create<AppStore>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    // Auth actions
    setUser: (user: User | null) => set({ userLogado: user }),
    setUserType: (type: UserType) => set({ tipoUsuario: type }),
    setActiveTab: (tab: ActiveTab) => set({ activeTab: tab }),
    logout: () =>
      set({
        userLogado: null,
        tipoUsuario: 'admin',
        activeTab: 'dashboard',
        cart: [],
      }),

    // Students actions
    setStudents: (students: Student[]) => {
      set({ alunos: students });
      storage.set('students', students);
    },
    addStudent: (student: Student) => {
      const students = [...get().alunos, student];
      get().setStudents(students);
    },
    updateStudent: (id: number, studentUpdate: Partial<Student>) => {
      const students = get().alunos.map(s => (s.id === id ? { ...s, ...studentUpdate } : s));
      get().setStudents(students);
    },
    deleteStudent: (id: number) => {
      const students = get().alunos.filter(s => s.id !== id);
      get().setStudents(students);
    },

    // Teachers actions
    setTeachers: (teachers: Teacher[]) => {
      set({ professores: teachers });
      storage.set('teachers', teachers);
    },
    addTeacher: (teacher: Teacher) => {
      const teachers = [...get().professores, teacher];
      get().setTeachers(teachers);
    },
    updateTeacher: (id: number, teacherUpdate: Partial<Teacher>) => {
      const teachers = get().professores.map(t => (t.id === id ? { ...t, ...teacherUpdate } : t));
      get().setTeachers(teachers);
    },
    deleteTeacher: (id: number) => {
      const teachers = get().professores.filter(t => t.id !== id);
      get().setTeachers(teachers);
    },

    // Managers actions
    setManagers: (managers: Manager[]) => {
      set({ gestores: managers });
      storage.set('managers', managers);
    },
    addManager: (manager: Manager) => {
      const managers = [...get().gestores, manager];
      get().setManagers(managers);
    },
    updateManager: (id: number, managerUpdate: Partial<Manager>) => {
      const managers = get().gestores.map(m => (m.id === id ? { ...m, ...managerUpdate } : m));
      get().setManagers(managers);
    },
    deleteManager: (id: number) => {
      const managers = get().gestores.filter(m => m.id !== id);
      get().setManagers(managers);
    },

    // Financial actions
    setFinanceRecords: (records: FinanceRecord[]) => {
      set({ financeiro: records });
      storage.set('finance', records);
    },
    addFinanceRecord: (record: FinanceRecord) => {
      const records = [...get().financeiro, record];
      get().setFinanceRecords(records);
    },
    updateFinanceRecord: (id: number, recordUpdate: Partial<FinanceRecord>) => {
      const records = get().financeiro.map(r => (r.id === id ? { ...r, ...recordUpdate } : r));
      get().setFinanceRecords(records);
    },
    deleteFinanceRecord: (id: number) => {
      const records = get().financeiro.filter(r => r.id !== id);
      get().setFinanceRecords(records);
    },

    // Trainings actions
    setTrainings: (trainings: Training[]) => {
      set({ treinos: trainings });
      storage.set('trainings', trainings);
    },
    addTraining: (training: Training) => {
      const trainings = [...get().treinos, training];
      get().setTrainings(trainings);
    },
    updateTraining: (id: number, trainingUpdate: Partial<Training>) => {
      const trainings = get().treinos.map(t => (t.id === id ? { ...t, ...trainingUpdate } : t));
      get().setTrainings(trainings);
    },
    deleteTraining: (id: number) => {
      const trainings = get().treinos.filter(t => t.id !== id);
      get().setTrainings(trainings);
    },

    // Goals actions
    setGoals: (goals: Goal[]) => {
      set({ metas: goals });
      storage.set('goals', goals);
    },
    addGoal: (goal: Goal) => {
      const goals = [...get().metas, goal];
      get().setGoals(goals);
    },
    updateGoal: (id: number, goalUpdate: Partial<Goal>) => {
      const goals = get().metas.map(g => (g.id === id ? { ...g, ...goalUpdate } : g));
      get().setGoals(goals);
    },
    deleteGoal: (id: number) => {
      const goals = get().metas.filter(g => g.id !== id);
      get().setGoals(goals);
    },

    // Rentals actions
    setRentals: (rentals: QuadraRental[]) => {
      set({ alugueis: rentals });
      storage.set('rentals', rentals);
    },
    addRental: (rental: QuadraRental) => {
      const rentals = [...get().alugueis, rental];
      get().setRentals(rentals);
    },
    updateRental: (id: number, rentalUpdate: Partial<QuadraRental>) => {
      const rentals = get().alugueis.map(r => (r.id === id ? { ...r, ...rentalUpdate } : r));
      get().setRentals(rentals);
    },
    deleteRental: (id: number) => {
      const rentals = get().alugueis.filter(r => r.id !== id);
      get().setRentals(rentals);
    },

    // Cart actions
    addToCart: (item: CartItem) => {
      const existingItem = get().cart.find(i => i.productId === item.productId);
      if (existingItem) {
        get().updateCartQuantity(item.productId, existingItem.quantity + item.quantity);
      } else {
        set({ cart: [...get().cart, item] });
      }
    },
    removeFromCart: (productId: number) => {
      set({ cart: get().cart.filter(item => item.productId !== productId) });
    },
    updateCartQuantity: (productId: number, quantity: number) => {
      if (quantity <= 0) {
        get().removeFromCart(productId);
        return;
      }
      set({
        cart: get().cart.map(item => (item.productId === productId ? { ...item, quantity } : item)),
      });
    },
    clearCart: () => set({ cart: [] }),

    // Notifications actions
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      };
      const notifications = [newNotification, ...get().notifications].slice(0, 50);
      set({ notifications });
      storage.set('notifications', notifications);
    },
    markNotificationAsRead: (id: number) => {
      const notifications = get().notifications.map(n => (n.id === id ? { ...n, read: true } : n));
      set({ notifications });
      storage.set('notifications', notifications);
    },
    clearNotifications: () => {
      set({ notifications: [] });
      storage.set('notifications', []);
    },

    // Utility actions
    resetStore: () => set(initialState),
  }))
);

// Selectors for better performance
export const useAuth = () =>
  useAppStore(state => ({
    user: state.userLogado,
    userType: state.tipoUsuario,
    activeTab: state.activeTab,
    setUser: state.setUser,
    setUserType: state.setUserType,
    setActiveTab: state.setActiveTab,
    logout: state.logout,
  }));

export const useStudents = () =>
  useAppStore(state => ({
    students: state.alunos,
    setStudents: state.setStudents,
    addStudent: state.addStudent,
    updateStudent: state.updateStudent,
    deleteStudent: state.deleteStudent,
  }));

export const useTeachers = () =>
  useAppStore(state => ({
    teachers: state.professores,
    setTeachers: state.setTeachers,
    addTeacher: state.addTeacher,
    updateTeacher: state.updateTeacher,
    deleteTeacher: state.deleteTeacher,
  }));

export const useNotifications = () =>
  useAppStore(state => ({
    notifications: state.notifications,
    addNotification: state.addNotification,
    markNotificationAsRead: state.markNotificationAsRead,
    clearNotifications: state.clearNotifications,
    unreadCount: state.notifications.filter(n => !n.read).length,
  }));

export const useCart = () =>
  useAppStore(state => ({
    cart: state.cart,
    addToCart: state.addToCart,
    removeFromCart: state.removeFromCart,
    updateCartQuantity: state.updateCartQuantity,
    clearCart: state.clearCart,
    totalItems: state.cart.reduce((sum, item) => sum + item.quantity, 0),
    totalValue: state.cart.reduce((sum, item) => sum + item.product.preco * item.quantity, 0),
  }));
