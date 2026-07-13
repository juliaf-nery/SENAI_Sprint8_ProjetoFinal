import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

/* Representa um card de acesso rápido para demonstração. */
interface DemoAccount {
  role: string;
  description: string;
  identifier: string;
  senha: string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'app-login-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormularioComponent {
  // CARROSSEL DE IMAGENS
images: string[] = [
    'https://www.consed.org.br/storage/news/ocnqewu8vphch89tjzvsyr2702afu9.jpeg',
    'https://bahiaeconomica.com.br/wp/wp-content/uploads/2026/01/Rede-estadual-da-Bahia-inicia-matriculas-para-o-an0137569500202601120733-ScaleDownProportional-768x512.webp',
    'https://cdn.atarde.com.br/img/Artigo-Destaque/1260000/Estudantes-do-Ensino-Medio-da-rede-estadual-recebe0126280200202403181321.jpg?xid=6149565'
  ];

  currentImageIndex: number = 0;

  nextImage(): void {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.images.length - 1;
    }
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
  }

  // LOGIN

  authService = inject(AuthService);

  loginForm = new FormGroup({
    identifier: new FormControl(''),
    senha: new FormControl('')
  });

  UsuarioLogin() {
    const { identifier, senha } = this.loginForm.value;
    
    if (!this.loginForm.valid || !identifier || !senha) {
      alert("Por favor, preencha os campos vazios!")
      return;
    }

    this.authService.login(identifier, senha).subscribe({
      error: (err) => {
        if(err.status === 401) {
          alert("Usuário ou senha incorretos!")
          return;
        }

          alert("Erro no servidor, tente novamente mais tarde!")
      },
      next: (response) => {
        this.authService.redirectToHomeByRole(response.user.role);
      }
    })
  }

  // PREENCHIMENTO AUTOMÁTICO (ACESSOS PARA DEMONSTRAÇÃO)

  readonly demoAccounts: DemoAccount[] = [
    {
      role: 'Administrador Estadual',
      description: 'Secretaria Estadual',
      identifier: '2026109482',
      senha: 'admin123',
      icon: 'bi-bank',
      colorClass: 'color-1',
    },
    {
      role: 'Direção Escolar',
      description: 'Colégio Estadual...',
      identifier: '20260759312',
      senha: 'direcao123',
      icon: 'bi-building',
      colorClass: 'color-2',
    },
    {
      role: 'Professor',
      description: 'Colégio Estadual...',
      identifier: '2026091112',
      senha: 'professor123',
      icon: 'bi-journal-bookmark-fill',
      colorClass: 'color-3',
    },
    {
      role: 'Aluno',
      description: 'Colégio Estadual...',
      identifier: '2026106379',
      senha: 'aluno123',
      icon: 'bi-mortarboard-fill',
      colorClass: 'color-4',
    },
    {
      role: 'Responsável',
      description: 'Resp. por João Po...',
      identifier: '111111',
      senha: 'responsavel123',
      icon: 'bi-people-fill',
      colorClass: 'color-5',
    },
  ];

  preencherCampos(conta: DemoAccount): void {
    this.loginForm.patchValue({
      identifier: conta.identifier,
      senha: conta.senha,
    });
  }
}