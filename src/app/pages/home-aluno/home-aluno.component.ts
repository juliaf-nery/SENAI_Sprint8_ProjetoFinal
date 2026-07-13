import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { AuthService } from '../../services/auth.service';

interface DestaqueSlide {
  icon: string;
  gradiente: string;
  categoria: string;
  titulo: string;
  descricao: string;
}

interface NotaDisciplina {
  disciplina: string;
  nota: number;
}

interface PontoEvolucao {
  bimestre: string;
  media: number;
}

@Component({
  selector: 'app-home-aluno',
  imports: [DashboardShellComponent, DashboardCardComponent],
  templateUrl: './home-aluno.component.html',
  styleUrl: './home-aluno.component.css'
})
export class HomeAlunoComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);

  get primeiroNome(): string {
    const nome = this.authService.getNome();
    return nome ? nome.split(' ')[0] : 'Aluno';
  }

  // Mini carrossel de destaques (projetos, eventos e avisos)
  readonly destaques: DestaqueSlide[] = [
    {
      icon: 'bi-mortarboard-fill',
      gradiente: 'gradiente-projeto',
      categoria: 'Projeto',
      titulo: 'Feira de Ciências 2024',
      descricao: 'Projeto de Biologia · Apresentação em 23/07.',
    },
    {
      icon: 'bi-calendar-event-fill',
      gradiente: 'gradiente-evento',
      categoria: 'Evento',
      titulo: 'Semana Cultural',
      descricao: 'De 24 a 28 deste mês, com apresentações, oficinas e exposição de trabalhos dos alunos.',
    },
    {
      icon: 'bi-megaphone-fill',
      gradiente: 'gradiente-aviso',
      categoria: 'Aviso',
      titulo: 'Alteração no calendário de provas',
      descricao: 'A prova de Matemática do 3º ano foi remanejada para a próxima sexta-feira.',
    },
  ];

  currentSlide = 0;
  private autoplayId?: ReturnType<typeof setInterval>;

  // Notas por disciplina (2º bimestre)
  readonly notasPorDisciplina: NotaDisciplina[] = [
    { disciplina: 'Matemática', nota: 8.5 },
    { disciplina: 'Português', nota: 7.8 },
    { disciplina: 'História', nota: 9.0 },
    { disciplina: 'Biologia', nota: 7.0 },
    { disciplina: 'Física', nota: 8.0 },
    { disciplina: 'Química', nota: 6.0 },
  ];

  // Evolução da média geral ao longo dos bimestres
  readonly evolucaoMedias: PontoEvolucao[] = [
    { bimestre: '1º Bim', media: 7.2 },
    { bimestre: '2º Bim', media: 7.8 },
    { bimestre: '3º Bim', media: 8.1 },
  ];

  readonly mediaNotaMinima = 6;
  readonly notaMaxima = 10;

  ngOnInit(): void {
    this.autoplayId = setInterval(() => this.proximoSlide(), 6000);
  }

  ngOnDestroy(): void {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
    }
  }

  irParaSlide(index: number): void {
    this.currentSlide = index;
  }

  proximoSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.destaques.length;
  }

  /** Percentual da barra horizontal (0-10 -> 0-100%) */
  percentualNota(nota: number): number {
    return (nota / this.notaMaxima) * 100;
  }

  /** Pontos do polígono do radar de desempenho (SVG viewBox 0 0 200 200, centro 100,100, raio 80) */
  get radarPoints(): string {
    const centro = 100;
    const raio = 80;
    const total = this.notasPorDisciplina.length;

    return this.notasPorDisciplina
      .map((item, i) => {
        const angulo = (Math.PI * 2 * i) / total - Math.PI / 2;
        const distancia = (item.nota / this.notaMaxima) * raio;
        const x = centro + distancia * Math.cos(angulo);
        const y = centro + distancia * Math.sin(angulo);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }

  /** Posição de cada rótulo de disciplina ao redor do radar */
  radarLabelPos(index: number): { x: number; y: number } {
    const centro = 100;
    const raio = 96;
    const total = this.notasPorDisciplina.length;
    const angulo = (Math.PI * 2 * index) / total - Math.PI / 2;
    return {
      x: centro + raio * Math.cos(angulo),
      y: centro + raio * Math.sin(angulo),
    };
  }

  /** Pontos da linha de evolução das médias (SVG viewBox 0 0 300 140) */
  get evolucaoPoints(): { x: number; y: number; item: PontoEvolucao }[] {
    const largura = 300;
    const altura = 140;
    const margem = 20;
    const total = this.evolucaoMedias.length;

    return this.evolucaoMedias.map((item, i) => {
      const x = total > 1 ? margem + (i * (largura - margem * 2)) / (total - 1) : largura / 2;
      const y = altura - margem - (item.media / this.notaMaxima) * (altura - margem * 2);
      return { x, y, item };
    });
  }

  get evolucaoLinePoints(): string {
    return this.evolucaoPoints.map((p) => `${p.x},${p.y}`).join(' ');
  }
}
