import { Component } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-home-admin',
  imports: [DashboardShellComponent, DashboardCardComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  // Indicadores estaduais (mock)
  readonly indicadoresGraficoAlunos = [
    { label: '2022', valor: 165 },
    { label: '2023', valor: 172 },
    { label: '2024', valor: 179 },
    { label: '2025', valor: 184 },
    { label: '2026', valor: 190 },
  ];

  readonly maiorValor = Math.max(...this.indicadoresGraficoAlunos.map((i) => i.valor));

  alturaBarra(valor: number): number {
    return Math.round((valor / this.maiorValor) * 100);
  }
}
