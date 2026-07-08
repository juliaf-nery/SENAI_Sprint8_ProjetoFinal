import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserInfo } from '../pages/types/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);

  login(nome: string, senha: string): Observable<UserInfo> {
    return this.http.post<UserInfo>("http://localhost:3001/login", { nome, senha })
      .pipe(
        tap(
          (user) => {
            sessionStorage.setItem("nome", user.nome)
          }
        )
      )
   }
}
