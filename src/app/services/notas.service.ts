import { Injectable } from '@angular/core';

/**
 * Categorias de avaliação padrão, conforme especificado no PDF.
 * O professor pode adicionar ou remover categorias na página "Notas".
 */
const CATEGORIAS_PADRAO = ['Avaliação 1', 'Avaliação 2', 'Avaliação 3', 'Teste', 'Prova'];

interface ChaveNota {
  turma: string;
  disciplina: string;
  alunoEmail: string;
  categoria: string;
}

/**
 * Guarda o estado das notas lançadas pelo professor, compartilhado entre
 * a página "Notas" (professor) e o "Boletim" (aluno/responsável).
 *
 * As notas só ficam visíveis para o aluno depois que o professor clica em
 * "Publicar" — antes disso, ficam apenas salvas localmente ("Salvar
 * Alteração"), sem sair da tela do professor.
 */
@Injectable({
  providedIn: 'root',
})
export class NotasService {
  /** Categorias de avaliação atualmente ativas (compartilhadas entre todas as turmas). */
  categorias: string[] = [...CATEGORIAS_PADRAO];

  private readonly notasPublicadas = new Map<string, number | null>();

  private chaveTexto(chave: ChaveNota): string {
    return `${chave.turma}||${chave.disciplina}||${chave.alunoEmail}||${chave.categoria}`;
  }

  adicionarCategoria(nome: string): boolean {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo || this.categorias.includes(nomeLimpo)) return false;
    this.categorias.push(nomeLimpo);
    return true;
  }

  removerCategoria(nome: string): void {
    this.categorias = this.categorias.filter((c) => c !== nome);
  }

  /** Nota publicada de um aluno em uma categoria (o que o aluno enxerga no Boletim). */
  obterNotaPublicada(turma: string, disciplina: string, alunoEmail: string, categoria: string): number | null {
    const valor = this.notasPublicadas.get(this.chaveTexto({ turma, disciplina, alunoEmail, categoria }));
    return valor ?? null;
  }

  /** Todas as notas publicadas de um aluno (por categoria) em uma disciplina/turma. */
  obterNotasPublicadasDoAluno(turma: string, disciplina: string, alunoEmail: string): Record<string, number> {
    const resultado: Record<string, number> = {};
    for (const categoria of this.categorias) {
      const nota = this.obterNotaPublicada(turma, disciplina, alunoEmail, categoria);
      if (nota !== null) resultado[categoria] = nota;
    }
    return resultado;
  }

  /** Publica (torna visível ao aluno) o conjunto de notas lançadas pelo professor. */
  publicarNotas(turma: string, disciplina: string, notas: { alunoEmail: string; categoria: string; valor: number | null }[]): void {
    for (const nota of notas) {
      const chave = this.chaveTexto({ turma, disciplina, alunoEmail: nota.alunoEmail, categoria: nota.categoria });
      if (nota.valor === null) {
        this.notasPublicadas.delete(chave);
      } else {
        this.notasPublicadas.set(chave, nota.valor);
      }
    }
  }
}
