import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';

interface DadosPessoais {
  nomeCompleto: string;
  escola: string;
  cargo: string;
  turma: string;
  email: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  endereco: string;
}

type AbaPerfil = 'dados' | 'seguranca';

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [FormsModule, DashboardShellComponent],
  templateUrl: './meu-perfil.component.html',
  styleUrl: './meu-perfil.component.css',
})
export class MeuPerfilComponent {
  private readonly authService = inject(AuthService);

  abaAtiva: AbaPerfil = 'dados';
  modoEdicao = false;
  mensagemSalvo = false;

  readonly dadosOriginais: DadosPessoais = {
    nomeCompleto: this.authService.getNome() ?? 'João Pedro Santos',
    escola: 'Colégio Estadual Modelo da Bahia',
    cargo: this.perfilLabel,
    turma: '3º Ano A',
    email: 'joao.pedro@aluno.ba.gov.br',
    cpf: '444.444.444-05',
    telefone: '(71) 99999-0000',
    dataNascimento: '15/03/2009',
    endereco: 'Rua das Flores, 123 — Barra — Salvador, BA',
  };

  dados: DadosPessoais = { ...this.dadosOriginais };

  senhaAtual = '';
  novaSenha = '';
  confirmarSenha = '';

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role as UserRole] : 'Usuário';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role as UserRole] : '#0f4094';
  }

  get exibirTurma(): boolean {
    return this.authService.getRole() === 'aluno';
  }

  selecionarAba(aba: AbaPerfil): void {
    this.abaAtiva = aba;
  }

  editarPerfil(): void {
    this.modoEdicao = true;
    this.mensagemSalvo = false;
    this.dados = { ...this.dadosOriginais };
  }

  cancelarEdicao(): void {
    this.modoEdicao = false;
    this.dados = { ...this.dadosOriginais };
  }

  salvarAlteracoes(): void {
    this.modoEdicao = false;
    this.dados = { ...this.dadosOriginais };
    this.mensagemSalvo = true;
    setTimeout(() => (this.mensagemSalvo = false), 4000);
  }

  atualizarSenha(): void {
    this.senhaAtual = '';
    this.novaSenha = '';
    this.confirmarSenha = '';
    this.mensagemSalvo = true;
    setTimeout(() => (this.mensagemSalvo = false), 4000);
  }
}
