import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TasksApiService } from '../../tasks/tasks.api.service';

@Injectable({ providedIn: 'root' })
export class UniqueTitleValidator implements AsyncValidator {
  readonly #tasksApi = inject(TasksApiService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.#tasksApi.isTitleTaken(control.value).pipe(
      map((isTaken) => (isTaken ? { uniqueTitle: true } : null)),
      catchError(() => of(null)), // En cas d'erreur API, on ne bloque pas le formulaire
    );
  }
}
