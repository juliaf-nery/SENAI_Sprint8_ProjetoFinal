import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type DashboardCardCor =
  | 'azul'
  | 'azul-escuro'
  | 'verde'
  | 'amarelo'
  | 'vermelho';

/**
 * Card reutilizável dos dashboards.
 * - Se `valor` for informado, exibe em formato de indicador (KPI).
 * - Caso contrário, funciona como card de atalho/navegação.
 * - Se `route` for informado, o card inteiro se torna clicável e navega até a rota.
 */
@Component({
  selector: 'app-dashboard-card',
  imports: [RouterLink],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent {
  @Input() icon = 'bi-grid';
  @Input() titulo = '';
  @Input() descricao = '';
  @Input() valor?: string | number;
  @Input() cor: DashboardCardCor = 'azul';
  /** Rota de destino ao clicar no card. Se ausente, o card não navega. */
  @Input() route?: string;
}
