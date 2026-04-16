import { Component, inject, OnInit, signal } from '@angular/core';
import { TasksStateService } from '../tasks.state.service';
import { TaskForm } from '../task-form/task-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [TaskForm, RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  readonly tasksState = inject(TasksStateService);
  protected readonly tasksTodo = this.tasksState.tasksTodo;
  protected readonly tasksInProgress = this.tasksState.tasksInProgress;
  protected readonly tasksDone = this.tasksState.tasksDone;
  protected readonly totalTasks = this.tasksState.totalTasks;
  protected readonly isFormVisible = signal(false);

  ngOnInit() {
    this.tasksState.fetchAll();
  }

  protected closeForm(): void {
    this.isFormVisible.set(false);
  }
}
