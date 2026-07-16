import { UserRole } from '../pages/types/user';

export interface MenuItem {
  label: string;
  icon: string; // classe do bootstrap-icons
  route: string;
}

export const INICIO_ROUTE_BY_ROLE: Record<UserRole, string> = {
  administrador: '/home-admin',
  direcao: '/home-direcao',
  professor: '/home-professor',
  aluno: '/home-aluno',
  responsavel: '/home-responsavel',
};

export const MENU_ITEMS_BY_ROLE: Record<UserRole, MenuItem[]> = {
  administrador: [
    { label: 'Gerenciar Escolas', icon: 'bi-building', route: '/gerenciar-escolas' },
    { label: 'Gerenciar Usuários', icon: 'bi-people-fill', route: '/gerenciar-usuarios' },
    { label: 'Indicadores Estaduais', icon: 'bi-graph-up-arrow', route: '/indicadores-estaduais' },
    { label: 'Pesquisas', icon: 'bi-clipboard2-check', route: '/pesquisas' },
    { label: 'Ouvidoria', icon: 'bi-chat-square-dots', route: '/ouvidoria' },
    { label: 'Plano de Ação', icon: 'bi-kanban', route: '/plano-de-acao' },
    { label: 'Relatórios', icon: 'bi-file-earmark-text', route: '/relatorios' },
    { label: 'Configurações Gerais', icon: 'bi-gear-fill', route: '/configuracoes' },
  ],
  direcao: [
    { label: 'Turmas', icon: 'bi-collection-fill', route: '/turmas' },
    { label: 'Projetos', icon: 'bi-easel2', route: '/projetos' },
    { label: 'Calendário', icon: 'bi-calendar3', route: '/calendario' },
    { label: 'Professores', icon: 'bi-person-workspace', route: '/professores' },
    { label: 'Biblioteca Digital', icon: 'bi-book-half', route: '/biblioteca' },
    { label: 'Indicadores da Escola', icon: 'bi-graph-up-arrow', route: '/indicadores-escola' },
    { label: 'Avisos', icon: 'bi-megaphone', route: '/avisos' },
    { label: 'Mensagens', icon: 'bi-chat-dots-fill', route: '/mensagens' },
    { label: 'Cardápio Escolar', icon: 'bi-cup-hot-fill', route: '/cardapio' },
    { label: 'Ouvidoria', icon: 'bi-chat-square-dots', route: '/ouvidoria' },
    { label: 'Destaques', icon: 'bi bi-star', route: '/destaques' },
    { label: 'Relatórios', icon: 'bi-file-earmark-text', route: '/relatorios' },
  ],
  professor: [
    { label: 'Minhas Turmas', icon: 'bi-easel2-fill', route: '/minhas-turmas' },
    { label: 'Notas', icon: 'bi-card-checklist', route: '/notas' },
    { label: 'Frequência', icon: 'bi-clipboard2-pulse', route: '/frequencia' },
    { label: 'Calendário', icon: 'bi-calendar3', route: '/calendario' },
    { label: 'Professores', icon: 'bi bi-person-badge', route: '/professores' },
    { label: 'Atividades', icon: 'bi-journal-check', route: '/atividades' },
    { label: 'Materiais', icon: 'bi-folder2-open', route: '/materiais' },
    { label: 'Biblioteca Digital', icon: 'bi-book-half', route: '/biblioteca' },
    { label: 'Avisos', icon: 'bi-megaphone', route: '/avisos' },
    { label: 'Mensagens', icon: 'bi-chat-dots-fill', route: '/mensagens' },
    { label: 'Cardápio', icon: 'bi-cup-hot-fill', route: '/cardapio' },
    { label: 'Ouvidoria', icon: 'bi bi-person-raised-hand', route: '/ouvidoria' },
    { label: 'Destaques', icon: 'bi bi-star', route: '/destaques' },
  ],
  aluno: [
    { label: 'Boletim', icon: 'bi-journal-text', route: '/boletim' },
    { label: 'Frequência', icon: 'bi-clipboard2-check', route: '/frequencia' },
    { label: 'Calendário', icon: 'bi-calendar3', route: '/calendario' },
    { label: 'Atividades', icon: 'bi-list-check', route: '/atividades' },
    { label: 'Professores', icon: 'bi bi-person-badge', route: '/professores' },
    { label: 'Biblioteca Digital', icon: 'bi-book-half', route: '/biblioteca' },
    { label: 'Avisos', icon: 'bi-megaphone', route: '/avisos' },
    { label: 'Mensagens', icon: 'bi-chat-dots-fill', route: '/mensagens' },
    { label: 'Cardápio', icon: 'bi-cup-hot-fill', route: '/cardapio' },
    { label: 'Ouvidoria', icon: 'bi bi-person-raised-hand', route: '/ouvidoria' },
    { label: 'Destaques', icon: 'bi bi-star', route: '/destaques' },
  ],
  responsavel: [
    { label: 'Boletim do Aluno', icon: 'bi-journal-text', route: '/boletim' },
    { label: 'Frequência', icon: 'bi-clipboard2-check', route: '/frequencia' },
    { label: 'Professores', icon: 'bi bi-person-badge', route: '/professores' },
    { label: 'Calendário', icon: 'bi-calendar3', route: '/calendario' },
    { label: 'Avisos', icon: 'bi-megaphone', route: '/avisos' },
    { label: 'Mensagens', icon: 'bi-chat-dots-fill', route: '/mensagens' },
    { label: 'Cardápio Escolar', icon: 'bi-cup-hot-fill', route: '/cardapio' },
    { label: 'Ouvidoria', icon: 'bi bi-person-raised-hand', route: '/ouvidoria' },  
  ],
};

/** Itens comuns a todos os perfis, exibidos no rodapé do menu. */
export const MENU_ITEMS_COMUNS: MenuItem[] = [
  { label: 'Meu Perfil', icon: 'bi-person-circle', route: '/meu-perfil' },
  { label: 'Configurações', icon: 'bi-gear', route: '/configuracoes' },
];
