import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../pages/types/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);

  login(identifier: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("http://localhost:3001/login", { identifier, senha })
      .pipe(
        tap(
          (response) => {
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("nome", response.user.nome);
            sessionStorage.setItem("role", response.user.role);
          }
        )
      )
   }
}
