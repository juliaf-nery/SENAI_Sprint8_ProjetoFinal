import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';
import { Manifestacao, OuvidoriaService, RemetenteManifestacao, StatusManifestacao } from '../../services/ouvidoria.service';

interface Categoria {
  label: string;
  icon: string;
}

type AbaEnvio = 'nova' | 'minhas';
type AbaGestao = 'recebidas' | 'respondidas';

@Component({
  selector: 'app-ouvidoria',
  standalone: true,
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './ouvidoria.component.html',
  styleUrl: './ouvidoria.component.css',
})
export class OuvidoriaComponent {
  private readonly authService = inject(AuthService);
  private readonly ouvidoriaService = inject(OuvidoriaService);

  /**
   * Direção Escolar (e Administrador, por ter o mesmo papel de gestão) não enviam
   * manifestações: eles recebem e respondem as de alunos e professores. Por isso a
   * página muda de "Nova/Minhas Manifestações" para "Recebidas/Respondidas".
   */
  get ehGestao(): boolean {
    const role = this.authService.getRole();
    return role === 'direcao' || role === 'administrador';
  }

  private get remetenteAtual(): RemetenteManifestacao {
    return this.authService.getRole() === 'professor' ? 'professor' : 'aluno';
  }

  abaAtiva: AbaEnvio | AbaGestao = 'nova';

  constructor() {
    this.abaAtiva = this.ehGestao ? 'recebidas' : 'nova';
  }

  irParaAba(aba: AbaEnvio | AbaGestao): void {
    this.abaAtiva = aba;
  }

  readonly categorias: Categoria[] = [
    { label: 'Infraestrutura', icon: 'bi-tools' },
    { label: 'Ensino', icon: 'bi-mortarboard' },
    { label: 'Segurança', icon: 'bi-shield-check' },
    { label: 'Bullying', icon: 'bi-exclamation-triangle' },
    { label: 'Merenda', icon: 'bi-cup-hot' },
    { label: 'Gestão', icon: 'bi-clipboard-data' },
    { label: 'Sugestão', icon: 'bi-lightbulb' },
    { label: 'Elogio', icon: 'bi-hand-thumbs-up' },
    { label: 'Reclamação', icon: 'bi-chat-square-dots' },
  ];

  categoriasSelecionadas: string[] = [];
  titulo = '';
  descricao = '';
  mostrarPopupEnviado = false;

  manifestacaoSelecionada: Manifestacao | null = null;

  // --- Visão Aluno/Professor: enviar e acompanhar "Minhas Manifestações" --

  /** "Minhas Manifestações" do perfil logado (aluno/responsável ou professor). */
  get manifestacoes(): Manifestacao[] {
    return this.ouvidoriaService.obterPorRemetente(this.remetenteAtual);
  }

  alternarCategoria(categoria: string): void {
    const indice = this.categoriasSelecionadas.indexOf(categoria);
    if (indice >= 0) {
      this.categoriasSelecionadas.splice(indice, 1);
    } else {
      this.categoriasSelecionadas.push(categoria);
    }
  }

  categoriaEstaSelecionada(categoria: string): boolean {
    return this.categoriasSelecionadas.includes(categoria);
  }

  get formularioValido(): boolean {
    return this.categoriasSelecionadas.length > 0 && this.titulo.trim().length > 0 && this.descricao.trim().length > 0;
  }

  enviarManifestacao(): void {
    if (!this.formularioValido) return;

    this.ouvidoriaService.registrarManifestacao(this.remetenteAtual, {
      titulo: this.titulo.trim(),
      categorias: [...this.categoriasSelecionadas],
      descricao: this.descricao.trim(),
    });

    this.mostrarPopupEnviado = true;
    this.categoriasSelecionadas = [];
    this.titulo = '';
    this.descricao = '';
  }

  fecharPopup(): void {
    this.mostrarPopupEnviado = false;
  }

  // --- Visão Direção/Administrador: receber e responder ------------------

  /** Manifestações aguardando resposta (aba "Manifestações Recebidas"). */
  get manifestacoesRecebidas(): Manifestacao[] {
    return this.ouvidoriaService.obterRecebidas();
  }

  /** Manifestações já respondidas (aba "Manifestações Respondidas") — as mesmas que aparecem como respondidas para quem enviou. */
  get manifestacoesRespondidas(): Manifestacao[] {
    return this.ouvidoriaService.obterRespondidas();
  }

  textoResposta = '';
  mostrarPopupRespondido = false;

  /** Só é possível responder pela tela de gestão, e apenas manifestações que ainda não têm resposta. */
  get podeResponder(): boolean {
    return this.ehGestao && !!this.manifestacaoSelecionada && !this.manifestacaoSelecionada.resposta;
  }

  enviarResposta(): void {
    if (!this.podeResponder || !this.manifestacaoSelecionada || !this.textoResposta.trim()) return;

    this.ouvidoriaService.responder(this.manifestacaoSelecionada.protocolo, this.textoResposta.trim(), this.perfilLabel);

    this.textoResposta = '';
    this.mostrarPopupRespondido = true;
    setTimeout(() => (this.mostrarPopupRespondido = false), 3500);
  }

  fecharPopupRespondido(): void {
    this.mostrarPopupRespondido = false;
  }

  // --- Card de detalhe (compartilhado pelas duas visões) ------------------

  abrirDetalhe(manifestacao: Manifestacao): void {
    this.manifestacaoSelecionada = manifestacao;
    this.textoResposta = '';
  }

  fecharDetalhe(): void {
    this.manifestacaoSelecionada = null;
    this.textoResposta = '';
  }

  statusLabelBadge(status: StatusManifestacao): string {
    switch (status) {
      case 'concluido': return 'Concluído';
      case 'analise': return 'Em Análise';
      case 'respondido': return 'Respondido';
      case 'recebido': return 'Recebido';
    }
  }

  classeStatus(status: StatusManifestacao): string {
    switch (status) {
      case 'concluido': return 'badge-pill status-concluido';
      case 'analise': return 'badge-pill atencao';
      case 'respondido': return 'badge-pill status-respondido';
      case 'recebido': return 'badge-pill status-recebido';
    }
  }

  remetenteLabel(remetente: RemetenteManifestacao): string {
    return remetente === 'professor' ? 'Professor' : 'Aluno';
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
