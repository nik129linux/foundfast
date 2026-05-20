export type ItemStatus = 'unclaimed' | 'claimed';
export type RewardIconKey = "delivery" | "health" | "coffee" | "cinema" | "retail";
export type BadgeIconKey = "firstReturn" | "streak" | "trusted" | "tenReturns" | "community" | "legend";

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
    initials: string;
    rating: number;
  };
  claims: number;
  status: ItemStatus;
  securityQuestions: { question: string; answer: string }[];
}

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
  location: string;
  joinDate: string;
  points: number;
  stats: {
    returns: number;
    recoveries: number;
    rating: number;
  };
  badges: { iconKey: BadgeIconKey; label: string; unlocked: boolean }[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  iconKey: RewardIconKey;
}

export const CATEGORIES = ['Todos', 'Documentos', 'Electrónica', 'Llaves', 'Ropa', 'Mascotas', 'Otros'];

export const mockItems: FoundItem[] = [
  {
    id: '1',
    title: 'Llavero metálico con tres llaves',
    category: 'Llaves',
    description: 'Encontrado junto a una banca frente a la Alcaldía. Tiene una cinta negra corta y una llave de seguridad.',
    location: 'Plaza de Nariño, Pasto',
    date: '2026-03-23',
    timeAgo: 'Hace 1 hora',
    imageUrl: '',
    finder: { name: 'Laura M.', initials: 'LM', rating: 4.8 },
    claims: 0,
    status: 'unclaimed',
    securityQuestions: [
      { question: '¿Cuántas llaves tiene el llavero?', answer: '3' },
      { question: '¿De qué color es la cinta del llavero?', answer: 'negra' },
    ],
  },
  {
    id: '2',
    title: 'Celular Samsung Galaxy con funda azul',
    category: 'Electrónica',
    description: 'Encontrado en la sala de espera del segundo piso. Tiene protector de pantalla y fondo oscuro.',
    location: 'Terminal de Transportes de Pasto',
    date: '2026-03-23',
    timeAgo: 'Hace 3 horas',
    imageUrl: '',
    finder: { name: 'Santiago P.', initials: 'SP', rating: 4.6 },
    claims: 2,
    status: 'claimed',
    securityQuestions: [
      { question: '¿De qué color es la funda?', answer: 'azul' },
      { question: '¿Tiene protector de pantalla?', answer: 'sí' },
    ],
  },
  {
    id: '3',
    title: 'Cédula de ciudadanía',
    category: 'Documentos',
    description: 'Encontrada cerca del bloque administrativo, dentro de una funda plástica transparente.',
    location: 'Universidad de Nariño, Torobajo',
    date: '2026-03-22',
    timeAgo: 'Hace 1 día',
    imageUrl: '',
    finder: { name: 'Ana C.', initials: 'AC', rating: 5.0 },
    claims: 1,
    status: 'claimed',
    securityQuestions: [
      { question: '¿Cuáles son los últimos 4 dígitos?', answer: '4821' },
      { question: '¿En qué estaba guardado el documento?', answer: 'funda plástica' },
    ],
  },
  {
    id: '4',
    title: 'Mochila negra marca Totto',
    category: 'Otros',
    description: 'Hallada cerca de la zona de comidas. Contiene un cuaderno cuadriculado y un estuche azul.',
    location: 'Unicentro Pasto',
    date: '2026-03-22',
    timeAgo: 'Hace 5 horas',
    imageUrl: '',
    finder: { name: 'Juliana R.', initials: 'JR', rating: 4.4 },
    claims: 0,
    status: 'unclaimed',
    securityQuestions: [
      { question: '¿Qué marca es la mochila?', answer: 'Totto' },
      { question: '¿Qué color tiene el estuche?', answer: 'azul' },
    ],
  },
  {
    id: '5',
    title: 'Audífonos inalámbricos blancos',
    category: 'Electrónica',
    description: 'Encontrados en una mesa junto a una cafetería. El estuche tiene una marca leve en la tapa.',
    location: 'Centro histórico de Pasto',
    date: '2026-03-21',
    timeAgo: 'Hace 2 días',
    imageUrl: '',
    finder: { name: 'Mateo E.', initials: 'ME', rating: 4.9 },
    claims: 3,
    status: 'claimed',
    securityQuestions: [
      { question: '¿De qué color son los audífonos?', answer: 'blancos' },
      { question: '¿El estuche tiene alguna marca visible?', answer: 'sí' },
    ],
  },
];

export const mockUser: UserProfile = {
  name: 'Valentina Rosero',
  email: 'valentina.rosero@email.com',
  initials: 'VR',
  location: 'Pasto, Colombia',
  joinDate: 'Febrero 2026',
  points: 1250,
  stats: { returns: 12, recoveries: 3, rating: 4.9 },
  badges: [
    { iconKey: 'firstReturn', label: 'Primera devolución', unlocked: true },
    { iconKey: 'streak', label: 'Racha de 3', unlocked: true },
    { iconKey: 'trusted', label: 'Confianza alta', unlocked: true },
    { iconKey: 'tenReturns', label: '10 devoluciones', unlocked: true },
    { iconKey: 'community', label: 'Comunidad activa', unlocked: false },
    { iconKey: 'legend', label: 'Referente local', unlocked: false },
  ],
};

export const mockRewards: Reward[] = [
  { id: '1', title: 'Crédito para domicilio', description: 'Úsalo en tu próximo pedido registrado en la app.', pointsCost: 250, iconKey: 'delivery' },
  { id: '2', title: 'Descuento en cuidado personal', description: 'Aplica a productos seleccionados en caja.', pointsCost: 220, iconKey: 'health' },
  { id: '3', title: 'Bebida mediana', description: 'Disponible en tienda participante durante la vigencia.', pointsCost: 180, iconKey: 'coffee' },
  { id: '4', title: 'Entrada general 2D', description: 'Válida de lunes a jueves según cartelera.', pointsCost: 800, iconKey: 'cinema' },
  { id: '5', title: 'Descuento para compras', description: 'Redímelo en tienda física o canal web habilitado.', pointsCost: 360, iconKey: 'retail' },
];
