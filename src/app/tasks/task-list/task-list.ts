import { Component, inject, OnInit } from '@angular/core';
import { TasksStateService } from '../tasks.state.service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  readonly #tasksState = inject(TasksStateService);
  protected readonly tasksTodo = this.#tasksState.tasksTodo;
  protected readonly tasksInProgress = this.#tasksState.tasksInProgress;
  protected readonly tasksDone = this.#tasksState.tasksDone;
  protected readonly totalTasks = this.#tasksState.totalTasks;

  ngOnInit() {
    this.#tasksState.fetchAll();
  }
}
