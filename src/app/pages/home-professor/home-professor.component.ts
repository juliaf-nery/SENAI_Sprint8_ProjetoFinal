import { Component } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';

interface ProximaAula {
  turma: string;
  disciplina: string;
  horario: string;
  sala: string;
}

@Component({
  selector: 'app-home-professor',
  imports: [DashboardShellComponent, DashboardCardComponent],
  templateUrl: './home-professor.component.html',
  styleUrl: './home-professor.component.css'
})
export class HomeProfessorComponent {
  readonly proximasAulas: ProximaAula[] = [
    { turma: '3º Ano A', disciplina: 'Matemática', horario: 'Hoje, 08h00', sala: 'Sala 12' },
    { turma: '2º Ano B', disciplina: 'Matemática', horario: 'Hoje, 10h00', sala: 'Sala 07' },
    { turma: '1º Ano C', disciplina: 'Matemática', horario: 'Amanhã, 09h00', sala: 'Sala 03' },
  ];
}
