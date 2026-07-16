import { Component } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-home-responsavel',
  imports: [DashboardShellComponent, DashboardCardComponent],
  templateUrl: './home-responsavel.component.html',
  styleUrl: './home-responsavel.component.css'
})
export class HomeResponsavelComponent {}
