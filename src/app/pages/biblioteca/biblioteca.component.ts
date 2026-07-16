import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';

type TipoMaterial = 'livro' | 'video' | 'pdf';

interface MaterialBiblioteca {
  id: string;
  titulo: string;
  professor: string;
  disciplina: string;
  tipo: TipoMaterial;
  tamanhoOuDuracao: string;
  icon: string;
}

const TIPO_LABEL: Record<TipoMaterial, string> = {
  livro: 'Livro',
  video: 'Vídeo',
  pdf: 'PDF',
};

const ICONE_POR_TIPO: Record<TipoMaterial, string> = {
  livro: 'bi-book-half',
  video: 'bi-camera-video-fill',
  pdf: 'bi-file-earmark-text-fill',
};

interface NovoMaterialForm {
  titulo: string;
  tipo: TipoMaterial;
  professor: string;
  disciplina: string;
}

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css',
})
export class BibliotecaComponent {
  private readonly authService = inject(AuthService);

  readonly tipoLabel = TIPO_LABEL;
  readonly disciplinas = ['Todos', 'Matemática', 'Português', 'História', 'Biologia', 'Física', 'Química', 'Geografia', 'Inglês'];
  /** Disciplinas selecionáveis ao cadastrar um material novo (sem a opção "Todos"). */
  readonly disciplinasCadastro = this.disciplinas.slice(1);

  disciplinaAtiva = 'Todos';
  termoBusca = '';
  mostrarModalEmBreve = false;

  private proximoId = 100;

  materiais: MaterialBiblioteca[] = [
    { id: 'm1', titulo: 'Fundamentos de Matemática — Volume 1', professor: 'Prof. Mariana Santos', disciplina: 'Matemática', tipo: 'livro', tamanhoOuDuracao: '12 MB', icon: 'bi-book-half' },
    { id: 'm2', titulo: 'Gramática Completa da Língua Portuguesa', professor: 'Profa. Carina Lima', disciplina: 'Português', tipo: 'livro', tamanhoOuDuracao: '10 MB', icon: 'bi-book-half' },
    { id: 'm3', titulo: 'Aula: Equações do 2º Grau', professor: 'Prof. Mariana Santos', disciplina: 'Matemática', tipo: 'video', tamanhoOuDuracao: '45 min', icon: 'bi-camera-video-fill' },
    { id: 'm4', titulo: 'História do Brasil — Slides', professor: 'Prof. José Costa', disciplina: 'História', tipo: 'video', tamanhoOuDuracao: '40 min', icon: 'bi-easel2-fill' },
    { id: 'm5', titulo: 'Biologia Celular — Apostila', professor: 'Prof. Rebeca Nunes', disciplina: 'Biologia', tipo: 'pdf', tamanhoOuDuracao: '8 MB', icon: 'bi-file-earmark-text-fill' },
    { id: 'm6', titulo: 'Física Experimental — Vídeos', professor: 'Profa. Juliana Ferreira', disciplina: 'Física', tipo: 'video', tamanhoOuDuracao: '55 min', icon: 'bi-camera-video-fill' },
    { id: 'm7', titulo: 'Química Orgânica — Apostila', professor: 'Prof. Pedro Alves', disciplina: 'Química', tipo: 'pdf', tamanhoOuDuracao: '9 MB', icon: 'bi-file-earmark-text-fill' },
    { id: 'm8', titulo: 'Geografia do Brasil — Slides', professor: 'Profa. Ilana Mendes', disciplina: 'Geografia', tipo: 'video', tamanhoOuDuracao: '38 min', icon: 'bi-easel2-fill' },
    { id: 'm9', titulo: 'Inglês Básico — Videoaulas', professor: 'Prof. Marcos Dias', disciplina: 'Inglês', tipo: 'video', tamanhoOuDuracao: '60 min', icon: 'bi-camera-video-fill' },
  ];

  get materiaisFiltrados(): MaterialBiblioteca[] {
    return this.materiais.filter((m) => {
      const combinaDisciplina = this.disciplinaAtiva === 'Todos' || m.disciplina === this.disciplinaAtiva;
      const combinaBusca = !this.termoBusca.trim() || m.titulo.toLowerCase().includes(this.termoBusca.trim().toLowerCase());
      return combinaDisciplina && combinaBusca;
    });
  }

  selecionarDisciplina(disciplina: string): void {
    this.disciplinaAtiva = disciplina;
  }

  abrirMaterial(): void {
    this.mostrarModalEmBreve = true;
  }

  fecharModal(): void {
    this.mostrarModalEmBreve = false;
  }

  get perfilLabel(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_LABEL[role as UserRole] : 'Usuário';
  }

  get corTema(): string {
    const role = this.authService.getRole();
    return role ? PERFIL_COR[role as UserRole] : '#0057A8';
  }

  /** Apenas a direção da escola pode adicionar ou excluir arquivos da biblioteca. */
  get podeGerenciarBiblioteca(): boolean {
    return this.authService.getRole() === 'direcao';
  }

  // --- Adicionar / excluir arquivo (somente Direção) ---------------------

  modalAdicionarAberto = false;
  novoMaterial: NovoMaterialForm = this.materialEmBranco();

  private materialEmBranco(): NovoMaterialForm {
    return { titulo: '', tipo: 'livro', professor: '', disciplina: this.disciplinasCadastro[0] };
  }

  abrirModalAdicionar(): void {
    if (!this.podeGerenciarBiblioteca) return;
    this.novoMaterial = this.materialEmBranco();
    this.modalAdicionarAberto = true;
  }

  fecharModalAdicionar(): void {
    this.modalAdicionarAberto = false;
  }

  adicionarMaterial(): void {
    if (!this.podeGerenciarBiblioteca || !this.novoMaterial.titulo.trim() || !this.novoMaterial.professor.trim()) return;

    this.materiais.unshift({
      id: `novo-${this.proximoId++}`,
      titulo: this.novoMaterial.titulo.trim(),
      professor: this.novoMaterial.professor.trim(),
      disciplina: this.novoMaterial.disciplina,
      tipo: this.novoMaterial.tipo,
      tamanhoOuDuracao: '—',
      icon: ICONE_POR_TIPO[this.novoMaterial.tipo],
    });

    this.modalAdicionarAberto = false;
  }

  removerMaterial(material: MaterialBiblioteca, evento: Event): void {
    evento.stopPropagation();
    if (!this.podeGerenciarBiblioteca) return;
    this.materiais = this.materiais.filter((m) => m.id !== material.id);
  }
}
