import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/environments/environment';
import { Puja, PujaResponse } from '../interfaces/puja';

@Injectable({
  providedIn: 'root'
})
export class PujasService {
  private http = inject(HttpClient);
  baseUrl = enviroment.api
  pujasURL = this.baseUrl + enviroment.pujas
constructor() { }
  getId(id: string): Observable<PujaResponse> {
    return this.http.get<PujaResponse>("http://localhost:3000/api/pujas/" + id)
  }

  create(puja: Puja): Observable<PujaResponse> {
    return this.http.post<PujaResponse>("http://localhost:3000/api/pujas", puja)
  }
}
