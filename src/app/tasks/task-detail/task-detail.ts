import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Task } from '../../core/task.model';

@Component({
  selector: 'app-task-detail',
  imports: [RouterLink],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail {
  readonly #route = inject(ActivatedRoute);

  protected readonly task = toSignal(
    this.#route.data.pipe(map((data) => data['task'] as Task | undefined)),
  );
}
