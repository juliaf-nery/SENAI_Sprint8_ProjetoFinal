import { UserRole } from '../pages/types/user';

export const PERFIL_LABEL: Record<UserRole, string> = {
  administrador: 'Administrador Estadual',
  direcao: 'Direção Escolar',
  professor: 'Professor',
  aluno: 'Aluno',
  responsavel: 'Responsável',
};

export const PERFIL_COR: Record<UserRole, string> = {
  administrador: '#0057A8',
  direcao: '#003E7E',
  professor: '#2E7D32',
  aluno: '#F9A825',
  responsavel: '#6b21a8',
};
