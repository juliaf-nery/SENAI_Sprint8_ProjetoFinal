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
      { nome: 'Santiago Raelo', email: 'santiago.rafaelo@edu.conecta' },
      { nome: 'Lucas Alencar', email: 'lucas.alencar@edu.conecta' },
      { nome: 'Mariana Medeiros', email: 'mariana.medeiros@edu.conecta' },
      { nome: 'Gabriel Vasconcelos', email: 'gabriel.vasconcelos@edu.conecta' },
      { nome: 'Larissa Cavalcanti', email: 'larissa.cavalcanti@edu.conecta' },
      { nome: 'Mateus Guimarães', email: 'mateus.guimaraes@edu.conecta' },
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
      { nome: 'Juliana Montenegro', email: 'juliana.montenegro@edu.conecta' },
      { nome: 'Thiago Valente', email: 'thiago.valente@edu.conecta' },
      { nome: 'Fernanda Cardoso', email: 'fernanda.cardoso@edu.conecta' },
      { nome: 'Rodrigo Antunes', email: 'rodrigo.antunes@edu.conecta' },
      { nome: 'Aline Pires', email: 'aline.pires@edu.conecta' },
      { nome: 'Felipe Sales', email: 'felipe.sales@edu.conecta' },
      { nome: 'Letícia Dornelles', email: 'leticia.dornelles@edu.conecta' },
      { nome: 'Bruno Machado', email: 'bruno.machado@edu.conecta' },
      { nome: 'Isabela Fontes', email: 'isabela.fontes@edu.conecta' },
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
      { nome: 'Gustavo Linhares', email: 'gustavo.linhares@edu.conecta' },
      { nome: 'Carolina Rezende', email: 'carolina.rezende@edu.conecta' },
      { nome: 'Daniel Fagundes', email: 'daniel.fagundes@edu.conecta' },
      { nome: 'Amanda Barreto', email: 'amanda.barreto@edu.conecta' },
      { nome: 'Leonardo Mansur', email: 'leonardo.mansur@edu.conecta' },
      { nome: 'Bárbara Vieira', email: 'barbara.vieira@edu.conecta' },
      { nome: 'Henrique Prado', email: 'henrique.prado@edu.conecta' },
      { nome: 'Camilla Meireles', email: 'camilla.meireles@edu.conecta' },
    ],
  },
];
