import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';

interface Categoria {
  label: string;
  icon: string;
}

type StatusManifestacao = 'recebido' | 'analise' | 'respondido' | 'concluido';

interface EtapaManifestacao {
  status: StatusManifestacao;
  label: string;
  data?: string;
  concluida: boolean;
}

interface RespostaEscola {
  texto: string;
  autor: string;
  data: string;
}

interface Manifestacao {
  protocolo: string;
  titulo: string;
  categorias: string[];
  descricao: string;
  data: string;
  statusAtual: StatusManifestacao;
  etapas: EtapaManifestacao[];
  resposta?: RespostaEscola;
}

@Component({
  selector: 'app-ouvidoria',
  standalone: true,
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './ouvidoria.component.html',
  styleUrl: './ouvidoria.component.css',
})
export class OuvidoriaComponent {
  private readonly authService = inject(AuthService);

  abaAtiva: 'nova' | 'minhas' = 'nova';

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

  private proximoProtocolo = 902;

  readonly manifestacoes: Manifestacao[] = [
    {
      protocolo: '#2026-0842',
      titulo: 'Lâmpada queimada na sala 12',
      categorias: ['Infraestrutura'],
      descricao: 'A lâmpada do fundo da sala 12 está queimada há alguns dias, dificultando a leitura durante as aulas da tarde. Poderiam trocar assim que possível?',
      data: '05/07/2026',
      statusAtual: 'concluido',
      etapas: [
        { status: 'recebido', label: 'Recebido', data: '05/07/2026 08:30', concluida: true },
        { status: 'analise', label: 'Em análise', data: '05/07/2026 14:00', concluida: true },
        { status: 'respondido', label: 'Respondido', data: '06/07/2026 10:00', concluida: true },
        { status: 'concluido', label: 'Concluído', data: '07/07/2026 09:00', concluida: true },
      ],
      resposta: {
        texto: 'Obrigado pelo aviso! A manutenção já trocou a lâmpada da sala 12 no dia 07/07. Qualquer novo problema, é só nos avisar por aqui.',
        autor: 'Setor de Manutenção',
        data: '07/07/2026 09:00',
      },
    },
    {
      protocolo: '#2026-0901',
      titulo: 'Sugestão de atividade extracurricular',
      categorias: ['Sugestão', 'Ensino'],
      descricao: 'Seria muito bacana se a escola oferecesse uma oficina de robótica no contraturno. Vários colegas da minha turma teriam interesse em participar.',
      data: '08/07/2026',
      statusAtual: 'analise',
      etapas: [
        { status: 'recebido', label: 'Recebido', data: '08/07/2026 16:00', concluida: true },
        { status: 'analise', label: 'Em análise', data: '09/07/2026 09:00', concluida: true },
        { status: 'respondido', label: 'Respondido', concluida: false },
        { status: 'concluido', label: 'Concluído', concluida: false },
      ],
    },
  ];

  irParaAba(aba: 'nova' | 'minhas'): void {
    this.abaAtiva = aba;
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

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');

    this.manifestacoes.unshift({
      protocolo: `#2026-0${this.proximoProtocolo++}`,
      titulo: this.titulo.trim(),
      categorias: [...this.categoriasSelecionadas],
      descricao: this.descricao.trim(),
      data: dataFormatada,
      statusAtual: 'recebido',
      etapas: [
        { status: 'recebido', label: 'Recebido', data: `${dataFormatada} ${agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`, concluida: true },
        { status: 'analise', label: 'Em análise', concluida: false },
        { status: 'respondido', label: 'Respondido', concluida: false },
        { status: 'concluido', label: 'Concluído', concluida: false },
      ],
    });

    this.mostrarPopupEnviado = true;
    this.categoriasSelecionadas = [];
    this.titulo = '';
    this.descricao = '';
  }

  fecharPopup(): void {
    this.mostrarPopupEnviado = false;
  }

  abrirDetalhe(manifestacao: Manifestacao): void {
    this.manifestacaoSelecionada = manifestacao;
  }

  fecharDetalhe(): void {
    this.manifestacaoSelecionada = null;
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

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role as UserRole] : 'Usuário';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role as UserRole] : '#0057A8';
  }
}
