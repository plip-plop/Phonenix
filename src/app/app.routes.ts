import { Routes } from '@angular/router';
import { TaskList } from './tasks/task-list/task-list';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: TaskList,
        title : 'HelloWorld'
    }
];
