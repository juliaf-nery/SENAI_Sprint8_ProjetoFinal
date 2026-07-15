import { Component, inject } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { TURMAS, Turma } from '../../config/turmas';

type DiaSemana = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';

interface AulaGrade {
  disciplina: string;
  horarioInicio: string;
  horarioFim: string;
  turma: string;
  sala: string;
  dia: DiaSemana;
}

@Component({
  selector: 'app-minhas-turmas',
  standalone: true,
  imports: [DashboardShellComponent],
  templateUrl: './minhas-turmas.component.html',
  styleUrl: './minhas-turmas.component.css',
})
export class MinhasTurmasComponent {
  private readonly authService = inject(AuthService);

  readonly diasSemana: DiaSemana[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  readonly gradeHoraria: AulaGrade[] = [
    { dia: 'Segunda', disciplina: 'Matemática', horarioInicio: '08:00', horarioFim: '08:50', turma: '3º Ano A', sala: 'Sala 12' },
    { dia: 'Segunda', disciplina: 'Matemática', horarioInicio: '10:00', horarioFim: '10:50', turma: '2º Ano B', sala: 'Sala 07' },
    { dia: 'Segunda', disciplina: 'Matemática', horarioInicio: '13:30', horarioFim: '14:20', turma: '1º Ano C', sala: 'Sala 03' },

    { dia: 'Terça', disciplina: 'Matemática', horarioInicio: '09:00', horarioFim: '09:50', turma: '1º Ano C', sala: 'Sala 03' },
    { dia: 'Terça', disciplina: 'Matemática', horarioInicio: '11:00', horarioFim: '11:50', turma: '3º Ano A', sala: 'Sala 12' },

    { dia: 'Quarta', disciplina: 'Matemática', horarioInicio: '08:00', horarioFim: '08:50', turma: '2º Ano B', sala: 'Sala 07' },
    { dia: 'Quarta', disciplina: 'Matemática', horarioInicio: '10:00', horarioFim: '10:50', turma: '3º Ano A', sala: 'Sala 12' },
    { dia: 'Quarta', disciplina: 'Matemática', horarioInicio: '14:30', horarioFim: '15:20', turma: '1º Ano C', sala: 'Sala 03' },

    { dia: 'Quinta', disciplina: 'Matemática', horarioInicio: '09:00', horarioFim: '09:50', turma: '3º Ano A', sala: 'Sala 12' },
    { dia: 'Quinta', disciplina: 'Matemática', horarioInicio: '13:30', horarioFim: '14:20', turma: '2º Ano B', sala: 'Sala 07' },

    { dia: 'Sexta', disciplina: 'Matemática', horarioInicio: '08:00', horarioFim: '08:50', turma: '1º Ano C', sala: 'Sala 03' },
    { dia: 'Sexta', disciplina: 'Matemática', horarioInicio: '10:00', horarioFim: '10:50', turma: '2º Ano B', sala: 'Sala 07' },
    { dia: 'Sexta', disciplina: 'Matemática', horarioInicio: '11:00', horarioFim: '11:50', turma: '3º Ano A', sala: 'Sala 12' },
  ];

  readonly turmas: Turma[] = TURMAS;

  turmaSelecionadaNome = this.turmas[0].nome;

  get turmaSelecionada(): Turma {
    return this.turmas.find((t) => t.nome === this.turmaSelecionadaNome) ?? this.turmas[0];
  }

  selecionarTurma(nome: string): void {
    this.turmaSelecionadaNome = nome;
  }

  aulasDoDia(dia: DiaSemana): AulaGrade[] {
    return this.gradeHoraria
      .filter((a) => a.dia === dia)
      .sort((a, b) => a.horarioInicio.localeCompare(b.horarioInicio));
  }

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role as UserRole] : 'Usuário';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role as UserRole] : '#f8f9fa';
  }
}
