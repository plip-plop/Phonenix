import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Task } from '../core/task.model';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Configurer le projet',
    description: 'Initialiser le repo et les dépendances',
    status: 'DONE',
  },
  {
    id: '2',
    title: 'Créer le service de state',
    description: 'Utiliser les Signals',
    status: 'IN_PROGRESS',
  },
  {
    id: '3',
    title: 'Développer le composant liste',
    description: 'Afficher les tâches',
    status: 'TODO',
  },
];

@Injectable({ providedIn: 'root' })
export class TasksApiService {
  getAll(): Observable<Task[]> {
    return of(MOCK_TASKS).pipe(delay(1000));
  }
}
