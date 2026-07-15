export interface AlunoTurma {
  nome: string;
  email: string;
}

export interface Turma {
  nome: string;
  serie: string;
  disciplina: string;
  alunos: AlunoTurma[];
}

export const TURMAS: Turma[] = [
  {
    nome: '3º Ano A',
    serie: 'Ensino Médio',
    disciplina: 'Matemática',
    alunos: [
      { nome: 'João Pedro Santos', email: 'joao.pedro@edu.conecta' },
      { nome: 'Ana Beatriz Souza', email: 'ana.beatriz@edu.conecta' },
      { nome: 'Lucas Andrade', email: 'lucas.andrade@edu.conecta' },
      { nome: 'Beatriz Nogueira', email: 'beatriz.nogueira@edu.conecta' },
      { nome: 'Rafael Correia', email: 'rafael.correia@edu.conecta' },
      { nome: 'Camila Duarte', email: 'camila.duarte@edu.conecta' },
    ],
  },
  {
    nome: '2º Ano B',
    serie: 'Ensino Médio',
    disciplina: 'Matemática',
    alunos: [
      { nome: 'Bruno Cardoso', email: 'bruno.cardoso@edu.conecta' },
      { nome: 'Larissa Farias', email: 'larissa.farias@edu.conecta' },
      { nome: 'Diego Martins', email: 'diego.martins@edu.conecta' },
      { nome: 'Fernanda Rocha', email: 'fernanda.rocha@edu.conecta' },
      { nome: 'Gustavo Lima', email: 'gustavo.lima@edu.conecta' },
    ],
  },
  {
    nome: '1º Ano C',
    serie: 'Ensino Médio',
    disciplina: 'Matemática',
    alunos: [
      { nome: 'Isabela Teixeira', email: 'isabela.teixeira@edu.conecta' },
      { nome: 'Matheus Pereira', email: 'matheus.pereira@edu.conecta' },
      { nome: 'Sofia Barbosa', email: 'sofia.barbosa@edu.conecta' },
      { nome: 'Enzo Ribeiro', email: 'enzo.ribeiro@edu.conecta' },
    ],
  },
];
