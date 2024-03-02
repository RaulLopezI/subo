import { Injectable, computed, inject, signal } from '@angular/core';
import { defer } from 'rxjs';
import { Credentials } from '../interfaces/credentials';
import { HttpClient } from '@angular/common/http';

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

  login(credentials: Credentials) {
    //suponemos que llega lo siguiente 
    let userTest: User = { username: 'user' };



    return defer(() =>
      // De normal seria el resultado del post
      //this.http.post<any>('api/auth/login', credentials)

      // Ejemplo sin post
      new Promise((resolve) => {
        setTimeout(() => {

          // Habría que ver como hacemos el tema de mantener conectado al usuario 
          // y como recepcionamos los datos, de momento actualizaremos aqui el state
          this.state.update((state) => ({
            ...state,
            user: userTest
          }));

          resolve(() => userTest)
        }, 3000)
      })
    );
  }

  logout() {
  }

  createAccount(credentials: Credentials) {
    return defer(() =>
      this.http.post<any>('api/auth/register', credentials)
    );
  }
}
