import { Component } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-home-direcao',
  imports: [DashboardShellComponent, DashboardCardComponent],
  templateUrl: './home-direcao.component.html',
  styleUrl: './home-direcao.component.css'
})
export class HomeDirecaoComponent {
  // Frequência média mensal da escola (mock, para o gráfico de indicadores)
  readonly frequenciaMensal = [
    { label: 'Mar', valor: 93 },
    { label: 'Abr', valor: 91 },
    { label: 'Mai', valor: 94 },
    { label: 'Jun', valor: 90 },
    { label: 'Jul', valor: 95 },
  ];

  readonly maiorValor = 100;

  alturaBarra(valor: number): number {
    return Math.round((valor / this.maiorValor) * 100);
  }
}
