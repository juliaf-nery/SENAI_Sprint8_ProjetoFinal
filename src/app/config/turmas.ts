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
      { nome: 'João Pedro Santos', email: 'joao.pedro@educanet.com' },
      { nome: 'Ana Beatriz Souza', email: 'ana.beatriz@educanet.com' },
      { nome: 'Lucas Andrade', email: 'lucas.andrade@educanet.com' },
      { nome: 'Beatriz Nogueira', email: 'beatriz.nogueira@educanet.com' },
      { nome: 'Rafael Correia', email: 'rafael.correia@educanet.com' },
      { nome: 'Camila Duarte', email: 'camila.duarte@educanet.com' },
      { nome: 'Santiago Raelo', email: 'santiago.rafaelo@educanet.com' },
      { nome: 'Lucas Alencar', email: 'lucas.alencar@educanet.com' },
      { nome: 'Mariana Medeiros', email: 'mariana.medeiros@educanet.com' },
      { nome: 'Gabriel Vasconcelos', email: 'gabriel.vasconcelos@educanet.com' },
      { nome: 'Larissa Cavalcanti', email: 'larissa.cavalcanti@educanet.com' },
      { nome: 'Mateus Guimarães', email: 'mateus.guimaraes@educanet.com' },
    ],
  },
  {
    nome: '2º Ano B',
    serie: 'Ensino Médio',
    disciplina: 'Matemática',
    alunos: [
      { nome: 'Bruno Cardoso', email: 'bruno.cardoso@educanet.com' },
      { nome: 'Larissa Farias', email: 'larissa.farias@educanet.com' },
      { nome: 'Diego Martins', email: 'diego.martins@educanet.com' },
      { nome: 'Fernanda Rocha', email: 'fernanda.rocha@educanet.com' },
      { nome: 'Gustavo Lima', email: 'gustavo.lima@educanet.com' },
      { nome: 'Juliana Montenegro', email: 'juliana.montenegro@educanet.com' },
      { nome: 'Thiago Valente', email: 'thiago.valente@educanet.com' },
      { nome: 'Fernanda Cardoso', email: 'fernanda.cardoso@educanet.com' },
      { nome: 'Rodrigo Antunes', email: 'rodrigo.antunes@educanet.com' },
      { nome: 'Aline Pires', email: 'aline.pires@educanet.com' },
      { nome: 'Felipe Sales', email: 'felipe.sales@educanet.com' },
      { nome: 'Letícia Dornelles', email: 'leticia.dornelles@educanet.com' },
      { nome: 'Bruno Machado', email: 'bruno.machado@educanet.com' },
      { nome: 'Isabela Fontes', email: 'isabela.fontes@educanet.com' },
    ],
  },
  {
    nome: '1º Ano C',
    serie: 'Ensino Médio',
    disciplina: 'Matemática',
    alunos: [
      { nome: 'Isabela Teixeira', email: 'isabela.teixeira@educanet.com' },
      { nome: 'Matheus Pereira', email: 'matheus.pereira@educanet.com' },
      { nome: 'Sofia Barbosa', email: 'sofia.barbosa@educanet.com' },
      { nome: 'Enzo Ribeiro', email: 'enzo.ribeiro@educanet.com' },
      { nome: 'Gustavo Linhares', email: 'gustavo.linhares@educanet.com' },
      { nome: 'Carolina Rezende', email: 'carolina.rezende@educanet.com' },
      { nome: 'Daniel Fagundes', email: 'daniel.fagundes@educanet.com' },
      { nome: 'Amanda Barreto', email: 'amanda.barreto@educanet.com' },
      { nome: 'Leonardo Mansur', email: 'leonardo.mansur@educanet.com' },
      { nome: 'Bárbara Vieira', email: 'barbara.vieira@educanet.com' },
      { nome: 'Henrique Prado', email: 'henrique.prado@educanet.com' },
      { nome: 'Camilla Meireles', email: 'camilla.meireles@educanet.com' },
    ],
  },
];
