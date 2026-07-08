import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormularioComponent {
  loginService = inject(LoginService);
  router = inject(Router);

  loginForm = new FormGroup({
    nome: new FormControl(''),
    senha: new FormControl('')
  });

  UsuarioLogin() {
    const { nome, senha } = this.loginForm.value;
    
    if (!this.loginForm.valid || !nome || !senha) {
      alert("Por favor, preencha os campos vazios!")
      return;
    }

    this.loginService.login(nome, senha).subscribe({
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