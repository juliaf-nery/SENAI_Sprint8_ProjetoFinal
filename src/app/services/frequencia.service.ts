import { Injectable } from '@angular/core';

export interface RegistroPresenca {
  alunoEmail: string;
  presente: boolean;
  motivoFalta?: string | null;
}

interface ChamadaPublicada {
  turma: string;
  disciplina: string;
  /** Data no formato ISO (yyyy-MM-dd), sempre a data em que o professor publicou a chamada. */
  dataISO: string;
  alunoEmail: string;
  presente: boolean;
  motivoFalta?: string | null;
}

/**
 * Guarda o estado das chamadas (frequência) feitas pelo professor, compartilhado
 * entre a página "Frequência" do professor (registro da chamada) e a página
 * "Frequência" do aluno/responsável (calendário e estatísticas de presença).
 *
 * A frequência só passa a valer para o aluno depois que o professor clica em
 * "Publicar" — antes disso, as marcações ficam apenas salvas localmente
 * ("Salvar Alterações"), sem sair da tela do professor.
 */
@Injectable({
  providedIn: 'root',
})
export class FrequenciaService {
  private readonly publicadas: ChamadaPublicada[] = [];

  private mesmoRegistro(p: ChamadaPublicada, turma: string, disciplina: string, dataISO: string, alunoEmail: string): boolean {
    return (
      p.turma === turma &&
      p.disciplina === disciplina &&
      p.dataISO === dataISO &&
      p.alunoEmail === alunoEmail
    );
  }

  /** Presença já publicada de um aluno em uma data específica (null se ainda não houve chamada publicada). */
  obterPresencaPublicada(turma: string, disciplina: string, dataISO: string, alunoEmail: string): boolean | null {
    const registro = this.publicadas.find((p) => this.mesmoRegistro(p, turma, disciplina, dataISO, alunoEmail));
    return registro ? registro.presente : null;
  }

  /** Registro completo já publicado para um aluno em uma data específica. */
  obterRegistroPublicado(turma: string, disciplina: string, dataISO: string, alunoEmail: string): RegistroPresenca | null {
    const registro = this.publicadas.find((p) => this.mesmoRegistro(p, turma, disciplina, dataISO, alunoEmail));
    if (!registro) return null;

    return {
      alunoEmail,
      presente: registro.presente,
      motivoFalta: registro.motivoFalta ?? null,
    };
  }

  /**
   * Publica (torna visível ao aluno) a chamada de uma turma/disciplina em uma data.
   * Se a turma já tiver sido publicada nessa mesma data, os registros são atualizados
   * em vez de duplicados (permite ao professor corrigir a chamada do dia).
   */
  publicarChamada(turma: string, disciplina: string, dataISO: string, registros: RegistroPresenca[]): void {
    for (const registro of registros) {
      const indice = this.publicadas.findIndex((p) =>
        this.mesmoRegistro(p, turma, disciplina, dataISO, registro.alunoEmail)
      );
      const entrada: ChamadaPublicada = {
        turma,
        disciplina,
        dataISO,
        alunoEmail: registro.alunoEmail,
        presente: registro.presente,
        motivoFalta: registro.motivoFalta ?? null,
      };
      if (indice >= 0) {
        this.publicadas[indice] = entrada;
      } else {
        this.publicadas.push(entrada);
      }
    }
  }

  /** Todas as faltas (presente = false) já publicadas de um aluno em uma turma/disciplina. */
  obterFaltasDoAluno(turma: string, disciplina: string, alunoEmail: string): { dataISO: string }[] {
    return this.publicadas
      .filter((p) => p.turma === turma && p.disciplina === disciplina && p.alunoEmail === alunoEmail && !p.presente)
      .map((p) => ({ dataISO: p.dataISO }));
  }
}
