import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class TasksApiService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = 'https://api.phoenix.com/tasks';

  // Fonctions CRUD basiques qui retournent des Observables bruts
  getAll(): Observable<any[]> {
    return this.#http.get<any[]>(this.#baseUrl);
  }

  getById(id: string | number): Observable<any> {
    return this.#http.get<any>(`${this.#baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.#http.post<any>(this.#baseUrl, data);
  }

  update(id: string | number, data: any): Observable<any> {
    return this.#http.put<any>(`${this.#baseUrl}/${id}`, data);
  }

  delete(id: string | number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/${id}`);
  }
}
