import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  loginService = inject(LoginService);
  router = inject(Router);

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

    this.loginService.login(identifier, senha).subscribe({
      error: (err) => {
        if(err.status === 401) {
          alert("Usuário ou senha incorretos!")
          return;
        }

          alert("Erro no servidor, tente novamente mais tarde!")
      },
      next: () => {
        this.router.navigate(['/home']);
      }
    })
  }
}