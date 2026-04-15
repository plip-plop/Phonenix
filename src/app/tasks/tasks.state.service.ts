import { computed, inject, Injectable, signal } from '@angular/core';
import { TasksApiService } from './tasks.api.service';
import { Task } from '../core/task.model';

@Injectable({ providedIn: 'root' })
export class TasksStateService {
  readonly #apiService = inject(TasksApiService);
  #tasks = signal<Task[]>([]);

  readonly tasks = this.#tasks.asReadonly();

  tasksTodo = computed(() => this.#tasks().filter((task) => task.status === 'TODO'));
  readonly tasksInProgress = computed(() =>
    this.#tasks().filter((task) => task.status === 'IN_PROGRESS'),
  );
  readonly tasksDone = computed(() => this.#tasks().filter((task) => task.status === 'DONE'));

  readonly totalTasks = computed(() => this.#tasks().length);

  fetchAll(): void {
    this.#apiService.getAll().subscribe((tasks) => {
      this.#tasks.set(tasks);
    });
  }
}
