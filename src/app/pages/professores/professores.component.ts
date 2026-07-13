import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardShellComponent } from '../../components/dashboard-shell/dashboard-shell.component';
import { AuthService } from '../../services/auth.service';
import { PERFIL_COR, PERFIL_LABEL } from '../../config/perfil';
import { UserRole } from '../types/user';

interface Professor {
  nome: string;
  disciplina: string;
  email: string;
  telefone: string;
  fotoUrl: string;
  bio: string;
  turmas: number;
  anosExperiencia: number;
}

interface GrupoDisciplina {
  disciplina: string;
  professores: Professor[];
}

@Component({
  selector: 'app-professores',
  standalone: true,
  imports: [DashboardShellComponent, FormsModule],
  templateUrl: './professores.component.html',
  styleUrl: './professores.component.css',
})
export class ProfessoresComponent {
  private readonly authService = inject(AuthService);

  termoBusca = '';

  /** E-mails dos professores com o card de contato expandido. */
  private readonly contatosAbertos = new Set<string>();

  readonly professores: Professor[] = [
    { nome: 'Joana Ribeira', disciplina: 'Biologia', email: 'joana.ribeira@escola.ba.gov.br', telefone: '(71) 98888-1001', fotoUrl: '/img/jr.png', bio: 'Bióloga apaixonada por despertar a curiosidade científica dos alunos.', turmas: 4, anosExperiencia: 9 },
    { nome: 'Roberto Alves', disciplina: 'Biologia', email: 'roberto.alves@escola.ba.gov.br', telefone: '(71) 98888-1002', fotoUrl: '', bio: 'Focado em aulas práticas de laboratório e projetos de campo.', turmas: 3, anosExperiencia: 12 },

    { nome: 'Juliana Ferreira', disciplina: 'Física', email: 'juliana.ferreira@escola.ba.gov.br', telefone: '(71) 98888-1003', fotoUrl: '/img/jf.png', bio: 'Torna a Física experimental acessível e divertida em sala.', turmas: 5, anosExperiencia: 7 },
    { nome: 'Pedro Souza', disciplina: 'Física', email: 'pedro.souza@escola.ba.gov.br', telefone: '(71) 98888-1006', fotoUrl: '/img/ps.png', bio: 'Especialista em preparar turmas para olimpíadas de exatas.', turmas: 4, anosExperiencia: 15 },

    { nome: 'Carlos Lima', disciplina: 'Língua Portuguesa', email: 'carlos.lima@escola.ba.gov.br', telefone: '(71) 98888-1004', fotoUrl: '', bio: 'Incentiva a leitura crítica e a produção textual autoral.', turmas: 6, anosExperiencia: 11 },
    { nome: 'Mariana Santos', disciplina: 'Língua Portuguesa', email: 'mariana.santos@escola.ba.gov.br', telefone: '(71) 98888-1005', fotoUrl: '/img/ms.png', bio: 'Professora dedicada ao ensino de Língua Portuguesa.', turmas: 5, anosExperiencia: 8 },
  ];

  get gruposFiltrados(): GrupoDisciplina[] {
    const termo = this.termoBusca.trim().toLowerCase();

    const filtrados = this.professores.filter(
      (p) =>
        !termo ||
        p.nome.toLowerCase().includes(termo) ||
        p.disciplina.toLowerCase().includes(termo)
    );

    const mapa = new Map<string, Professor[]>();
    for (const professor of filtrados) {
      const lista = mapa.get(professor.disciplina) ?? [];
      lista.push(professor);
      mapa.set(professor.disciplina, lista);
    }

    return Array.from(mapa.entries())
      .map(([disciplina, professores]) => ({
        disciplina,
        professores: professores.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')),
      }))
      .sort((a, b) => a.disciplina.localeCompare(b.disciplina, 'pt-BR'));
  }

  get totalProfessores(): number {
    return this.professores.length;
  }

  iniciais(nome: string): string {
    const partes = nome.trim().split(' ');
    const primeira = partes[0]?.[0] ?? '';
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
    return (primeira + ultima).toUpperCase();
  }

  contatoAberto(professor: Professor): boolean {
    return this.contatosAbertos.has(professor.email);
  }

  alternarContato(professor: Professor): void {
    if (this.contatosAbertos.has(professor.email)) {
      this.contatosAbertos.delete(professor.email);
    } else {
      this.contatosAbertos.add(professor.email);
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
