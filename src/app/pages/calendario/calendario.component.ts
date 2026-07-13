import { Component, inject } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { AVISOS } from '../../config/avisos';

type TipoEvento = 'prova' | 'atividade' | 'reuniao' | 'evento' | 'projeto' | 'aviso';

interface EventoCalendario {
  data: Date;
  titulo: string;
  tipo: TipoEvento;
  horario?: string;
}

interface DiaCalendario {
  data: Date;
  noMesAtual: boolean;
  eventos: EventoCalendario[];
}

const TIPO_LABEL: Record<TipoEvento, string> = {
  prova: 'Prova',
  atividade: 'Atividade',
  reuniao: 'Reunião',
  evento: 'Evento',
  projeto: 'Projeto',
  aviso: 'Aviso',
};

/**
 * Página "Calendário" — comum a Professor, Aluno e Responsável.
 * Para o perfil Aluno, o botão "Novo Evento" não é exibido (somente
 * visualização), conforme especificação do PDF.
 */
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [DashboardShellComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent {
  private readonly authService = inject(AuthService);

  readonly tipoLabel = TIPO_LABEL;
  readonly tiposLegenda: TipoEvento[] = ['prova', 'atividade', 'reuniao', 'evento', 'projeto', 'aviso'];

  mesReferencia = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  diaSelecionado: Date = new Date();

  private hoje = new Date();

  private novaData(offsetDias: number): Date {
    const d = new Date(this.hoje);
    d.setDate(d.getDate() + offsetDias);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private readonly eventosProprios: EventoCalendario[] = [
    { data: this.novaData(2), titulo: 'Prova de Matemática', tipo: 'prova', horario: '08:00' },
    { data: this.novaData(4), titulo: 'Entrega de Trabalho — Biologia', tipo: 'atividade', horario: '23:59' },
    { data: this.novaData(7), titulo: 'Prova de Língua Portuguesa', tipo: 'prova', horario: '10:00' },
    { data: this.novaData(9), titulo: 'Reunião de Pais e Mestres', tipo: 'reuniao', horario: '19:00' },
    { data: this.novaData(12), titulo: 'Semana Cultural', tipo: 'evento', horario: '08:00' },
    { data: this.novaData(15), titulo: 'Apresentação — Feira de Ciências', tipo: 'projeto', horario: '14:00' },
    { data: this.novaData(-1), titulo: 'Simulado Bimestral', tipo: 'prova', horario: '08:00' },
  ];

  /**
   * Todos os eventos exibidos no calendário: os eventos próprios da agenda
   * escolar somados aos avisos cadastrados na página "Avisos" (fonte única
   * em config/avisos.ts), conforme especificado no PDF.
   */
  readonly eventos: EventoCalendario[] = [
    ...this.eventosProprios,
    ...AVISOS.map((aviso): EventoCalendario => ({
      data: aviso.data,
      titulo: aviso.titulo,
      tipo: 'aviso',
    })),
  ];

  get mesAnoLabel(): string {
    return this.mesReferencia
      .toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  get diasSemana(): string[] {
    return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  }

  /** Monta a grade de dias (6 semanas) do mês de referência, incluindo dias de padding. */
  get diasDoMes(): DiaCalendario[] {
    const primeiroDia = new Date(this.mesReferencia.getFullYear(), this.mesReferencia.getMonth(), 1);
    const inicioGrade = new Date(primeiroDia);
    inicioGrade.setDate(inicioGrade.getDate() - primeiroDia.getDay());

    const dias: DiaCalendario[] = [];
    for (let i = 0; i < 42; i++) {
      const data = new Date(inicioGrade);
      data.setDate(inicioGrade.getDate() + i);
      dias.push({
        data,
        noMesAtual: data.getMonth() === this.mesReferencia.getMonth(),
        eventos: this.eventosDoDia(data),
      });
    }
    return dias;
  }

  eventosDoDia(data: Date): EventoCalendario[] {
    return this.eventos.filter((e) => this.mesmoDia(e.data, data));
  }

  mesmoDia(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  ehHoje(data: Date): boolean {
    return this.mesmoDia(data, new Date());
  }

  ehSelecionado(data: Date): boolean {
    return this.mesmoDia(data, this.diaSelecionado);
  }

  selecionarDia(dia: DiaCalendario): void {
    this.diaSelecionado = dia.data;
  }

  mesAnterior(): void {
    this.mesReferencia = new Date(this.mesReferencia.getFullYear(), this.mesReferencia.getMonth() - 1, 1);
  }

  proximoMes(): void {
    this.mesReferencia = new Date(this.mesReferencia.getFullYear(), this.mesReferencia.getMonth() + 1, 1);
  }

  get eventosDoDiaSelecionado(): EventoCalendario[] {
    return this.eventosDoDia(this.diaSelecionado).sort((a, b) => (a.horario ?? '').localeCompare(b.horario ?? ''));
  }

  get diaSelecionadoLabel(): string {
    return this.diaSelecionado
      .toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  /** Próximos eventos a partir de hoje, ordenados cronologicamente. */
  get proximosEventos(): EventoCalendario[] {
    const hojeSemHora = new Date();
    hojeSemHora.setHours(0, 0, 0, 0);
    return this.eventos
      .filter((e) => e.data >= hojeSemHora)
      .sort((a, b) => a.data.getTime() - b.data.getTime())
      .slice(0, 5);
  }

  eventoDataLabel(data: Date): string {
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  /** Para Aluno, o calendário é somente leitura — sem criação de eventos. */
  get exibirBotaoNovoEvento(): boolean {
    return this.authService.getRole() !== 'aluno';
  }

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role as UserRole] : 'Usuário';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role as UserRole] : '#0057A8';
  }
}
