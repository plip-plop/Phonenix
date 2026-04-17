import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TasksApiService } from './tasks.api.service';
import { TasksStateService } from './tasks.state.service';
import { Task } from '../core/task.model';

fdescribe('TasksStateService', () => {
  let service: TasksStateService;
  let mockTasksApiService: jasmine.SpyObj<TasksApiService>;

  beforeEach(() => {
    mockTasksApiService = jasmine.createSpyObj('TasksApiService', ['addTask', 'getAll']);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        TasksStateService,
        { provide: TasksApiService, useValue: mockTasksApiService },
      ],
    });
    service = TestBed.inject(TasksStateService);
  });

  it('doit être créé', () => {
    expect(service).toBeTruthy();
  });
  
  describe('addTask', () => {
    it('doit ajouter une tâche au state', () => {
      const newTaskData: Omit<Task, 'id'> = { title: 'Test', description: 'Desc', status: 'TODO' };

      const returnedTask: Task = { ...newTaskData, id: '123' };
      mockTasksApiService.addTask.and.returnValue(of(returnedTask));
      service.addTask(newTaskData).subscribe();
      expect(mockTasksApiService.addTask).toHaveBeenCalledOnceWith(newTaskData);
      expect(service.tasks().length).toBe(1);
      expect(service.tasks()[0]).toEqual(returnedTask);
    });
  });
});
