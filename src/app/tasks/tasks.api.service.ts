import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of, timer } from 'rxjs';
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

  isTitleTaken(title: string): Observable<boolean> {
    const isTaken = MOCK_TASKS.some((t) => t.title.toLowerCase() === title.toLowerCase());
    return timer(500).pipe(map(() => isTaken));
  }

  addTask(taskData: Omit<Task, 'id'>): Observable<Task> {
    const newTask: Task = {
      ...taskData,
      id: `task-${Math.random().toString(36).substring(2, 9)}`, // Simulation d'un ID unique
    };
    // MOCK_TASKS.push(newTask);

    return timer(500).pipe(map(() => newTask));
  }
}
