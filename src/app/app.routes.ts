import { Routes } from '@angular/router';
import { homeGuard } from './guards/home.guard';

const emBreve = () =>
  import('./pages/em-breve/em-breve.component').then((c) => c.EmBreveComponent);

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/inicio/inicio.component').then((c) => c.InicioComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },

  // Rotas de Home por perfil (protegidas por autenticação + perfil)
  {
    path: 'home-admin',
    loadComponent: () =>
      import('./pages/home-admin/home-admin.component').then(
        (c) => c.HomeAdminComponent
      ),
    canActivate: [homeGuard],
    data: { roles: ['administrador'] },
  },
  {
    path: 'home-direcao',
    loadComponent: () =>
      import('./pages/home-direcao/home-direcao.component').then(
        (c) => c.HomeDirecaoComponent
      ),
    canActivate: [homeGuard],
    data: { roles: ['direcao'] },
  },
  {
    path: 'home-professor',
    loadComponent: () =>
      import('./pages/home-professor/home-professor.component').then(
        (c) => c.HomeProfessorComponent
      ),
    canActivate: [homeGuard],
    data: { roles: ['professor'] },
  },
  {
    path: 'home-aluno',
    loadComponent: () =>
      import('./pages/home-aluno/home-aluno.component').then(
        (c) => c.HomeAlunoComponent
      ),
    canActivate: [homeGuard],
    data: { roles: ['aluno'] },
  },
  {
    path: 'home-responsavel',
    loadComponent: () =>
      import('./pages/home-responsavel/home-responsavel.component').then(
        (c) => c.HomeResponsavelComponent
      ),
    canActivate: [homeGuard],
    data: { roles: ['responsavel'] },
  },

  // Módulos do menu lateral (ainda em desenvolvimento — placeholder "Em breve",
  // já com guarda de autenticação + perfil, para não quebrar a navegação).
  { path: 'gerenciar-escolas', loadComponent: emBreve, canActivate: [homeGuard], data: { titulo: 'Gerenciar Escolas', icon: 'bi-building', roles: ['administrador'] } },
  { path: 'gerenciar-usuarios', loadComponent: emBreve, canActivate: [homeGuard], data: { titulo: 'Gerenciar Usuários', icon: 'bi-people-fill', roles: ['administrador'] } },
  { path: 'indicadores-estaduais', loadComponent: emBreve, canActivate: [homeGuard], data: { titulo: 'Indicadores Estaduais', icon: 'bi-graph-up-arrow', roles: ['administrador'] } },
  { path: 'pesquisas', loadComponent: emBreve, canActivate: [homeGuard], data: { titulo: 'Pesquisas de Satisfação', icon: 'bi-clipboard2-check', roles: ['administrador'] } },
  {
    path: 'ouvidoria',
    loadComponent: () =>
      import('./pages/ouvidoria/ouvidoria.component').then((c) => c.OuvidoriaComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Ouvidoria Escolar', icon: 'bi-megaphone', roles: ['administrador', 'direcao', 'professor', 'aluno', 'responsavel'] },
  },
  { path: 'plano-de-acao', loadComponent: emBreve, canActivate: [homeGuard], data: { titulo: 'Plano de Ação Escolar', icon: 'bi-kanban', roles: ['administrador', 'direcao'] } },
  {
    path: 'relatorios',
    loadComponent: () =>
      import('./pages/relatorios/relatorios.component').then((c) => c.RelatoriosComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Relatórios', icon: 'bi-file-earmark-text', roles: ['administrador', 'direcao'] },
  },
  {
    path: 'avisos',
    loadComponent: () =>
      import('./pages/avisos/avisos.component').then((c) => c.AvisosComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Avisos', icon: 'bi-megaphone', roles: ['direcao', 'professor', 'aluno', 'responsavel'] },
  },
  { path: 'projetos', loadComponent: emBreve, canActivate: [homeGuard], data: { titulo: 'Projetos Escolares', icon: 'bi-kanban', roles: ['direcao', 'professor', 'aluno'] } },
  { path: 'eventos', loadComponent: emBreve, canActivate: [homeGuard], data: { titulo: 'Eventos', icon: 'bi-calendar-event', roles: ['direcao', 'professor', 'aluno', 'responsavel'] } },
  {
    path: 'professores',
    loadComponent: () =>
      import('./pages/professores/professores.component').then((c) => c.ProfessoresComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Professores', icon: 'bi-person-workspace', roles: ['direcao', 'professor', 'aluno', 'responsavel'] },
  },
  {
    path: 'destaques',
    loadComponent: () =>
      import('./pages/destaques/destaques.component').then((c) => c.DestaquesComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Destaques', icon: 'bi-star-fill', roles: ['direcao', 'professor', 'aluno'] },
  },
  {
    path: 'indicadores-escola',
    loadComponent: () => import('./pages/indicadores-escola/indicadores-escola.component').then((c) => c.IndicadoresEscolaComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Indicadores da Escola', icon: 'bi-graph-up-arrow', roles: ['direcao'] },
  },
  {
    path: 'minhas-turmas',
    loadComponent: () =>
      import('./pages/minhas-turmas/minhas-turmas.component').then((c) => c.MinhasTurmasComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Minhas Turmas', icon: 'bi-easel2-fill', roles: ['professor'] },
  },
  {
    path: 'turmas',
    loadComponent: () =>
      import('./pages/turmas/turmas.component').then((c) => c.TurmasComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Turmas', icon: 'bi-collection-fill', roles: ['direcao', 'professor'] },
  },
  {
    path: 'notas',
    loadComponent: () =>
      import('./pages/notas/notas.component').then((c) => c.NotasComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Notas', icon: 'bi-card-checklist', roles: ['professor'] },
  },
  {
    path: 'frequencia',
    loadComponent: () =>
      import('./pages/frequencia/frequencia.component').then((c) => c.FrequenciaComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Frequência', icon: 'bi-clipboard2-pulse', roles: ['professor', 'aluno', 'responsavel'] },
  },
  {
    path: 'atividades',
    loadComponent: () =>
      import('./pages/atividades/atividades.component').then((c) => c.AtividadesComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Atividades', icon: 'bi-journal-check', roles: ['professor', 'aluno'] },
  },
  { path: 'materiais', loadComponent: emBreve, canActivate: [homeGuard], data: { titulo: 'Materiais de Aula', icon: 'bi-folder2-open', roles: ['professor'] } },
  {
    path: 'calendario',
    loadComponent: () =>
      import('./pages/calendario/calendario.component').then((c) => c.CalendarioComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Calendário', icon: 'bi-calendar3', roles: ['direcao', 'professor', 'aluno', 'responsavel'] },
  },
  { path: 'mensagens', loadComponent: emBreve, canActivate: [homeGuard], data: { titulo: 'Mensagens', icon: 'bi-chat-dots-fill', roles: ['direcao', 'professor', 'aluno', 'responsavel'] } },
  {
    path: 'boletim',
    loadComponent: () =>
      import('./pages/boletim/boletim.component').then((c) => c.BoletimComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Boletim', icon: 'bi-journal-text', roles: ['aluno', 'responsavel'] },
  },
  {
    path: 'biblioteca',
    loadComponent: () =>
      import('./pages/biblioteca/biblioteca.component').then((c) => c.BibliotecaComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Biblioteca Digital', icon: 'bi-book-half', roles: ['professor', 'aluno', 'direcao'] },
  },
  { path: 'galeria', loadComponent: emBreve, canActivate: [homeGuard], data: { titulo: 'Galeria de Fotos', icon: 'bi-images', roles: ['aluno'] } },
  {
    path: 'cardapio',
    loadComponent: () =>
      import('./pages/cardapio/cardapio.component').then((c) => c.CardapioComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Cardápio Escolar', icon: 'bi-cup-hot-fill', roles: ['direcao', 'professor', 'aluno', 'responsavel'] },
  },

  // Comuns a todos os perfis autenticados (sem restrição de "roles")
  {
    path: 'meu-perfil',
    loadComponent: () =>
      import('./pages/meu-perfil/meu-perfil.component').then((c) => c.MeuPerfilComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Meu Perfil', icon: 'bi-person-circle' },
  },
  {
    path: 'configuracoes',
    loadComponent: () =>
      import('./pages/configuracoes/configuracoes.component').then((c) => c.ConfiguracoesComponent),
    canActivate: [homeGuard],
    data: { titulo: 'Configurações', icon: 'bi-gear-fill' },
  },

  // Fallback: qualquer rota desconhecida volta para a página inicial
  {
    path: '**',
    redirectTo: '',
  },
];
