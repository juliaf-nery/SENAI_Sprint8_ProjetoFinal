import { Component, inject } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { FormsModule } from "@angular/forms";

type CategoriaDestaque = 'Turma Destaque' | 'Funcionário Destaque' | 'Professor Destaque' | 'Aluno Destaque';

interface Destaque {
  categoria: CategoriaDestaque;
  nome: string;
  turma?: string;
  motivo: string;
  fotoUrl: string;
  icon: string;
  cor: string;
}

@Component({
  selector: 'app-destaques',
  standalone: true,
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './destaques.component.html',
  styleUrl: './destaques.component.css',
})
export class DestaquesComponent {
  private readonly authService = inject(AuthService);

  readonly destaques: Destaque[] = [
    {
      categoria: 'Turma Destaque',
      nome: '3º Ano A',
      motivo: 'Maior média geral do bimestre e melhor frequência entre as turmas do ensino médio.',
      fotoUrl: '',
      icon: 'bi-people-fill',
      cor: '#0057A8',
    },
    {
      categoria: 'Professor Destaque',
      nome: 'Prof. Mariana Santos',
      turma: 'Língua Portuguesa',
      motivo: 'Reconhecida pelo uso de metodologias ativas e pelo alto índice de aprovação da turma.',
      fotoUrl: '/img/ms.png',
      icon: 'bi-person-workspace',
      cor: '#2E7D32',
    },
    {
      categoria: 'Funcionário Destaque',
      nome: 'Sônia Ramos',
      motivo: 'Dedicação exemplar na secretaria escolar e atendimento acolhedor às famílias.',
      fotoUrl: '/img/fnc.png',
      icon: 'bi-briefcase-fill',
      cor: '#6b21a8',
    },
    {
      categoria: 'Aluno Destaque',
      nome: 'Ana Beatriz Souza',
      turma: '3º Ano A · Biologia',
      motivo: 'Melhor média em Biologia no bimestre, com destaque em projetos de iniciação científica.',
      fotoUrl: '/img/alu-dest.png',
      icon: 'bi-mortarboard-fill',
      cor: '#F9A825',
    },
    {
      categoria: 'Aluno Destaque',
      nome: 'Lucas Andrade',
      turma: '3º Ano A · Matemática',
      motivo: 'Melhor média em Matemática no bimestre e participação em olimpíadas de exatas.',
      fotoUrl: '/img/alu-dest2.png',
      icon: 'bi-mortarboard-fill',
      cor: '#F9A825',
    },
  ];

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role as UserRole] : 'Usuário';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role as UserRole] : '#0057A8';
  }
}
