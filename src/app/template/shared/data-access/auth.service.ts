
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { enviroment } from 'src/environments/environment';

export type AuthUser = User | null | undefined;
interface User {
  username: string;
}

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // state
  private state = signal<AuthState>({
    user: undefined,
  });

  // selector
  user = computed(() => this.state().user);

  baseUrl = enviroment.api
  loginURL = this.baseUrl + enviroment.login
  registroURL = this.baseUrl + enviroment.usuario

  constructor() {

  }

  login(formData: any):Observable<any> {
    return this.http.post<any>("http://localhost:3000/api/login", formData).pipe(
      tap(res => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('idUser', res.id)
      })
    )
  }
  registro(formData: any):Observable<any>{
    return this.http.post<any>("http://localhost:3000/api/usuarios", formData).pipe(
      tap(res => {
        localStorage.setItem('token', res.token)
      })
    )
  }
}
