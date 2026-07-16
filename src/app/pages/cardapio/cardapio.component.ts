import { Component, inject } from '@angular/core';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { CommonModule } from '@angular/common';

interface Refeicao {
  nome: string;
  horario: string;
  itens: string;
  icon: string;
}

interface CardapioDia {
  dia: string;
  refeicoes: Refeicao[];
}

interface LinhaTabelaCardapio {
  nome: string;
  horario: string;
  icon: string;
  itensPorDia: string[];
}

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [DashboardShellComponent, CommonModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css',
})
export class CardapioComponent {
  private readonly authService = inject(AuthService);

  readonly cardapioSemana: CardapioDia[] = [
    {
      dia: 'Segunda',
      refeicoes: [
        { nome: 'Café da Manhã', horario: '07:30', itens: 'Mingau de Aveia com Frutas', icon: 'bi-cup-hot-fill' },
        { nome: 'Lanche da Tarde', horario: '15:50', itens: 'Iogurte Natural com Granola', icon: 'bi-cookie' },
      ],
    },
    {
      dia: 'Terça',
      refeicoes: [
        { nome: 'Café da Manhã', horario: '07:30', itens: 'Pão Integral com Queijo e Suco de Laranja', icon: 'bi-cup-hot-fill' },
        { nome: 'Lanche da Tarde', horario: '15:50', itens: 'Banana com Aveia', icon: 'bi-cookie' },
      ],
    },
    {
      dia: 'Quarta',
      refeicoes: [
        { nome: 'Café da Manhã', horario: '07:30', itens: 'Tapioca com Coco e Vitamina de Frutas', icon: 'bi-cup-hot-fill' },
        { nome: 'Lanche da Tarde', horario: '15:50', itens: 'Bolo Caseiro de Cenoura', icon: 'bi-cookie' },
      ],
    },
    {
      dia: 'Quinta',
      refeicoes: [
        { nome: 'Café da Manhã', horario: '07:30', itens: 'Cuscuz com Ovos e Suco de Melancia', icon: 'bi-cup-hot-fill' },
        { nome: 'Lanche da Tarde', horario: '15:50', itens: 'Sanduíche Natural', icon: 'bi-cookie' },
      ],
    },
    {
      dia: 'Sexta',
      refeicoes: [
        { nome: 'Café da Manhã', horario: '07:30', itens: 'Panqueca de Banana e Suco de Abacaxi', icon: 'bi-cup-hot-fill' },
        { nome: 'Lanche da Tarde', horario: '15:50', itens: 'Gelatina com Frutas', icon: 'bi-cookie' },
      ],
    },
  ];

  readonly diasSemana: string[] = this.cardapioSemana.map((d) => d.dia);

  get linhasTabela(): LinhaTabelaCardapio[] {
    const referencia = this.cardapioSemana[0].refeicoes;

    return referencia.map((refeicaoReferencia, indice) => ({
      nome: refeicaoReferencia.nome,
      horario: refeicaoReferencia.horario,
      icon: refeicaoReferencia.icon,
      itensPorDia: this.cardapioSemana.map((dia) => dia.refeicoes[indice]?.itens ?? '—'),
    }));
  }

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role as UserRole] : 'Usuário';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role as UserRole] : '#0057A8';
  }

  editarCardapio(dia: string) {
  console.log('Editando cardápio do dia:', dia);
  // Aqui você abre o seu modal ou ativa o modo de edição para o dia selecionado
}

}
