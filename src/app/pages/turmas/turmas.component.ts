import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { TURMAS } from '../../config/turmas';
import { PastasAtividadesService, PastaTurma } from '../../services/pastas-atividades.service';

interface EditarPastaForm {
  titulo: string;
  descricao: string;
  capaCor: string;
}

@Component({
  selector: 'app-turmas',
  standalone: true,
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './turmas.component.html',
  styleUrl: './turmas.component.css',
})
export class TurmasComponent {
  private readonly authService = inject(AuthService);
  private readonly pastasService = inject(PastasAtividadesService);

  readonly pastas: PastaTurma[] = this.pastasService.pastas;
  pastaSelecionadaId: string | null = null;

  get pastaSelecionada(): PastaTurma | undefined {
    return this.pastaSelecionadaId ? this.pastasService.obterPastaPorId(this.pastaSelecionadaId) : undefined;
  }

  /** Quantidade de alunos matriculados na turma da pasta (config/turmas.ts). */
  totalAlunos(turma: string): number {
    return TURMAS.find((t) => t.nome === turma)?.alunos.length ?? 0;
  }

  abrirPasta(id: string): void {
    this.pastaSelecionadaId = id;
  }

  fecharPasta(): void {
    this.pastaSelecionadaId = null;
  }

  get podeEditarPasta(): boolean {
    return this.pastasService.podeEditarPasta(this.authService.getRole());
  }

  // --- Modal: Editar pasta (professor/direção são administradores) -------

  modalEditarPastaAberto = false;
  editarPastaForm: EditarPastaForm = { titulo: '', descricao: '', capaCor: 'azul' };
  readonly coresCapaDisponiveis = ['azul', 'verde', 'laranja', 'roxo'];

  abrirModalEditarPasta(): void {
    if (!this.podeEditarPasta || !this.pastaSelecionada) return;
    this.editarPastaForm = {
      titulo: this.pastaSelecionada.titulo,
      descricao: this.pastaSelecionada.descricao,
      capaCor: this.pastaSelecionada.capaCor,
    };
    this.modalEditarPastaAberto = true;
  }

  fecharModalEditarPasta(): void {
    this.modalEditarPastaAberto = false;
  }

  salvarPasta(): void {
    if (!this.pastaSelecionada) return;
    this.pastasService.atualizarPasta(this.pastaSelecionada.id, this.editarPastaForm);
    this.modalEditarPastaAberto = false;
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
