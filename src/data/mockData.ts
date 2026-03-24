export type ItemStatus = 'unclaimed' | 'claimed';

export interface FoundItem {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  timeAgo: string;
  imageUrl: string;
  finder: {
    name: string;
    avatar: string;
    rating: number;
  };
  claims: number;
  status: ItemStatus;
  securityQuestions: { question: string; answer: string }[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  location: string;
  joinDate: string;
  points: number;
  stats: {
    returns: number;
    recoveries: number;
    rating: number;
  };
  badges: { icon: string; label: string; unlocked: boolean }[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  icon: string;
}

export const CATEGORIES = ['Todos', 'Documentos', 'Electrónica', 'Llaves', 'Ropa', 'Mascotas', 'Otros'];

export const mockItems: FoundItem[] = [
  {
    id: '1',
    title: 'Llavero con 3 llaves y llavero de Pucca',
    category: 'Llaves',
    description: 'Encontrado en la entrada del centro comercial Sambil. Tiene un llavero de Pucca rojo.',
    location: 'C.C. Sambil, Caracas',
    date: '2026-03-23',
    timeAgo: 'Hace 1 hora',
    imageUrl: '',
    finder: { name: 'María G.', avatar: '👩‍🦱', rating: 4.8 },
    claims: 0,
    status: 'unclaimed',
    securityQuestions: [
      { question: '¿Cuántas llaves tiene el llavero?', answer: '3' },
      { question: '¿De qué personaje es el llavero?', answer: 'Pucca' },
    ],
  },
  {
    id: '2',
    title: 'iPhone 14 Pro con forro azul',
    category: 'Electrónica',
    description: 'Encontrado en un asiento del metro de Plaza Venezuela. Pantalla con protector.',
    location: 'Metro Plaza Venezuela',
    date: '2026-03-23',
    timeAgo: 'Hace 3 horas',
    imageUrl: '',
    finder: { name: 'Carlos R.', avatar: '👨‍💼', rating: 4.5 },
    claims: 2,
    status: 'claimed',
    securityQuestions: [
      { question: '¿De qué color es el forro?', answer: 'azul' },
      { question: '¿Tiene protector de pantalla?', answer: 'sí' },
    ],
  },
  {
    id: '3',
    title: 'Cédula de identidad venezolana',
    category: 'Documentos',
    description: 'Encontrada en la acera frente a Farmatodo de Las Mercedes.',
    location: 'Las Mercedes, Caracas',
    date: '2026-03-22',
    timeAgo: 'Hace 1 día',
    imageUrl: '',
    finder: { name: 'Ana P.', avatar: '👩‍🎓', rating: 5.0 },
    claims: 1,
    status: 'claimed',
    securityQuestions: [
      { question: '¿Cuáles son los últimos 4 dígitos?', answer: '4821' },
      { question: '¿Nombre que aparece en la cédula?', answer: '' },
    ],
  },
  {
    id: '4',
    title: 'Mochila negra marca Totto',
    category: 'Otros',
    description: 'Dejada en la banca del parque del Este. Contiene cuadernos.',
    location: 'Parque del Este, Caracas',
    date: '2026-03-22',
    timeAgo: 'Hace 5 horas',
    imageUrl: '',
    finder: { name: 'Luis M.', avatar: '🧑‍🔧', rating: 4.2 },
    claims: 0,
    status: 'unclaimed',
    securityQuestions: [
      { question: '¿Qué marca es la mochila?', answer: 'Totto' },
      { question: '¿Qué contiene adentro?', answer: 'cuadernos' },
    ],
  },
  {
    id: '5',
    title: 'Audífonos AirPods Pro blancos',
    category: 'Electrónica',
    description: 'Encontrados en el food court del CCCT. Estuche con una calcomanía de gato.',
    location: 'CCCT, Caracas',
    date: '2026-03-21',
    timeAgo: 'Hace 2 días',
    imageUrl: '',
    finder: { name: 'Sofía V.', avatar: '👩‍🎤', rating: 4.9 },
    claims: 3,
    status: 'claimed',
    securityQuestions: [
      { question: '¿Qué calcomanía tiene el estuche?', answer: 'gato' },
      { question: '¿Son AirPods de qué generación?', answer: 'Pro' },
    ],
  },
];

export const mockUser: UserProfile = {
  name: 'Alejandro Torres',
  email: 'alejandro@email.com',
  avatar: '🧑‍💻',
  location: 'Caracas, Venezuela',
  joinDate: 'Enero 2026',
  points: 1250,
  stats: { returns: 12, recoveries: 3, rating: 4.9 },
  badges: [
    { icon: '🏅', label: 'Primera Devolución', unlocked: true },
    { icon: '🔥', label: 'Racha de 3', unlocked: true },
    { icon: '⭐', label: 'Rating Perfecto', unlocked: true },
    { icon: '🎯', label: '10 Devoluciones', unlocked: true },
    { icon: '🦸', label: 'Superhéroe', unlocked: false },
    { icon: '💎', label: 'Leyenda', unlocked: false },
  ],
};

export const mockRewards: Reward[] = [
  { id: '1', title: '10% dcto Farmatodo', description: 'Válido en cualquier sucursal', pointsCost: 200, icon: '💊' },
  { id: '2', title: 'Combo Hamburguesa', description: 'Burger Joint - combo sencillo', pointsCost: 500, icon: '🍔' },
  { id: '3', title: 'Café gratis', description: 'Juan Valdez - cualquier bebida', pointsCost: 150, icon: '☕' },
  { id: '4', title: 'Entrada de cine', description: 'Cinex - cualquier función', pointsCost: 800, icon: '🎬' },
  { id: '5', title: '15% dcto Uber', description: 'Válido en próximo viaje', pointsCost: 300, icon: '🚗' },
];
