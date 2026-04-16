import { Routes } from '@angular/router';
import { TaskDetail } from './task-detail/task-detail';
import { TaskList } from './task-list/task-list';
import { taskResolver } from './task-resolver';

export const TASKS_ROUTES: Routes = [
  { path: '', component: TaskList },
  { path: ':id', component: TaskDetail, resolve: { task: taskResolver } },
];
