import { inject, Injectable, signal } from '@angular/core';
import { TasksApiService } from './tasks.api.service';

@Injectable({ providedIn: 'root' })
export class TasksStateService {
  private readonly apiService = inject(TasksApiService);
  // État privé de la feature, exposé en lecture seule
  private readonly state = {
    items: signal<any[]>([]),
  } as const;

  readonly items = this.state.items.asReadonly();

  fetchAll(): void {
    this.apiService.getAll().subscribe((items) => {
      this.state.items.set(items);
    });
  }
}
