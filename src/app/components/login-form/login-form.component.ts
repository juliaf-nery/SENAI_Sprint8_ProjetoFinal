import { Component, inject, OnInit, OnDestroy } from '@angular/core';
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
export class LoginFormularioComponent implements OnInit, OnDestroy {
  // CARROSSEL DE IMAGENS
images: string[] = [
    '/img/colegio1.png',
    '/img/colegio3.png',
    '/img/colegio4.png'
  ];

  currentImageIndex: number = 0;

  // Troca automática das imagens do carrossel
  private readonly autoPlayIntervalMs = 5000;
  private autoPlayTimer: ReturnType<typeof setInterval> | undefined;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => this.nextImage(), this.autoPlayIntervalMs);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
    this.startAutoPlay();
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.images.length - 1;
    }
    this.startAutoPlay();
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
    this.startAutoPlay();
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
      role: 'Direção Escolar',
      description: 'Colégio Estadual...',
      identifier: '20260759312',
      senha: 'direcao123',
      icon: 'bi-building',
      colorClass: 'color-21',
    },
    {
      role: 'Professor',
      description: 'Colégio Estadual...',
      identifier: '2026091112',
      senha: 'professor123',
      icon: 'bi-journal-bookmark-fill',
      colorClass: 'color-2',
    },
    {
      role: 'Aluno',
      description: 'Colégio Estadual...',
      identifier: '2026106379',
      senha: 'aluno123',
      icon: 'bi-mortarboard-fill',
      colorClass: 'color-3',
    },
    {
      role: 'Responsável',
      description: 'Resp. por João Po...',
      identifier: '111111',
      senha: 'responsavel123',
      icon: 'bi-people-fill',
      colorClass: 'color-4',
    },
  ];

  preencherCampos(conta: DemoAccount): void {
    this.loginForm.patchValue({
      identifier: conta.identifier,
      senha: conta.senha,
    });
  }
}