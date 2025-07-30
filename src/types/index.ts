// Global types for the BoraProCT system

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  ativo: boolean;
  dataAdmissao?: string;
}

export interface Student extends User {
  tipoPlano: 'mensalidade' | 'plataforma';
  planoId?: number;
  plataformaParceira?: string;
  unidade: string;
  status: 'ativo' | 'pendente' | 'inativo';
  vencimento?: string;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  dataMatricula: string;
  objetivo: 'Lazer' | 'Fitness' | 'Competição';
}

export interface Teacher extends User {
  tipoPagamento: 'fixo' | 'variavel';
  valorFixo?: number;
  valoresVariaveis?: {
    uma: number;
    duas: number;
    tres: number;
  };
  especialidades: string[];
  experiencia: '1-3' | '5-10' | '10+';
  observacoes?: string;
}

export interface Manager extends User {
  unidadeResponsavel: string;
}

export interface Plan {
  id: number;
  nome: string;
  preco: number;
  unidade: string;
}

export interface FinanceRecord {
  id: number;
  alunoId?: number;
  aluno?: string;
  valor: number;
  data: string;
  status: 'pago' | 'pendente';
  tipo: 'receita' | 'despesa';
  metodo: 'mensalidade' | 'diaria-dinheiro' | 'diaria-plataforma' | 'aluguel';
  descricao: string;
  unidade?: string;
}

export interface Training {
  id: number;
  titulo: string;
  professorId: number;
  professor: string;
  data: string;
  descricao: string;
  duracao: number;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  pranchetaData?: {
    items: PranchetaItem[];
  };
}

export interface PranchetaItem {
  id: number;
  type: 'player1' | 'player2' | 'ball' | 'arrow' | 'text';
  x: number;
  y: number;
  fromX?: number;
  fromY?: number;
  toX?: number;
  toY?: number;
  color?: string;
  text?: string;
  fontSize?: number;
  style?: string;
}

export interface Unit {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  responsavel: string;
  ativo: boolean;
}

export interface Product {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  estoque?: number;
}

export interface Platform {
  id: number;
  nome: string;
  valorPorAluno: number;
  ativo: boolean;
}

export interface Attendance {
  id: number;
  alunoId: number;
  professorId: number;
  data: string;
  horario: string;
  status: 'presente' | 'ausente';
}

export interface Goal {
  id: number;
  titulo: string;
  descricao?: string;
  tipo: 'alunos' | 'receita' | 'retencao' | 'expansao' | 'qualidade' | 'eventos' | 'marketing' | 'pessoal';
  prazo: string;
  valorMeta?: number;
  valorAtual?: number;
  escopo: 'geral' | 'unidade';
  unidadeSelecionada?: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  notificarEm: number;
  concluida: boolean;
  concluidaEm?: string;
  criadaEm: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: string;
  read: boolean;
}

export interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
}

export interface QuadraRental {
  id: number;
  clienteNome: string;
  data: string;
  quadraId: number;
  horaInicio: string;
  horaFim: string;
  valorTotal: number;
  status: 'agendado' | 'confirmado' | 'cancelado';
}

export type UserType = 'admin' | 'gestor' | 'professor' | 'aluno';

export type ActiveTab = 
  | 'dashboard'
  | 'alunos'
  | 'professores'
  | 'gestores'
  | 'presenca'
  | 'agendamentos'
  | 'aulas'
  | 'treinos'
  | 'metas'
  | 'financeiro'
  | 'loja'
  | 'evolucao'
  | 'perfil'
  | 'aluguel_quadras'
  | 'configuracoes';

// Component Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface FilterOptions {
  nome?: string;
  status?: string;
  tipoPlano?: string;
  unidade?: string;
  nivel?: string;
  vencimento?: string;
}

// State types
export interface AppState {
  // User session
  userLogado: User | null;
  tipoUsuario: UserType;
  activeTab: ActiveTab;
  
  // Data
  alunos: Student[];
  professores: Teacher[];
  gestores: Manager[];
  financeiro: FinanceRecord[];
  treinos: Training[];
  unidades: Unit[];
  planos: Plan[];
  produtos: Product[];
  plataformas: Platform[];
  presencas: Attendance[];
  metas: Goal[];
  alugueis: QuadraRental[];
  
  // UI state
  cart: CartItem[];
  notifications: Notification[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Configuration types
export interface SystemConfig {
  modeloNegocio?: {
    quantidadeQuadras?: number;
    valorAluguelQuadraHora?: number;
  };
  theme?: {
    primaryColor?: string;
    darkMode?: boolean;
  };
}