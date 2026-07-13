export type TipoAviso = 'urgente' | 'informativo' | 'evento' | 'atencao';

export interface Aviso {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
  autor: string;
  tipo: TipoAviso;
}

export const TIPO_AVISO_LABEL: Record<TipoAviso, string> = {
  urgente: 'Urgente',
  informativo: 'Informativo',
  evento: 'Evento',
  atencao: 'Atenção',
};

/**
 * Fonte única dos avisos escolares.
 * Usada tanto na página "Avisos" quanto no "Calendário" — conforme o PDF,
 * os avisos aqui cadastrados também devem aparecer no calendário.
 */
export const AVISOS: Aviso[] = [
  {
    id: 'aviso-1',
    titulo: 'Reunião de Pais e Mestres',
    descricao: 'Reunião obrigatória com pais e responsáveis para entrega de boletins do 2º bimestre. Presença obrigatória.',
    data: new Date(2026, 6, 20),
    autor: 'Direção Escolar',
    tipo: 'urgente',
  },
  {
    id: 'aviso-2',
    titulo: 'Entrega de Boletins — 2º Bimestre',
    descricao: 'Os boletins do 2º bimestre estarão disponíveis na plataforma e na secretaria a partir do dia 23/07.',
    data: new Date(2026, 6, 23),
    autor: 'Secretaria Escolar',
    tipo: 'informativo',
  },
  {
    id: 'aviso-3',
    titulo: 'Feira de Ciências 2026 — Inscrições Abertas',
    descricao: 'As inscrições para a Feira de Ciências 2026 estão abertas. Cada turma pode inscrever até 3 projetos.',
    data: new Date(2026, 6, 25),
    autor: 'Coordenação Pedagógica',
    tipo: 'evento',
  },
  {
    id: 'aviso-4',
    titulo: 'Prazo de Rematrícula 2027',
    descricao: 'O prazo de rematrícula para o ano letivo de 2027 encerra em 31/07. Compareça à secretaria com os documentos necessários.',
    data: new Date(2026, 6, 31),
    autor: 'Secretaria Escolar',
    tipo: 'urgente',
  },
  {
    id: 'aviso-5',
    titulo: 'Cardápio Atualizado — Julho',
    descricao: 'O cardápio semanal foi atualizado para o mês de julho. Confira as opções na plataforma.',
    data: new Date(2026, 6, 11),
    autor: 'Nutricionista',
    tipo: 'informativo',
  },
  {
    id: 'aviso-6',
    titulo: 'Manutenção da Quadra Esportiva',
    descricao: 'A quadra esportiva estará em manutenção entre os dias 15/07 e 19/07. As aulas de Educação Física ocorrerão no pátio.',
    data: new Date(2026, 6, 15),
    autor: 'Direção Escolar',
    tipo: 'atencao',
  },
];
