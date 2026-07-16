import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { AVISOS, Aviso, TIPO_AVISO_LABEL, TipoAviso } from '../../config/avisos';

type FiltroTipo = 'todos' | TipoAviso;

type QuemPostou = 'Direção Escolar' | 'Secretaria Escolar' | 'Coordenação Pedagógica';

@Component({
  selector: 'app-avisos',
  standalone: true,
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './avisos.component.html',
  styleUrl: './avisos.component.css',
})
export class AvisosComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);

  readonly tipoLabel = TIPO_AVISO_LABEL;

  readonly filtros: { valor: FiltroTipo; label: string }[] = [
    { valor: 'todos', label: 'Todos os tipos' },
    { valor: 'urgente', label: 'Urgente' },
    { valor: 'informativo', label: 'Informativo' },
    { valor: 'evento', label: 'Evento' },
    { valor: 'atencao', label: 'Atenção' },
  ];

  termoBusca = '';
  filtroAtivo: FiltroTipo = 'todos';

  private readonly avisos = [...AVISOS].sort((a, b) => b.data.getTime() - a.data.getTime());

  // --- Carrossel de avisos em destaque (banner do topo) -------------------

  /** Os avisos mais recentes entram no carrossel do banner (a data mais nova primeiro). */
  get carrosselAvisos(): Aviso[] {
    return this.avisos.slice(0, 5);
  }

  carrosselIndex = 0;
  private autoplayId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.autoplayId = setInterval(() => this.proximoSlideAviso(), 6000);
  }

  ngOnDestroy(): void {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
    }
  }

  irParaSlideAviso(index: number): void {
    this.carrosselIndex = index;
  }

  proximoSlideAviso(): void {
    if (!this.carrosselAvisos.length) return;
    this.carrosselIndex = (this.carrosselIndex + 1) % this.carrosselAvisos.length;
  }

  // --- Modal "Novo Aviso" (Direção / Secretaria / Coordenação) -----------

  readonly opcoesQuemPostou: QuemPostou[] = ['Direção Escolar', 'Secretaria Escolar', 'Coordenação Pedagógica'];

  mostrarModalNovoAviso = false;
  mostrarPopupAvisoPublicado = false;

  novoAviso: { titulo: string; descricao: string; data: string; quemPostou: QuemPostou } = {
    titulo: '',
    descricao: '',
    data: '',
    quemPostou: 'Direção Escolar',
  };

  abrirModalNovoAviso(): void {
    this.novoAviso = { titulo: '', descricao: '', data: '', quemPostou: 'Direção Escolar' };
    this.mostrarModalNovoAviso = true;
  }

  fecharModalNovoAviso(): void {
    this.mostrarModalNovoAviso = false;
  }

  get novoAvisoValido(): boolean {
    return !!this.novoAviso.titulo.trim() && !!this.novoAviso.descricao.trim() && !!this.novoAviso.data.trim();
  }

  publicarAviso(): void {
    if (!this.novoAvisoValido) return;

    const [ano, mes, dia] = this.novoAviso.data.split('-').map(Number);

    const aviso: Aviso = {
      id: `aviso-${Date.now()}`,
      titulo: this.novoAviso.titulo.trim(),
      descricao: this.novoAviso.descricao.trim(),
      data: new Date(ano, mes - 1, dia),
      autor: this.novoAviso.quemPostou,
      tipo: 'informativo',
    };

    // Publica na fonte compartilhada (também usada pelo Calendário) e na lista local desta página.
    AVISOS.unshift(aviso);
    this.avisos.unshift(aviso);
    this.avisos.sort((a, b) => b.data.getTime() - a.data.getTime());

    this.carrosselIndex = 0;
    this.mostrarModalNovoAviso = false;
    this.mostrarPopupAvisoPublicado = true;
    setTimeout(() => (this.mostrarPopupAvisoPublicado = false), 3500);
  }

  fecharPopupAvisoPublicado(): void {
    this.mostrarPopupAvisoPublicado = false;
  }

  get avisosFiltrados() {
    return this.avisos.filter((a) => {
      const combinaFiltro = this.filtroAtivo === 'todos' || a.tipo === this.filtroAtivo;
      const combinaBusca = !this.termoBusca.trim() || a.titulo.toLowerCase().includes(this.termoBusca.trim().toLowerCase());
      return combinaFiltro && combinaBusca;
    });
  }

  dataLabel(data: Date): string {
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  classeTipo(tipo: TipoAviso): string {
    switch (tipo) {
      case 'urgente': return 'badge-pill urgente';
      case 'atencao': return 'badge-pill atencao';
      case 'evento': return 'badge-pill tipo-evento';
      case 'informativo': return 'badge-pill tipo-informativo';
    }
  }

  /** Apenas a Direção pode criar novos avisos. Professores e alunos veem a página como leitura. */
  get exibirBotaoNovoAviso(): boolean {
    return this.authService.getRole() === 'direcao';
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
